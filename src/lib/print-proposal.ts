/**
 * Motor de impressão A4 — idêntico em desktop, tablet e mobile.
 *
 * Foto do serviço no iOS: overlays absolute (gradiente + título) sobre a img
 * fazem o WebKit print colapsar a altura da imagem (capa funciona porque é
 * só <img> em fluxo). No clone de print, o hero do serviço é normalizado
 * para o mesmo padrão da capa: imagem estática em fluxo, sem absolute.
 */

import { SERVICE_SECTION_IMAGE } from "@/data/services";

const PRINT_WIDTH_PX = 794;
const PRINT_IMAGE_MAX_W = 1400;
const PRINT_JPEG_QUALITY = 0.82;
const SERVICE_PRINT_HEIGHT_PX = 200;

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

function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = toAbsoluteUrl(src);
  });
}

function rasterizeToJpeg(img: HTMLImageElement): string {
  const naturalW = img.naturalWidth || img.width;
  const naturalH = img.naturalHeight || img.height;
  const scale = Math.min(1, PRINT_IMAGE_MAX_W / Math.max(1, naturalW));
  const width = Math.max(1, Math.round(naturalW * scale));
  const height = Math.max(1, Math.round(naturalH * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return toAbsoluteUrl(img.src);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", PRINT_JPEG_QUALITY);
}

async function toDataUrl(src: string): Promise<string> {
  if (src.startsWith("data:")) return src;
  const img = await loadHtmlImage(src);
  return rasterizeToJpeg(img);
}

/** Embute cada <img> do clone como data URL (mesmo bitmap em qualquer aparelho). */
async function embedImages(cloneRoot: HTMLElement): Promise<void> {
  const imgs = Array.from(cloneRoot.querySelectorAll("img"));
  await Promise.all(
    imgs.map(async (img) => {
      const src = img.getAttribute("src");
      if (!src) return;
      try {
        const dataUrl = await toDataUrl(src);
        img.setAttribute("src", dataUrl);
        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.removeAttribute("loading");
      } catch {
        img.setAttribute("src", toAbsoluteUrl(src));
      }
    })
  );
}

/**
 * Normaliza o hero do serviço para o padrão da capa (img em fluxo).
 * Remove overlays absolute que quebram o print no Safari iOS.
 */
async function normalizeServiceHeroForPrint(cloneRoot: HTMLElement): Promise<void> {
  const hero = cloneRoot.querySelector(".proposal-service-hero");
  if (!hero) return;

  const title =
    hero.querySelector("h2")?.textContent?.trim() || "Serviço proposto";
  const label =
    hero.querySelector("p")?.textContent?.trim() || "Serviço proposto";

  let dataUrl: string;
  try {
    dataUrl = await toDataUrl(SERVICE_SECTION_IMAGE);
  } catch {
    dataUrl = toAbsoluteUrl(SERVICE_SECTION_IMAGE);
  }

  const wrapper = hero.parentElement; // overflow-hidden rounded wrapper
  const section = wrapper?.parentElement; // .proposal-service

  const img = document.createElement("img");
  img.className = "service-hero-image";
  img.alt = title;
  img.src = dataUrl;
  img.setAttribute("width", "1200");
  img.setAttribute("height", String(SERVICE_PRINT_HEIGHT_PX));

  const newHero = document.createElement("div");
  newHero.className = "proposal-service-hero";
  newHero.appendChild(img);

  const caption = document.createElement("div");
  caption.className = "service-print-caption";
  caption.innerHTML = `<p>${escapeHtml(label)}</p><h2>${escapeHtml(title)}</h2>`;

  // Substitui o bloco antigo (wrapper+hero com overlays) por hero simples + legenda
  if (wrapper && section) {
    wrapper.replaceWith(newHero);
    newHero.after(caption);
  } else {
    hero.replaceWith(newHero);
    newHero.after(caption);
  }
}

/** CSS autocontido — única fonte de layout do PDF. */
function buildPrintDocumentCss(): string {
  return `
    @page { size: A4; margin: 12mm 12mm 14mm; }
    @page {
      @bottom-center {
        content: counter(page) "/" counter(pages);
        font-size: 9pt;
        color: #64748b;
      }
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      width: ${PRINT_WIDTH_PX}px;
      background: #fff;
      color: #0f172a;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .proposal-document {
      width: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: #fff;
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* —— Cabeçalho / marca —— */
    .proposal-header {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 14px;
      margin-bottom: 14px;
      overflow: visible;
    }
    .proposal-header > div:first-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .proposal-brand-logo {
      display: block;
      height: 40px;
      width: auto;
      max-width: 160px;
      object-fit: contain;
      object-position: left center;
    }
    .proposal-doc-title {
      margin: 2px 0;
      font-size: 22px;
      font-weight: 700;
      color: #1b365d;
      white-space: nowrap;
      line-height: 1.15;
    }
    .proposal-header > div:first-child > div:last-child {
      text-align: right;
      flex: 1;
      min-width: 0;
    }
    .proposal-header > div:first-child > div:last-child p:first-child {
      margin: 0;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #3d85c6;
    }
    .proposal-header > div:first-child > div:last-child p:last-child {
      margin: 2px 0 0;
      font-size: 11px;
      color: #64748b;
    }

    .proposal-cover-hero {
      margin-top: 12px;
      border-radius: 10px;
      overflow: hidden;
    }
    .proposal-cover-hero-image {
      width: 100%;
      height: auto;
      max-height: 48mm;
      object-fit: cover;
      object-position: center;
    }

    .proposal-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 12px;
      padding: 12px 14px;
      background: #f8fafc;
      border-radius: 10px;
    }
    .proposal-meta-date { text-align: right; }
    .proposal-meta-grid p { margin: 0; }
    .proposal-meta-grid p:first-child {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .proposal-summary { margin: 14px 0; }
    .proposal-summary h3 {
      margin: 0 0 6px;
      font-size: 15px;
      color: #1b365d;
    }
    .proposal-summary p {
      margin: 0;
      color: #475569;
      font-size: 12px;
    }

    /* —— Clientes —— */
    .proposal-clients {
      margin: 14px 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .proposal-clients h3 {
      margin: 0 0 6px;
      font-size: 15px;
      color: #1b365d;
    }
    .proposal-clients > p {
      margin: 0 0 8px;
      color: #475569;
      font-size: 12px;
    }
    .clients-logos-frame {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px;
      background: #fff;
    }
    .clients-logos-image {
      width: 100%;
      max-height: 70mm;
      object-fit: contain;
      margin: 0 auto;
    }

    /* —— Serviço: MESMO padrão da capa (img em fluxo, sem absolute) —— */
    .proposal-service { margin: 16px 0; }
    .proposal-service-hero {
      display: block;
      width: 100%;
      margin: 0 0 8px;
      border-radius: 10px;
      overflow: hidden;
      background: #e2e8f0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .service-hero-image {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: static !important;
      width: 100% !important;
      height: ${SERVICE_PRINT_HEIGHT_PX}px !important;
      max-height: none !important;
      object-fit: cover !important;
      object-position: center !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .service-print-caption {
      margin: 0 0 12px;
    }
    .service-print-caption p {
      margin: 0;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #3d85c6;
    }
    .service-print-caption h2 {
      margin: 4px 0 0;
      font-size: 18px;
      color: #1b365d;
      line-height: 1.2;
    }
    .proposal-service h3 {
      margin: 0 0 6px;
      font-size: 15px;
      color: #1b365d;
    }
    .proposal-service-description p {
      margin: 0 0 8px;
      color: #475569;
      font-size: 12px;
    }
    .proposal-service-description p:last-child { margin-bottom: 0; }

    /* —— Financeiro —— */
    .proposal-finance-page {
      break-before: page;
      page-break-before: always;
      margin: 0;
    }
    .proposal-table { margin-bottom: 14px; break-inside: avoid; }
    .proposal-table h3 {
      margin: 0 0 4px;
      font-size: 15px;
      color: #1b365d;
    }
    .proposal-table > p {
      margin: 0 0 8px;
      color: #64748b;
      font-size: 11px;
    }
    .table-scroll { overflow: visible; }
    .proposal-table table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
    }
    .proposal-table th {
      background: #1b365d;
      color: #fff;
      text-align: left;
      padding: 8px 10px;
      font-weight: 600;
    }
    .proposal-table td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
    }
    .proposal-table .print-hide-cell { display: none !important; }
    .proposal-table .print-show-cell { display: table-cell !important; }
    .proposal-table th:nth-child(2),
    .proposal-table th:nth-child(3),
    .proposal-table th:nth-child(4),
    .proposal-table td:nth-child(2),
    .proposal-table td:nth-child(3),
    .proposal-table td:nth-child(4) {
      text-align: right;
    }

    .proposal-conditions h3 {
      margin: 0 0 8px;
      font-size: 15px;
      color: #1b365d;
    }
    .proposal-conditions ol {
      margin: 0;
      padding: 0;
      list-style: none;
      counter-reset: cond;
    }
    .proposal-conditions li {
      display: flex;
      gap: 10px;
      margin-bottom: 6px;
      color: #475569;
      font-size: 11.5px;
      break-inside: avoid;
    }

    /* —— SLA —— */
    .proposal-sla-page {
      break-before: page;
      page-break-before: always;
      margin: 0;
    }
    .proposal-sla {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      background: #f8fafc;
    }
    .proposal-sla h3 {
      margin: 0 0 6px;
      font-size: 15px;
      color: #1b365d;
    }
    .sla-item {
      margin-top: 8px;
      padding: 8px 10px;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      break-inside: avoid;
    }
    .sla-item p { margin: 0; font-size: 11.5px; color: #475569; }
    .sla-item p:first-child {
      font-weight: 600;
      color: #1b365d;
      margin-bottom: 2px;
    }
    .proposal-contact {
      margin-top: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      background: #1b365d;
      color: #fff;
      break-inside: avoid;
    }
    .proposal-contact > p:first-child {
      margin: 0;
      font-size: 10px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #5ba3d9;
    }
    .contact-details {
      margin-top: 8px;
      display: grid;
      gap: 3px;
      font-size: 11.5px;
    }
    .contact-details p { margin: 0; }

    a { color: inherit; text-decoration: none; }

    @media print {
      html, body { width: 100% !important; }
    }
  `;
}

function waitForImages(doc: Document): Promise<void> {
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
  clone.querySelectorAll(".no-print").forEach((el) => el.remove());

  // Foto do serviço PRIMEIRO (caminho estático), no padrão da capa — crítico no iOS
  await normalizeServiceHeroForPrint(clone);
  await embedImages(clone);

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
<style>${buildPrintDocumentCss()}</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`);
  doc.close();

  try {
    await waitForImages(doc);
    await new Promise((r) => window.setTimeout(r, 400));
    win.focus();
    win.print();
  } finally {
    window.setTimeout(cleanup, 2000);
  }
}
