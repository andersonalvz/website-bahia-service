/**
 * Impressão da proposta em layout A4/desktop.
 *
 * No iOS/Safari, window.print() na página usa a largura do viewport do
 * aparelho (~390px). Com escala 100%, o PDF fica numa coluna estreita
 * com margens laterais enormes. Aqui clonamos o documento num iframe
 * com largura ~A4 (794px) para o layout desktop aplicar de verdade.
 */

const PRINT_WIDTH_PX = 794;

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

function waitForImages(doc: Document): Promise<void> {
  const images = Array.from(doc.images);
  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
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
  iframe.style.cssText = [
    "position:fixed",
    "right:0",
    "bottom:0",
    "width:0",
    "height:0",
    "border:0",
    "opacity:0",
    "pointer-events:none",
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

  const markup = source.outerHTML;
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
  body {
    padding: 0 !important;
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
  /* Foto do serviço: sempre no fluxo, impressão WebKit */
  .proposal-service .service-hero-image {
    display: block !important;
    position: static !important;
    width: 100% !important;
    height: auto !important;
    max-height: 75mm !important;
    object-fit: cover !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .proposal-service .proposal-service-hero {
    position: relative !important;
    aspect-ratio: auto !important;
    height: auto !important;
    overflow: hidden !important;
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
    await waitForImages(doc);
    // Pequeno atraso: WebKit precisa pintar antes de abrir o diálogo
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    win.focus();
    win.print();
  } finally {
    // afterprint no iframe é inconsistente no iOS — limpa com atraso
    window.setTimeout(cleanup, 1500);
  }
}
