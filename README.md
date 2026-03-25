# Luan Campos K. — Portfolio

Portfolio pessoal multi-idioma com blog, code assets e projetos. Construido com Next.js 16, React 19 e Tailwind CSS v4.

## Stack

- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS v4 + shadcn (base-nova)
- **Animacoes:** Motion (ex-Framer Motion)
- **i18n:** next-intl (PT-BR, EN, ES)
- **Blog:** MDX + rehype-pretty-code + shiki
- **Linting:** Biome
- **Fontes:** Varela Round (sans) + Geist Mono (mono)

## Setup

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` — o proxy redireciona automaticamente para `http://localhost:3000/pt`.

## Scripts

| Comando | Descricao |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build de producao |
| `npm run start` | Serve o build |
| `npm run lint` | Biome linter |
| `npm run format` | Biome formatter |

## Estrutura do projeto

```
src/
  app/
    layout.tsx                # Root layout (fontes, metadata global)
    globals.css               # Tailwind + theme vars
    [locale]/                 # Rotas com prefixo de idioma (/pt, /en, /es)
      layout.tsx              # Locale layout (Navbar, Footer, ThemeProvider)
      page.tsx                # Home
      about/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      assets/page.tsx
      assets/[slug]/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      not-found.tsx
  data/
    projects.ts               # Dados dos projetos
    assets.ts                 # Code assets (snippets curados)
    blog-posts.ts             # Loader de posts MDX
  i18n/
    routing.ts                # Config de locales
    navigation.ts             # Link, useRouter, usePathname i18n-aware
    request.ts                # Server-side locale resolution
  proxy.ts                    # Proxy (middleware do Next.js 16) para i18n routing
  shared/
    components/
      ui/                     # Componentes shadcn
      layout/                 # Navbar, Footer, SectionWrapper
      creative/               # Animacoes (GradientBlob, TextReveal, MagneticButton, etc.)
      sections/               # Secoes de pagina (hero, cta, about, projects, blog, assets)
      mdx/                    # Componentes usaveis dentro de MDX (Callout, CodeBlock)
    hooks/
    lib/
content/
  blog/                       # Posts MDX
messages/
  pt.json                     # Traducoes PT-BR
  en.json                     # Traducoes EN
  es.json                     # Traducoes ES
```

## Adicionando conteudo

### Novo post no blog

1. Crie um arquivo `.mdx` em `content/blog/`:

```mdx
---
slug: "meu-novo-post"
title: "Titulo do post"
description: "Descricao curta"
locale: "pt"
date: "2026-03-25"
tags: ["react", "nextjs"]
category: "frontend"
coverImage: "/images/blog/meu-post.png"
published: true
---

Conteudo em markdown aqui.

## Subtitulo

Paragrafo com **negrito** e `codigo inline`.

<Callout type="info">
  Voce pode usar componentes React dentro do MDX!
</Callout>

```tsx title="exemplo.tsx"
function hello() {
  return "world"
}
```
```

2. Pronto! O post aparece automaticamente em `/<locale>/blog` para o locale definido no frontmatter.

**Campos do frontmatter:**

| Campo | Tipo | Obrigatorio | Descricao |
|---|---|---|---|
| `slug` | string | sim | Identificador unico (usado na URL) |
| `title` | string | sim | Titulo do post |
| `description` | string | sim | Descricao curta (SEO e cards) |
| `locale` | `"pt"` \| `"en"` \| `"es"` | sim | Idioma do post |
| `date` | string | sim | Data de publicacao (YYYY-MM-DD) |
| `tags` | string[] | sim | Tags para filtragem |
| `category` | string | sim | Categoria (ex: "frontend", "devops") |
| `coverImage` | string | nao | Path da imagem de capa |
| `published` | boolean | sim | `false` esconde o post da listagem |

**Componentes disponiveis no MDX:**

- `<Callout type="info|warning|error">` — Bloco de destaque
- `<CodeBlock>` — Bloco de codigo com botao de copiar
- Syntax highlighting automatico em blocos de codigo com suporte a `title="arquivo.ts"` e line highlighting

**Post em outro idioma:** Crie outro arquivo `.mdx` com `locale: "en"` (ou `"es"`). Sao itens independentes, nao ha linking entre versoes.

### Novo code asset

Edite `src/data/assets.ts` e adicione um objeto ao array `assets`:

```ts
{
  slug: "meu-snippet",
  title: "Nome do snippet",
  description: "O que esse codigo faz e por que e util",
  locale: "pt",
  language: "ts",
  code: `function exemplo() {
  return "hello"
}`,
  explanation: `## Por que guardo isso?

Explicacao em markdown sobre o que faz, quando usar e por que e util.

### Quando usar
- Caso de uso 1
- Caso de uso 2`,
  tags: ["typescript", "utils"],
  category: "utils",
  createdAt: "2026-03-25"
}
```

**Campos do CodeAsset:**

| Campo | Tipo | Obrigatorio | Descricao |
|---|---|---|---|
| `slug` | string | sim | Identificador unico (URL) |
| `title` | string | sim | Nome do snippet |
| `description` | string | sim | Descricao curta |
| `locale` | `"pt"` \| `"en"` \| `"es"` | sim | Idioma |
| `language` | string | sim | Linguagem do codigo (ts, js, python, go, bash, css, etc.) |
| `code` | string | sim | O codigo em si |
| `explanation` | string | sim | Explicacao em markdown |
| `tags` | string[] | sim | Tags |
| `category` | `"utils"` \| `"hooks"` \| `"patterns"` \| `"algorithms"` \| `"devops"` | sim | Categoria |
| `createdAt` | string | sim | Data de criacao (YYYY-MM-DD) |
| `updatedAt` | string | nao | Data de atualizacao |

### Novo projeto

Edite `src/data/projects.ts` e adicione um objeto ao array `projects`:

```ts
{
  slug: "meu-projeto",
  title: "Nome do Projeto",
  subtitle: "Subtitulo curto",
  description: "Descricao para os cards",
  longDescription: "Descricao completa para a pagina de detalhe.\n\nSuporta multiplos paragrafos.",
  coverImage: "/images/projects/meu-projeto.png",
  images: ["/images/projects/meu-projeto-1.png", "/images/projects/meu-projeto-2.png"],
  tags: ["Next.js", "TypeScript", "PostgreSQL"],
  category: "SaaS",
  client: "Nome do Cliente",
  year: 2026,
  liveUrl: "https://exemplo.com",
  githubUrl: "https://github.com/user/repo",
  featured: true,
  results: ["40% de reducao no tempo de carregamento", "12k usuarios diarios"]
}
```

Marque `featured: true` para aparecer na home.

## i18n

O site suporta 3 idiomas: **Portugues** (padrao), **English** e **Espanol**.

- Rotas usam prefixo: `/pt/projects`, `/en/projects`, `/es/projects`
- O proxy detecta o idioma do browser e redireciona automaticamente
- Traducoes de UI ficam em `messages/{locale}.json`
- Conteudo (blog, assets) usa campo `locale` — cada item pertence a um idioma

Para adicionar/editar traducoes de UI, edite os arquivos em `messages/`.

## Tema

Dark mode e o padrao. O visitante pode alternar entre dark, light e system pelo toggle no navbar.

As cores usam formato oklch e estao definidas em `src/app/globals.css`.

## Convencoes

- `page.tsx` e `layout.tsx` sao sempre Server Components (nunca `"use client"`)
- Componentes shadcn em `src/shared/components/ui/`
- Componentes de secao em `src/shared/components/sections/<nome>/`
- Commits semanticos em ingles: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`
- Biome: tabs, double quotes, sem semicolons, sem trailing commas
