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

## Exportação estática

O projeto está configurado com `output: 'export'` no Next.js. O build gera arquivos estáticos em `out/`, prontos para qualquer hospedagem (Nginx, Apache, CDN, site institucional, etc.), sem servidor Node.

```bash
npm run build
```

Os arquivos ficam em `out/`. Para pré-visualizar localmente:

```bash
npm start
```

### Compatibilidade

- Sem Server Actions, Route Handlers, middleware, cookies/headers ou SSR dinâmico
- Imagens via `next/image` com `images.unoptimized: true` (necessário na exportação estática)
- Formulário de contato e gerador de propostas funcionam 100% no navegador

## Deploy (GitHub Actions → HostGator FTP)

Pipeline: `.github/workflows/deploy.yml` (dispara em push na `main`).

### Secrets do repositório

| Secret | Obrigatório | Descrição |
|--------|-------------|-----------|
| `FTP_SERVER` | sim | Host FTP (ex.: `ftp.bahiaservice.com.br`) |
| `FTP_USERNAME` | sim | Usuário FTP |
| `FTP_PASSWORD` | sim | Senha FTP |
| `FTP_PORT` | não | Padrão `21` |
| `FTP_SERVER_DIR` | não* | Pasta remota relativa ao login FTP |

\* **Bahia Service:** conta FTP `deploy@bahiaservice.com.br` → `/home1/gracam74/public_html`

| Secret | Valor |
|--------|--------|
| `FTP_USERNAME` | `deploy@bahiaservice.com.br` |
| `FTP_SERVER_DIR` | `./` |
| `FTP_SERVER` | host FTP da HostGator |
| `FTP_PASSWORD` | senha da conta `deploy@` |

Após o deploy, o Actions verifica `https://www.bahiaservice.com.br/deploy-version.txt`.  
Se o SHA do commit não aparecer lá, o job **falha** (FTP foi para a pasta errada).

Repositório: `https://github.com/andersonalvz/website-bahia-service`
