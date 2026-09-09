#!/usr/bin/env python3
"""Capture high-resolution PNGs of each service card on /servicos."""

from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent / "service-cards"
URL = "https://www.bahiaservice.com.br/servicos"
IDS = ["limpeza", "jardinagem", "portaria"]
# Desktop layout (lg:grid-cols-2) at 2x–3x scale for print-quality PNGs
VIEWPORT = {"width": 1440, "height": 2200}
SCALE = 3


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport=VIEWPORT,
            device_scale_factor=SCALE,
            locale="pt-BR",
        )
        page = context.new_page()
        page.goto(URL, wait_until="networkidle", timeout=90000)
        # Wait for images
        page.wait_for_timeout(1500)
        for sid in IDS:
            el = page.locator(f"article#{sid}")
            el.scroll_into_view_if_needed()
            page.wait_for_timeout(400)
            # Ensure images inside are loaded
            el.locator("img").first.wait_for(state="visible", timeout=30000)
            out = OUT / f"card-servico-{sid}@3x.png"
            el.screenshot(path=str(out), type="png", animations="disabled")
            box = el.bounding_box()
            print(f"OK {out.name} css={box} file={out.stat().st_size} bytes")
        browser.close()
    print(f"DIR {OUT}")


if __name__ == "__main__":
    main()
