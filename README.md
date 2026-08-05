# Bahia Service — Site Institucional

Site institucional premium da **Bahia Service**, com Design System compartilhado e Gerador de Propostas Comerciais integrado.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Como executar

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home institucional |
| `/sobre` | História, missão, visão e valores |
| `/servicos` | Limpeza e Conservação, Jardinagem, Portaria |
| `/clientes` | Clientes e logos |
| `/contato` | Contato e formulário |
| `/proposta` | Gerador de Propostas (área interna, fora da navegação) |

## Serviços

- Limpeza e Conservação
- Jardinagem
- Portaria e Controle de Acesso

## Estrutura

```
src/
  app/
    (site)/           # Páginas institucionais (Navbar + Footer)
    proposta/         # Gerador de Propostas
  components/
    ui/               # Design System
    layout/           # Navbar, Footer, Hero
    sections/         # Seções das páginas
    proposal/         # Componentes do gerador
  constants/          # Marca e tokens
  data/               # Conteúdos (company, services, navigation)
  lib/
  styles/
public/images/        # Logo, hero e imagens dos serviços
```

## Gerador de Propostas (`/proposta`)

Ferramenta interna no navegador (sem login/banco) para montar propostas comerciais com preview em tempo real e geração de PDF via impressão A4.

## Deploy

Configure o projeto apontando para este repositório:

`https://github.com/andersonalvz/website-bahia-service`
