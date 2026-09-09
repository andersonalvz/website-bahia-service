#!/usr/bin/env python3
"""
Folder institucional Bahia Service — A4 paisagem, 2 páginas, 3 painéis iguais.
Saída: PDF CMYK alta resolução para impressão (folder 2 dobras).
"""

from __future__ import annotations

import io
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import CMYKColor, Color, white
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent / "Bahia-Service-Folder-Institucional-A4.pdf"
IMG = ROOT / "public" / "images"

# A4 landscape
PAGE_W = 297 * mm
PAGE_H = 210 * mm
PANEL_W = PAGE_W / 3

# Brand CMYK (from #1B365D, #3D85C6, #334155, #F8FAFC)
NAVY = CMYKColor(0.71, 0.42, 0.00, 0.64)
BLUE = CMYKColor(0.69, 0.33, 0.00, 0.22)
SLATE = CMYKColor(0.45, 0.30, 0.20, 0.55)
MUTED = CMYKColor(0.35, 0.22, 0.18, 0.40)
LIGHT = CMYKColor(0.03, 0.02, 0.01, 0.02)
LINE = CMYKColor(0.12, 0.08, 0.06, 0.08)
WHITE = CMYKColor(0, 0, 0, 0)

COMPANY_SUMMARY = (
    "A Bahia Service é uma empresa especializada em terceirização de serviços e gestão "
    "de facilities, oferecendo soluções completas para organizações que buscam eficiência "
    "operacional, qualidade e segurança em suas rotinas. Atuamos nas áreas de limpeza e "
    "conservação, jardinagem e portaria e controle de acesso, atendendo condomínios, "
    "empresas, instituições de ensino, hospitais, clínicas, indústrias e empreendimentos comerciais."
)

COMPANY_SUMMARY_2 = (
    "Nosso compromisso vai além da disponibilização de mão de obra. Trabalhamos como "
    "parceiros estratégicos de nossos clientes, desenvolvendo soluções personalizadas que "
    "contribuem para a organização dos ambientes, otimização de recursos e melhoria contínua "
    "dos processos."
)

MISSION = (
    "Oferecer soluções completas em terceirização e facilities com excelência operacional, "
    "segurança e atendimento humanizado, contribuindo para o desempenho e a imagem dos nossos clientes."
)

VISION = (
    "Ser referência em facilities na Bahia e no Nordeste, reconhecida pela qualidade das equipes, "
    "pela confiabilidade da gestão e pela capacidade de gerar valor sustentável aos parceiros."
)

VALUES = [
    ("Excelência", "Processos padronizados e equipes treinadas para um serviço consistente."),
    ("Integridade", "Ética, transparência e respeito com clientes, colaboradores e parceiros."),
    ("Agilidade", "Resposta rápida, reposição de equipes e comunicação clara."),
    ("Parceria", "Soluções sob medida, lado a lado com a operação do cliente."),
    ("Segurança", "EPIs, protocolos e supervisão contínua de pessoas e patrimônios."),
    ("Melhoria contínua", "Indicadores, escuta ativa e evolução constante do serviço."),
]

SERVICES = [
    {
        "title": "Limpeza e Conservação",
        "text": (
            "Limpeza profissional com processos padronizados, produtos adequados e equipes "
            "capacitadas para higiene e apresentação impecáveis."
        ),
        "image": IMG / "services" / "servico-limpeza.jpg",
    },
    {
        "title": "Jardinagem e Paisagismo",
        "text": (
            "Manutenção de áreas verdes com poda, irrigação e conservação paisagística "
            "alinhada ao padrão do empreendimento."
        ),
        "image": IMG / "services" / "servico-jardinagem.jpg",
    },
    {
        "title": "Portaria e Controle de Acesso",
        "text": (
            "Portaria com profissionais treinados, protocolos claros, postura institucional "
            "e integração com a segurança do cliente."
        ),
        "image": IMG / "services" / "servico-portaria.jpg",
    },
]

CLIENTS_DESC = (
    "A Bahia Service tem orgulho de atender empresas e instituições de diversos segmentos, "
    "oferecendo serviços com qualidade, agilidade e compromisso em toda a Bahia."
)


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Arial", "/System/Library/Fonts/Supplemental/Arial.ttf"))
    pdfmetrics.registerFont(
        TTFont("Arial-Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    )


def hex_ok(c: Color) -> Color:
    return c


def cmyk_image_reader(path: Path, max_w: int = 1800) -> ImageReader:
    """Load image, resize for print, convert to CMYK JPEG for embedding."""
    im = PILImage.open(path).convert("RGB")
    w, h = im.size
    if w > max_w:
        nh = int(h * (max_w / w))
        im = im.resize((max_w, nh), PILImage.Resampling.LANCZOS)
    cmyk = im.convert("CMYK")
    buf = io.BytesIO()
    cmyk.save(buf, format="JPEG", quality=92)
    buf.seek(0)
    return ImageReader(buf)


def draw_fold_guides(c: canvas.Canvas) -> None:
    c.saveState()
    c.setStrokeColor(LINE)
    c.setDash(1, 3)
    c.setLineWidth(0.3)
    for x in (PANEL_W, PANEL_W * 2):
        c.line(x, 4 * mm, x, PAGE_H - 4 * mm)
    c.restoreState()


def wrap_text(c: canvas.Canvas, text: str, font: str, size: float, max_w: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_paragraph(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_w: float,
    font: str = "Arial",
    size: float = 8,
    leading: float = 11,
    color: Color = SLATE,
    max_lines: int | None = None,
) -> float:
    c.setFillColor(color)
    c.setFont(font, size)
    lines = wrap_text(c, text, font, size, max_w)
    if max_lines is not None:
        lines = lines[:max_lines]
    for i, line in enumerate(lines):
        c.drawString(x, y - i * leading, line)
    return y - len(lines) * leading


def draw_label(c: canvas.Canvas, text: str, x: float, y: float) -> None:
    c.setFillColor(BLUE)
    c.setFont("Arial-Bold", 7)
    c.drawString(x, y, text.upper())


def draw_title(c: canvas.Canvas, text: str, x: float, y: float, size: float = 14) -> None:
    c.setFillColor(NAVY)
    c.setFont("Arial-Bold", size)
    c.drawString(x, y, text)


def panel_pad(i: int) -> tuple[float, float, float]:
    """Return (x0, content_x, content_width) for panel index 0..2."""
    x0 = i * PANEL_W
    pad = 8 * mm
    return x0, x0 + pad, PANEL_W - 2 * pad


def draw_cover_panel(c: canvas.Canvas) -> None:
    x0, cx, cw = panel_pad(0)
    # Full-bleed navy background for cover panel
    c.setFillColor(NAVY)
    c.rect(x0, 0, PANEL_W, PAGE_H, fill=1, stroke=0)

    # Hero photo
    hero = IMG / "company-hero-print.jpg"
    if not hero.exists():
        hero = IMG / "company-hero.png"
    ir = cmyk_image_reader(hero, max_w=1600)
    photo_h = 118 * mm
    photo_y = PAGE_H - 12 * mm - photo_h
    # clip-ish: draw photo inset
    c.drawImage(
        ir,
        cx,
        photo_y,
        width=cw,
        height=photo_h,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )

    # Logo
    logo = IMG / "logo-bs.png"
    lir = cmyk_image_reader(logo, max_w=900)
    logo_w = 58 * mm
    # white plate behind logo for contrast
    plate_h = 28 * mm
    plate_y = 18 * mm
    c.setFillColor(WHITE)
    c.roundRect(cx, plate_y, cw, plate_h, 2 * mm, fill=1, stroke=0)
    c.drawImage(
        lir,
        cx + (cw - logo_w) / 2,
        plate_y + 5 * mm,
        width=logo_w,
        height=18 * mm,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )

    c.setFillColor(WHITE)
    c.setFont("Arial", 7.5)
    tag = "Excelência em Facilities e Serviços Corporativos"
    tw = c.stringWidth(tag, "Arial", 7.5)
    c.drawString(x0 + (PANEL_W - tw) / 2, 10 * mm, tag)


def draw_summary_panel(c: canvas.Canvas) -> None:
    x0, cx, cw = panel_pad(1)
    c.setFillColor(LIGHT)
    c.rect(x0, 0, PANEL_W, PAGE_H, fill=1, stroke=0)

    y = PAGE_H - 16 * mm
    draw_label(c, "Institucional", cx, y)
    y -= 7 * mm
    draw_title(c, "Bahia Service", cx, y, 16)
    y -= 6 * mm
    c.setFillColor(BLUE)
    c.setFont("Arial", 8)
    c.drawString(cx, y, "Terceirização · Facilities · Bahia")

    y -= 8 * mm
    c.setStrokeColor(BLUE)
    c.setLineWidth(1.2)
    c.line(cx, y, cx + 22 * mm, y)
    y -= 8 * mm

    draw_title(c, "Quem somos", cx, y, 11)
    y -= 6 * mm
    y = draw_paragraph(c, COMPANY_SUMMARY, cx, y, cw, size=7.8, leading=10.2, color=SLATE)
    y -= 4 * mm
    y = draw_paragraph(c, COMPANY_SUMMARY_2, cx, y, cw, size=7.8, leading=10.2, color=SLATE)

    y -= 8 * mm
    # Stats strip
    stats = [("3", "Serviços"), ("15+", "Clientes"), ("BA", "Atuação"), ("24/7", "Sob demanda")]
    box_w = (cw - 3 * mm) / 2
    box_h = 16 * mm
    for i, (val, lab) in enumerate(stats):
        col = i % 2
        row = i // 2
        bx = cx + col * (box_w + 3 * mm)
        by = y - box_h - row * (box_h + 3 * mm)
        c.setFillColor(WHITE)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.6)
        c.roundRect(bx, by, box_w, box_h, 1.5 * mm, fill=1, stroke=1)
        c.setFillColor(NAVY)
        c.setFont("Arial-Bold", 12)
        c.drawCentredString(bx + box_w / 2, by + 8 * mm, val)
        c.setFillColor(MUTED)
        c.setFont("Arial", 6.5)
        c.drawCentredString(bx + box_w / 2, by + 3.2 * mm, lab)

    y = y - 2 * (box_h + 3 * mm) - 8 * mm
    draw_title(c, "Diferenciais", cx, y, 10)
    y -= 5 * mm
    diffs = [
        "Gestão operacional próxima e supervisão periódica",
        "Equipes qualificadas, uniformizadas e treinadas",
        "SLAs claros e relatórios de acompanhamento",
        "Soluções sob medida para cada empreendimento",
    ]
    for d in diffs:
        c.setFillColor(BLUE)
        c.circle(cx + 1.2 * mm, y + 1.5 * mm, 1.1 * mm, fill=1, stroke=0)
        y = draw_paragraph(c, d, cx + 5 * mm, y, cw - 5 * mm, size=7.2, leading=9.5, color=SLATE)
        y -= 2.5 * mm


def draw_mvv_panel(c: canvas.Canvas) -> None:
    x0, cx, cw = panel_pad(2)
    c.setFillColor(WHITE)
    c.rect(x0, 0, PANEL_W, PAGE_H, fill=1, stroke=0)

    y = PAGE_H - 16 * mm
    draw_label(c, "Propósito", cx, y)
    y -= 7 * mm
    draw_title(c, "Missão, Visão e Valores", cx, y, 12)
    y -= 8 * mm

    # Mission
    c.setFillColor(NAVY)
    c.roundRect(cx, y - 32 * mm, cw, 34 * mm, 2 * mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 9)
    c.drawString(cx + 3 * mm, y - 5 * mm, "Missão")
    draw_paragraph(
        c,
        MISSION,
        cx + 3 * mm,
        y - 10 * mm,
        cw - 6 * mm,
        size=7,
        leading=9.2,
        color=WHITE,
    )
    y -= 38 * mm

    # Vision
    c.setFillColor(BLUE)
    c.roundRect(cx, y - 30 * mm, cw, 32 * mm, 2 * mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 9)
    c.drawString(cx + 3 * mm, y - 5 * mm, "Visão")
    draw_paragraph(
        c,
        VISION,
        cx + 3 * mm,
        y - 10 * mm,
        cw - 6 * mm,
        size=7,
        leading=9.2,
        color=WHITE,
    )
    y -= 36 * mm

    draw_title(c, "Valores", cx, y, 10)
    y -= 5 * mm
    for title, desc in VALUES:
        c.setFillColor(NAVY)
        c.setFont("Arial-Bold", 8)
        c.drawString(cx, y, title)
        y -= 3.2 * mm
        y = draw_paragraph(c, desc, cx, y, cw, size=6.8, leading=8.8, color=SLATE)
        y -= 3.2 * mm


def draw_clients_panel(c: canvas.Canvas) -> None:
    x0, cx, cw = panel_pad(0)
    c.setFillColor(LIGHT)
    c.rect(x0, 0, PANEL_W, PAGE_H, fill=1, stroke=0)

    y = PAGE_H - 16 * mm
    draw_label(c, "Relacionamento", cx, y)
    y -= 7 * mm
    draw_title(c, "Nossos Clientes", cx, y, 13)
    y -= 6 * mm
    y = draw_paragraph(c, CLIENTS_DESC, cx, y, cw, size=7.5, leading=10, color=SLATE)
    y -= 5 * mm

    logos = IMG / "clients-logos.png"
    ir = cmyk_image_reader(logos, max_w=2000)
    # White card
    card_h = y - 14 * mm
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.roundRect(cx, 12 * mm, cw, card_h, 2 * mm, fill=1, stroke=1)
    c.drawImage(
        ir,
        cx + 2 * mm,
        14 * mm,
        width=cw - 4 * mm,
        height=card_h - 4 * mm,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )


def draw_services_panel(c: canvas.Canvas) -> None:
    x0, cx, cw = panel_pad(1)
    c.setFillColor(WHITE)
    c.rect(x0, 0, PANEL_W, PAGE_H, fill=1, stroke=0)

    y = PAGE_H - 14 * mm
    draw_label(c, "Soluções", cx, y)
    y -= 6 * mm
    draw_title(c, "Nossos Serviços", cx, y, 13)
    y -= 7 * mm

    block_h = 52 * mm
    gap = 4 * mm
    for svc in SERVICES:
        # photo
        ph = 22 * mm
        if svc["image"].exists():
            ir = cmyk_image_reader(svc["image"], max_w=1200)
            c.drawImage(
                ir,
                cx,
                y - ph,
                width=cw,
                height=ph,
                preserveAspectRatio=True,
                anchor="c",
                mask="auto",
            )
        y -= ph + 2.5 * mm
        c.setFillColor(NAVY)
        c.setFont("Arial-Bold", 8.5)
        c.drawString(cx, y, svc["title"])
        y -= 3.5 * mm
        y = draw_paragraph(c, svc["text"], cx, y, cw, size=6.8, leading=8.8, color=SLATE)
        y -= 5 * mm


def draw_contact_panel(c: canvas.Canvas) -> None:
    """Contact panel following Robson Soares commercial signature pattern."""
    x0, cx, cw = panel_pad(2)
    c.setFillColor(NAVY)
    c.rect(x0, 0, PANEL_W, PAGE_H, fill=1, stroke=0)

    y = PAGE_H - 16 * mm
    c.setFillColor(BLUE)
    c.setFont("Arial-Bold", 7)
    c.drawString(cx, y, "CONTATO COMERCIAL")
    y -= 8 * mm

    # Logo (light plate)
    logo = IMG / "logo-bs.png"
    lir = cmyk_image_reader(logo, max_w=900)
    plate_h = 26 * mm
    c.setFillColor(WHITE)
    c.roundRect(cx, y - plate_h, cw, plate_h, 2 * mm, fill=1, stroke=0)
    c.drawImage(
        lir,
        cx + 4 * mm,
        y - plate_h + 4 * mm,
        width=50 * mm,
        height=18 * mm,
        preserveAspectRatio=True,
        anchor="w",
        mask="auto",
    )
    y -= plate_h + 8 * mm

    # Signature-style block (Robson)
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 13)
    c.drawString(cx, y, "Robson Soares")
    y -= 5 * mm
    c.setFillColor(CMYKColor(0.10, 0.05, 0.00, 0.15))
    c.setFont("Arial", 9)
    c.drawString(cx, y, "Diretor Comercial")
    y -= 6 * mm
    c.setStrokeColor(BLUE)
    c.setLineWidth(1)
    c.line(cx, y, cx + 28 * mm, y)
    y -= 8 * mm

    lines = [
        ("Telefone", "(71) 98769-0447"),
        ("WhatsApp", "(71) 98769-0447"),
        ("E-mail", "contato@bahiaservice.com.br"),
        ("Site", "bahiaservice.com.br"),
    ]
    for label, value in lines:
        c.setFillColor(BLUE)
        c.setFont("Arial-Bold", 6.5)
        c.drawString(cx, y, label.upper())
        y -= 3.5 * mm
        c.setFillColor(WHITE)
        c.setFont("Arial", 9)
        c.drawString(cx, y, value)
        y -= 7 * mm

    y -= 2 * mm
    c.setFillColor(BLUE)
    c.setFont("Arial-Bold", 6.5)
    c.drawString(cx, y, "ENDEREÇO")
    y -= 4 * mm
    addr = (
        "Avenida Tancredo Neves, 1632, Sala 193 — Torre Sul — "
        "Caminho das Árvores — Salvador/BA"
    )
    y = draw_paragraph(c, addr, cx, y, cw, size=7.5, leading=10, color=WHITE)

    y -= 10 * mm
    c.setFillColor(WHITE)
    c.setFont("Arial-Bold", 8)
    c.drawString(cx, y, "Bahia Service")
    y -= 4 * mm
    c.setFont("Arial", 6.5)
    c.setFillColor(CMYKColor(0.10, 0.05, 0.00, 0.20))
    legal = "Bahia Service Terceirização de Mão de Obra Ltda."
    draw_paragraph(c, legal, cx, y, cw, size=6.5, leading=8.5, color=CMYKColor(0.10, 0.05, 0.00, 0.20))


def build() -> Path:
    register_fonts()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(PAGE_W, PAGE_H))
    c.setTitle("Bahia Service — Folder Institucional A4")
    c.setAuthor("Bahia Service")
    c.setSubject("Folder institucional 2 dobras — impressão CMYK")

    # Page 1
    draw_cover_panel(c)
    draw_summary_panel(c)
    draw_mvv_panel(c)
    draw_fold_guides(c)
    c.showPage()

    # Page 2
    draw_clients_panel(c)
    draw_services_panel(c)
    draw_contact_panel(c)
    draw_fold_guides(c)
    c.showPage()

    c.save()
    return OUT


if __name__ == "__main__":
    path = build()
    size = path.stat().st_size
    print(f"OK: {path}")
    print(f"Size: {size / 1024:.1f} KB")
