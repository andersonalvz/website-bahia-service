/**
 * Motor de impressão/PDF — mesmo documento A4 no desktop, tablet e mobile.
 *
 * Estratégia:
 * 1. Iframe com viewport 794px (layout desktop, independente do aparelho).
 * 2. Todas as <img> viram JPEG data URL (bitmap embutido) — Safari iOS não
 *    confia em URLs relativas no print do iframe.
 * 3. Foto do serviço também vira background-image no hero (fallback WebKit).
 * 4. CSS de paginação próprio (sem page-break-after nos logos).
 */

const PRINT_WIDTH_PX = 794;
const PRINT_IMAGE_MAX_W = 1400;
const PRINT_JPEG_QUALITY = 0.85;
const SERVICE_HERO_PRINT_HEIGHT_PX = 240;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toAbsoluteUrl(src: string): string {
  try {
    return new URL(src, window.location.href).href;
  } catch {
    return src;
  }
}

function rasterizeImage(
  img: CanvasImageSource & { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number },
  maxWidth = PRINT_IMAGE_MAX_W
): string | null {
  const naturalW =
    ("naturalWidth" in img && img.naturalWidth) || img.width || 0;
  const naturalH =
    ("naturalHeight" in img && img.naturalHeight) || img.height || 0;
  if (!naturalW || !naturalH) return null;

  const scale = Math.min(1, maxWidth / naturalW);
  const width = Math.max(1, Math.round(naturalW * scale));
  const height = Math.max(1, Math.round(naturalH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img as CanvasImageSource, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", PRINT_JPEG_QUALITY);
}

async function fetchAsDataUrl(src: string): Promise<string> {
  const absolute = toAbsoluteUrl(src);

  // 1) fetch → blob → createImageBitmap (mais confiável no iOS)
  try {
    const res = await fetch(absolute, { cache: "force-cache" });
    if (res.ok) {
      const blob = await res.blob();
      if (typeof createImageBitmap === "function") {
        const bitmap = await createImageBitmap(blob);
        const dataUrl = rasterizeImage(bitmap);
        bitmap.close();
        if (dataUrl) return dataUrl;
      }
      // Fallback: FileReader
      const readerData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
      // Re-rasteriza via Image se for PNG grande
      if (readerData.startsWith("data:image")) {
        const img = await loadHtmlImage(readerData);
        return rasterizeImage(img) ?? readerData;
      }
      return readerData;
    }
  } catch {
    // continua para Image()
  }

  const img = await loadHtmlImage(absolute);
  return rasterizeImage(img) ?? absolute;
}

function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = src;
  });
}

async function resolveDataUrl(
  rawSrc: string,
  liveImg?: HTMLImageElement | null
): Promise<string> {
  if (rawSrc.startsWith("data:")) return rawSrc;

  if (
    liveImg &&
    liveImg.complete &&
    (liveImg.naturalWidth > 0 || liveImg.width > 0)
  ) {
    const fromLive = rasterizeImage(liveImg);
    if (fromLive) return fromLive;
  }

  try {
    return await fetchAsDataUrl(rawSrc);
  } catch {
    return toAbsoluteUrl(rawSrc);
  }
}

/**
 * Embute todas as imagens do clone como data URL e reforça a foto do serviço
 * com background-image (mesmo resultado no mobile e no desktop).
 */
async function preparePrintClone(
  liveRoot: HTMLElement,
  cloneRoot: HTMLElement
): Promise<void> {
  const liveImgs = Array.from(liveRoot.querySelectorAll("img"));
  const cloneImgs = Array.from(cloneRoot.querySelectorAll("img"));

  const liveBySrc = new Map<string, HTMLImageElement>();
  for (const img of liveImgs) {
    const key = img.currentSrc || img.getAttribute("src") || "";
    if (key) liveBySrc.set(key, img);
    try {
      liveBySrc.set(toAbsoluteUrl(key), img);
    } catch {
      /* ignore */
    }
  }

  await Promise.all(
    cloneImgs.map(async (cloneImg, index) => {
      const rawSrc =
        cloneImg.getAttribute("src") ||
        liveImgs[index]?.currentSrc ||
        liveImgs[index]?.getAttribute("src") ||
        "";
      if (!rawSrc) return;

      const liveMatch =
        liveBySrc.get(rawSrc) ||
        liveBySrc.get(toAbsoluteUrl(rawSrc)) ||
        liveImgs[index] ||
        null;

      const dataUrl = await resolveDataUrl(rawSrc, liveMatch);

      cloneImg.setAttribute("src", dataUrl);
      cloneImg.removeAttribute("srcset");
      cloneImg.removeAttribute("sizes");
      cloneImg.removeAttribute("loading");
      cloneImg.style.cssText = [
        "display:block",
        "position:static",
        "width:100%",
        "height:auto",
        "max-width:100%",
        "object-fit:cover",
        "object-position:center",
        "-webkit-print-color-adjust:exact",
        "print-color-adjust:exact",
      ].join(";");

      // Reforço WebKit: hero do serviço com background + altura explícita
      if (
        cloneImg.classList.contains("service-hero-image") ||
        cloneImg.getAttribute("data-print-image") === "service-hero"
      ) {
        const hero = cloneImg.closest(
          ".proposal-service-hero"
        ) as HTMLElement | null;
        if (hero) {
          hero.style.cssText = [
            "position:relative",
            "display:block",
            "width:100%",
            `min-height:${SERVICE_HERO_PRINT_HEIGHT_PX}px`,
            `height:${SERVICE_HERO_PRINT_HEIGHT_PX}px`,
            `background-image:url("${dataUrl}")`,
            "background-size:cover",
            "background-position:center",
            "background-repeat:no-repeat",
            "-webkit-print-color-adjust:exact",
            "print-color-adjust:exact",
            "overflow:hidden",
          ].join(";");
          cloneImg.style.cssText = [
            "display:block",
            "position:absolute",
            "inset:0",
            "width:100%",
            "height:100%",
            "object-fit:cover",
            "opacity:1",
            "-webkit-print-color-adjust:exact",
            "print-color-adjust:exact",
          ].join(";");
        }
      }
    })
  );
}

function collectAppStylesheets(): string {
  return Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style')
  )
    .map((node) => node.outerHTML)
    .join("\n");
}

function buildPrintOverrideStylesheet(): string {
  return `
    @page {
      size: A4;
      margin: 12mm 12mm 16mm;
    }
    @page {
      @bottom-center {
        content: counter(page) "/" counter(pages);
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        font-size: 9pt;
        color: #64748b;
      }
    }

    html, body {
      width: ${PRINT_WIDTH_PX}px !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      overflow: visible !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .proposal-document {
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 6px 2px !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      overflow: visible !important;
      background: #fff !important;
    }

    .proposal-brand-logo {
      height: 32px !important;
      width: auto !important;
      max-width: 120px !important;
    }
    .proposal-doc-title {
      font-size: 20px !important;
      line-height: 1.2 !important;
      white-space: nowrap !important;
    }
    .proposal-header > div:first-child {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
      gap: 12px !important;
    }
    .proposal-header > div:first-child > div:last-child {
      text-align: right !important;
    }
    .proposal-meta-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
    }
    .proposal-meta-date { text-align: right !important; }

    .proposal-cover-hero {
      margin-top: 12px !important;
      margin-bottom: 0 !important;
      overflow: hidden !important;
      border-radius: 12px !important;
      break-inside: avoid !important;
    }
    .proposal-cover-hero-image {
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-height: 55mm !important;
      aspect-ratio: 21 / 9 !important;
      object-fit: cover !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .proposal-clients {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      break-after: auto !important;
      page-break-after: auto !important;
    }
    .clients-logos-frame img,
    .clients-logos-image {
      display: block !important;
      position: static !important;
      width: 100% !important;
      height: auto !important;
      max-height: 75mm !important;
      object-fit: contain !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .proposal-service-hero {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      min-height: ${SERVICE_HERO_PRINT_HEIGHT_PX}px !important;
      height: ${SERVICE_HERO_PRINT_HEIGHT_PX}px !important;
      overflow: hidden !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .service-hero-image {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .proposal-service-hero-overlay {
      position: absolute !important;
      inset: 0 !important;
      pointer-events: none !important;
      z-index: 1 !important;
    }
    .proposal-service-hero > div:last-child {
      z-index: 2 !important;
    }

    .proposal-finance-page {
      break-before: page !important;
      page-break-before: always !important;
    }
    .proposal-sla-page {
      break-before: page !important;
      page-break-before: always !important;
    }

    .proposal-table .print-show-cell { display: table-cell !important; }
    .proposal-table .print-hide-cell { display: none !important; }
    .table-scroll { overflow: visible !important; }

    img {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      max-width: 100% !important;
    }

    @media print {
      html, body, .proposal-document {
        width: 100% !important;
        min-width: 0 !important;
        max-width: none !important;
      }
    }
  `;
}

function waitForCloneImages(doc: Document): Promise<void> {
  const images = Array.from(doc.images);
  if (!images.length) return Promise.resolve();

  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          window.setTimeout(done, 6000);
        })
    )
  ).then(() => undefined);
}

export async function printProposalDocument(options: {
  title: string;
  elementId?: string;
}): Promise<void> {
  const source = document.getElementById(
    options.elementId ?? "proposal-document"
  );

  const previousTitle = document.title;
  document.title = options.title;

  if (!source) {
    window.print();
    document.title = previousTitle;
    return;
  }

  const clone = source.cloneNode(true) as HTMLElement;
  await preparePrintClone(source, clone);

  const clientsImg = clone.querySelector(".clients-logos-frame img");
  if (clientsImg) clientsImg.classList.add("clients-logos-image");

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("title", "Impressão da proposta");
  // Mesmo “canvas” A4 em qualquer aparelho (mobile = desktop)
  iframe.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    `width:${PRINT_WIDTH_PX}px`,
    "height:1123px",
    "border:0",
    "opacity:0",
    "pointer-events:none",
    "z-index:-1",
  ].join(";");
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;

  const cleanup = () => {
    document.title = previousTitle;
    iframe.remove();
  };

  if (!doc || !win) {
    cleanup();
    window.print();
    return;
  }

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=${PRINT_WIDTH_PX}, initial-scale=1" />
<title>${escapeHtml(options.title)}</title>
${collectAppStylesheets()}
<style id="proposal-print-overrides">${buildPrintOverrideStylesheet()}</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`);
  doc.close();

  try {
    await waitForCloneImages(doc);
    await new Promise((r) => window.setTimeout(r, 600));
    win.focus();
    win.print();
  } finally {
    window.setTimeout(cleanup, 2500);
  }
}
