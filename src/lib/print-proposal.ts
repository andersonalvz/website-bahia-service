/**
 * Impressão da proposta em layout A4/desktop.
 *
 * No iOS/Safari, window.print() na página usa a largura do viewport do
 * aparelho (~390px). Clonamos o documento num iframe com largura ~A4
 * (794px) e embutimos as imagens como data URL (JPEG) para o WebKit
 * rasterizar de forma confiável no diálogo de impressão.
 */

const PRINT_WIDTH_PX = 794;
const PRINT_IMAGE_MAX_WIDTH = 1200;
const PRINT_IMAGE_QUALITY = 0.82;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function collectStyles(): string {
  return Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style')
  )
    .map((node) => node.outerHTML)
    .join("\n");
}

function toAbsoluteUrl(src: string): string {
  try {
    return new URL(src, window.location.href).href;
  } catch {
    return src;
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = src;
  });
}

/** Converte imagem para JPEG data URL (leve o bastante para o print do Safari). */
async function imageToPrintDataUrl(src: string): Promise<string> {
  const absolute = toAbsoluteUrl(src);
  const img = await loadImage(absolute);
  const naturalW = img.naturalWidth || img.width;
  const naturalH = img.naturalHeight || img.height;
  if (!naturalW || !naturalH) {
    return absolute;
  }

  const scale = Math.min(1, PRINT_IMAGE_MAX_WIDTH / naturalW);
  const width = Math.max(1, Math.round(naturalW * scale));
  const height = Math.max(1, Math.round(naturalH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return absolute;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", PRINT_IMAGE_QUALITY);
}

async function buildPrintMarkup(source: HTMLElement): Promise<string> {
  const clone = source.cloneNode(true) as HTMLElement;
  const imgs = Array.from(clone.querySelectorAll("img"));

  await Promise.all(
    imgs.map(async (img) => {
      const src = img.getAttribute("src");
      if (!src || src.startsWith("data:")) return;
      try {
        img.setAttribute("src", await imageToPrintDataUrl(src));
        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.style.setProperty("-webkit-print-color-adjust", "exact");
        img.style.setProperty("print-color-adjust", "exact");
      } catch {
        img.setAttribute("src", toAbsoluteUrl(src));
      }
    })
  );

  return clone.outerHTML;
}

function waitForDataImages(doc: Document): Promise<void> {
  const images = Array.from(doc.images);
  if (images.length === 0) return Promise.resolve();

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
          // Fallback se o evento não disparar
          window.setTimeout(done, 4000);
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

  if (!source) {
    const previousTitle = document.title;
    document.title = options.title;
    window.print();
    document.title = previousTitle;
    return;
  }

  const previousTitle = document.title;
  document.title = options.title;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("title", "Impressão da proposta");
  // WebKit ignora/não decodifica imagens em iframe 0×0 — precisa de tamanho real
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
  if (!doc || !win) {
    iframe.remove();
    window.print();
    document.title = previousTitle;
    return;
  }

  let markup: string;
  try {
    markup = await buildPrintMarkup(source);
  } catch {
    markup = source.outerHTML;
  }

  const styles = collectStyles();

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=${PRINT_WIDTH_PX}" />
<title>${escapeHtml(options.title)}</title>
${styles}
<style>
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: ${PRINT_WIDTH_PX}px !important;
    min-width: ${PRINT_WIDTH_PX}px !important;
    max-width: ${PRINT_WIDTH_PX}px !important;
    background: #ffffff !important;
    overflow: visible !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .proposal-document {
    width: ${PRINT_WIDTH_PX}px !important;
    max-width: ${PRINT_WIDTH_PX}px !important;
    margin: 0 !important;
    padding: 28px 32px !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
    background: #ffffff !important;
  }
  .proposal-service .proposal-service-hero {
    position: relative !important;
    display: block !important;
    width: 100% !important;
    height: auto !important;
    aspect-ratio: auto !important;
    overflow: hidden !important;
    background: #e2e8f0 !important;
  }
  .proposal-service .service-hero-image {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: static !important;
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
    aspect-ratio: 21 / 9 !important;
    object-fit: cover !important;
    object-position: center !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .proposal-service .proposal-service-hero-overlay {
    position: absolute !important;
    inset: 0 !important;
    pointer-events: none !important;
  }
  img {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    max-width: 100% !important;
  }
  @media print {
    @page { size: A4; margin: 10mm 12mm; }
    html, body, .proposal-document {
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
    }
  }
</style>
</head>
<body>
${markup}
</body>
</html>`);
  doc.close();

  const cleanup = () => {
    document.title = previousTitle;
    iframe.remove();
  };

  try {
    await waitForDataImages(doc);
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    win.focus();
    win.print();
  } finally {
    window.setTimeout(cleanup, 2000);
  }
}
