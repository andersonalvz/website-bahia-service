# Gerador de Propostas Comerciais — Bahia Service

Aplicação interna em Next.js 15 para montar propostas comerciais profissionais da Bahia Service, com preview em tempo real e geração de PDF via impressão do navegador.

> **Não é um SaaS.** Não há login, banco de dados ou cadastro de usuários. Tudo funciona no navegador.

## Como executar

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000/proposta](http://localhost:3000/proposta)

## Funcionalidades

- Formulário de cliente, serviço, postos, valores e observações
- Cálculo automático de investimento mensal e anual (moeda BRL)
- Preview em tempo real da proposta
- Troca dinâmica de título, descrição, benefícios, diferenciais, imagem e ícone por serviço
- Botão **Gerar PDF** (impressão A4 do navegador)
- Layout responsivo (duas colunas no desktop; empilhado no mobile)

## Estrutura

```
src/
  app/
    proposta/page.tsx     # Rota principal
    print.css             # Estilos de impressão
  components/proposal/    # Form, Preview, Table, Header, Footer, Service, CurrencyInput
  constants/              # Marca e condições comerciais
  data/                   # services.ts e defaults
  lib/                    # Cálculos, moeda e datas
  types/                  # Tipagens do domínio
public/images/            # Logo e imagens dos serviços
```

## Serviços disponíveis

Portaria, Limpeza, Recepção, Jardinagem, Zeladoria, Manutenção e Apoio Administrativo.

Conteúdos em `src/data/services.ts`.

## PDF / Impressão

O botão **Gerar PDF** chama `window.print()`. O arquivo `src/app/print.css`:

- oculta formulário, botões e menus (`.no-print`)
- exibe apenas `#proposal-document`
- formata páginas A4

## Preparação para evolução SaaS

A arquitetura já separa domínio, dados e UI para facilitar futuras features:

- Login / autenticação
- Cadastro de clientes
- Histórico de propostas
- Numeração automática
- Banco de dados
- Assinatura digital
- Envio por e-mail
- CRM

Veja `ProposalRecord` em `src/types/proposal.ts` como base do modelo persistível.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
