/**
 * Motor de impressão/PDF da proposta comercial.
 *
 * Arquitetura (causa das falhas anteriores):
 * - NÃO reutiliza o @media print da página (regras conflitantes + page-breaks).
 * - Gera um documento isolado em iframe com CSS próprio de paginação.
 * - Embute imagens como JPEG data URL a partir dos <img> já decodificados na tela
 *   (confiável em Safari iOS/iPadOS; URLs externas/relativas falham no print).
 *
 * Limitação de rodapé (Chrome / Edge / Safari):
 * Headers/footers nativos (data, URL, título) NÃO são controláveis via JS/CSS.
 * O usuário deve desmarcar “Cabeçalhos e rodapés” no diálogo de impressão.
 * Contadores CSS @page (@bottom-center) funcionam em Firefox; Chromium ignora.
 */

const PRINT_WIDTH_PX = 794;
const PRINT_IMAGE_MAX_W = 1400;
const PRINT_JPEG_QUALITY = 0.85;

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

/** Desenha um HTMLImageElement já carregado em JPEG data URL. */
function rasterizeImage(
  img: HTMLImageElement,
  maxWidth = PRINT_IMAGE_MAX_W
): string | null {
  const naturalW = img.naturalWidth || img.width;
  const naturalH = img.naturalHeight || img.height;
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
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", PRINT_JPEG_QUALITY);
}

async function loadAndRasterize(src: string): Promise<string> {
  const absolute = toAbsoluteUrl(src);
  const img = new Image();
  img.decoding = "async";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Falha ao carregar ${absolute}`));
    img.src = absolute;
  });
  return rasterizeImage(img) ?? absolute;
}

/**
 * Substitui src de cada <img> do clone por data URL,
 * preferindo o bitmap já decodificado no documento ao vivo.
 */
async function inlineImages(
  liveRoot: HTMLElement,
  cloneRoot: HTMLElement
): Promise<void> {
  const liveImgs = Array.from(liveRoot.querySelectorAll("img"));
  const cloneImgs = Array.from(cloneRoot.querySelectorAll("img"));

  await Promise.all(
    cloneImgs.map(async (cloneImg, index) => {
      const liveImg = liveImgs[index];
      const rawSrc =
        cloneImg.getAttribute("src") ||
        liveImg?.currentSrc ||
        liveImg?.getAttribute("src") ||
        "";

      if (!rawSrc) return;

      let dataUrl: string | null = null;

      if (
        liveImg &&
        liveImg.complete &&
        (liveImg.naturalWidth > 0 || liveImg.width > 0)
      ) {
        dataUrl = rasterizeImage(liveImg);
      }

      if (!dataUrl) {
        try {
          dataUrl = await loadAndRasterize(rawSrc);
        } catch {
          dataUrl = toAbsoluteUrl(rawSrc);
        }
      }

      cloneImg.setAttribute("src", dataUrl);
      cloneImg.removeAttribute("srcset");
      cloneImg.removeAttribute("sizes");
      cloneImg.removeAttribute("loading");
      cloneImg.removeAttribute("decoding");
      // next/image fill: tira do absolute para o fluxo de impressão
      cloneImg.style.cssText = [
        "display:block",
        "position:static",
        "width:100%",
        "height:auto",
        "max-width:100%",
        "object-fit:contain",
        "-webkit-print-color-adjust:exact",
        "print-color-adjust:exact",
      ].join(";");
    })
  );

  // next/image wrapping: remove wrappers que forçam altura 0 / absolute
  cloneRoot.querySelectorAll("[style*='position:absolute']").forEach((node) => {
    if (node instanceof HTMLElement && node.tagName !== "IMG") {
      const img = node.querySelector("img");
      if (img && node.parentElement) {
        node.replaceWith(img);
      }
    }
  });

  // Container fill do Next (span com position relative + img absolute)
  cloneRoot
    .querySelectorAll(".clients-logos-frame, .proposal-service-hero")
    .forEach((frame) => {
      const img = frame.querySelector("img");
      if (!img) return;
      // Garante img no fluxo; remove spans vazios de layout do Next
      frame.querySelectorAll("span").forEach((span) => {
        if (!span.querySelector("img") && span.textContent?.trim() === "") {
          span.remove();
        }
      });
    });
}

function collectAppStylesheets(): string {
  return Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style')
  )
    .map((node) => node.outerHTML)
    .join("\n");
}

/** Overrides aplicados por cima do CSS da app (paginação + imagens). */
function buildPrintOverrideStylesheet(): string {
  return `
    @page {
      size: A4;
      margin: 12mm 12mm 16mm;
    }

    /* Firefox: número da página no rodapé. Chromium/Safari ignoram. */
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
      padding: 8px 4px !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      overflow: visible !important;
      background: #fff !important;
    }

    /* Cabeçalho desktop */
    .proposal-header > div:first-child {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
    }
    .proposal-header > div:first-child > div:last-child { text-align: right !important; }
    .proposal-meta-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; }
    .proposal-meta-date { text-align: right !important; }

    /* Clientes: SEM page-break-after; SEM altura fixa 150mm */
    .proposal-clients {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      break-after: auto !important;
      page-break-after: auto !important;
    }
    .clients-logos-frame {
      overflow: hidden !important;
    }
    .clients-logos-frame img,
    .clients-logos-image {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: static !important;
      width: 100% !important;
      height: auto !important;
      max-height: 90mm !important;
      object-fit: contain !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Foto do serviço — sempre no fluxo */
    .proposal-service-hero {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      overflow: hidden !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    .service-hero-image {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: static !important;
      width: 100% !important;
      height: auto !important;
      max-height: 70mm !important;
      aspect-ratio: 21 / 9 !important;
      object-fit: cover !important;
      object-position: center !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .proposal-service-hero-overlay {
      position: absolute !important;
      inset: 0 !important;
      pointer-events: none !important;
    }
    .proposal-service-columns {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
    }

    /* Quebras de seção (sem double-break / página vazia) */
    .proposal-finance-page {
      break-before: page !important;
      page-break-before: always !important;
      break-after: auto !important;
      page-break-after: auto !important;
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
          window.setTimeout(done, 5000);
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
  await inlineImages(source, clone);

  // Marca a imagem de clientes para CSS de print
  const clientsImg = clone.querySelector(".clients-logos-frame img");
  if (clientsImg) {
    clientsImg.classList.add("clients-logos-image");
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("title", "Impressão da proposta");
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
<meta name="viewport" content="width=${PRINT_WIDTH_PX}" />
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
    // WebKit precisa de um frame de pintura com imagens data URL
    await new Promise((r) => window.setTimeout(r, 500));
    win.focus();
    win.print();
  } finally {
    window.setTimeout(cleanup, 2500);
  }
}
