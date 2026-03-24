# PRD: Portfólio v2 — Blog, Assets, i18n e Polish

## Introdução

Evolução do portfólio para v2 com foco em três pilares: (1) corrigir bugs e polir a v1, (2) criar seções de conteúdo que demonstram conhecimento técnico (Blog + "Meus Assets"), e (3) internacionalizar o site em 3 idiomas (PT-BR, EN, ES) para atrair clientes internacionais.

O diferencial principal é a seção **"Meus Assets"** — uma coleção curada de trechos de código que o dev guarda, com explicações de o que fazem e por que são úteis. Funciona como um toolkit pessoal público que demonstra profundidade técnica e pensamento de engenharia.

**Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + shadcn (base-nova) + Motion + TypeScript + MDX

## Goals

- Corrigir todos os bugs visuais da v1 (fonte, imagens, responsividade)
- Criar sistema de "Meus Assets" — code snippets curados com explicação e contexto
- Criar blog tradicional com categorias, tags, search e reading time
- Internacionalizar o site em PT-BR, EN e ES
- Manter performance e acessibilidade da v1

## User Stories

---

### US-001: Fix — Fonte Varela Round não carrega
**Descrição:** Como visitante, quero ver o site com a fonte Varela Round corretamente aplicada em vez de Times New Roman.

**Acceptance Criteria:**
- [ ] Fonte Varela Round carrega corretamente via `next/font/google`
- [ ] CSS variable `--font-sans` resolve para Varela Round em toda a aplicação
- [ ] Fallback para sans-serif genérico caso a fonte falhe
- [ ] Geist Mono continua funcionando para fonte mono
- [ ] Typecheck/lint passa
- [ ] Verify in browser using dev-browser skill

---

### US-002: Fix — Image fill sem position no project-card
**Descrição:** Como desenvolvedor, preciso corrigir o warning de `next/image` com `fill` cujo pai não tem position relativa.

**Acceptance Criteria:**
- [ ] `motion.div` pai da Image em `project-card.tsx` tem `className="relative"`
- [ ] Warning "parent element with invalid position" não aparece mais no console
- [ ] Typecheck/lint passa
- [ ] Verify in browser using dev-browser skill

---

### US-003: Fix — Revisão geral de responsividade
**Descrição:** Como visitante mobile, quero que todas as páginas funcionem perfeitamente em telas pequenas.

**Acceptance Criteria:**
- [ ] Home: hero, marquee, featured projects, about preview, CTA — todos visualmente corretos em 375px, 768px e 1440px
- [ ] Projects: listagem e filtro funcionam em mobile
- [ ] Project detail: hero, gallery, results, navigation — todos responsivos
- [ ] About: hero, bio, skills, timeline — todos responsivos
- [ ] Navbar mobile drawer funciona sem bugs
- [ ] Nenhum overflow horizontal em nenhuma página
- [ ] Verify in browser using dev-browser skill

---

### US-004: Setup i18n — Estrutura de internacionalização
**Descrição:** Como desenvolvedor, preciso configurar o sistema de i18n para suportar PT-BR, EN e ES com routing baseado em locale.

**Acceptance Criteria:**
- [ ] Biblioteca de i18n escolhida e instalada (next-intl ou solução equivalente compatível com Next.js 16 App Router)
- [ ] Estrutura de rotas com locale prefix: `/pt`, `/en`, `/es` (ex: `/en/projects`, `/es/about`)
- [ ] Middleware de locale detection baseado no `Accept-Language` header do browser
- [ ] Redirect automático de `/` para o locale detectado (default: `pt`)
- [ ] Layout raiz adaptado para receber `params.locale`
- [ ] Typecheck/lint passa

---

### US-005: i18n — Arquivos de tradução base
**Descrição:** Como desenvolvedor, preciso criar os arquivos de tradução para os 3 idiomas com todo o conteúdo estático do site.

**Acceptance Criteria:**
- [ ] Arquivos de tradução criados: `messages/pt.json`, `messages/en.json`, `messages/es.json`
- [ ] Seções traduzidas: navbar, footer, hero, tech-stack, featured-projects, about-preview, CTA, projects page, project detail, about page, 404
- [ ] Traduções em EN e ES são naturais (não Google Translate literal)
- [ ] Hook ou função `useTranslations()` disponível para componentes
- [ ] Typecheck/lint passa

---

### US-006: i18n — Componentes atualizados
**Descrição:** Como desenvolvedor, preciso atualizar todos os componentes existentes para usar as traduções em vez de strings hardcoded.

**Acceptance Criteria:**
- [ ] Navbar: links traduzidos por locale
- [ ] Hero: heading, subtitle e CTA traduzidos
- [ ] Footer: textos traduzidos
- [ ] Todas as seções da home usam traduções
- [ ] Pages de projects, about e 404 usam traduções
- [ ] Project data (title, description) mantém PT-BR (conteúdo real, não traduzido)
- [ ] Typecheck/lint passa
- [ ] Verify in browser using dev-browser skill

---

### US-007: i18n — Seletor de idioma
**Descrição:** Como visitante, quero poder trocar o idioma do site por um seletor no navbar.

**Acceptance Criteria:**
- [ ] Seletor de idioma no navbar (ao lado do theme toggle) usando shadcn `dropdown-menu`
- [ ] Opções: Português, English, Español — com bandeira ou label do idioma
- [ ] Ao trocar, redireciona para a mesma página no novo locale (ex: `/pt/projects` → `/en/projects`)
- [ ] Locale escolhido persiste via cookie
- [ ] Metadata (og:locale, hreflang) atualizada por locale
- [ ] Verify in browser using dev-browser skill

---

### US-008: Meus Assets — Data layer e tipos
**Descrição:** Como desenvolvedor, preciso definir a estrutura de dados para os code assets.

**Acceptance Criteria:**
- [ ] Type `CodeAsset` definido em `src/data/assets.ts`
- [ ] Type inclui: `slug`, `title`, `description`, `locale` ("pt" | "en" | "es"), `language` (ts, js, python, go, bash, css, etc.), `code: string`, `explanation: string` (MDX ou markdown), `tags: string[]`, `category` (ex: "utils", "hooks", "patterns", "algorithms", "devops"), `createdAt: string`, `updatedAt?: string`
- [ ] 8-10 assets mock com código real e explicações úteis (ex: debounce, custom hook de fetch, pattern de retry, docker compose snippet, regex útil, etc.) — maioria em `locale: "pt"`, 2-3 em `locale: "en"`
- [ ] Funções utilitárias: `getAssetBySlug`, `getAssetsByCategory`, `getAssetsByTag`, `getAllAssetCategories`, `getAllAssetTags`
- [ ] Typecheck passa

---

### US-009: Meus Assets — Página de listagem
**Descrição:** Como visitante, quero navegar pela coleção de code assets do dev, filtrando por categoria, tag ou linguagem.

**Acceptance Criteria:**
- [ ] Rota `/<locale>/assets` criada
- [ ] Link "Assets" adicionado ao navbar (entre Projects e About)
- [ ] Heading animado com TextReveal
- [ ] Barra de filtro: por categoria (toggle-group) e/ou busca por texto
- [ ] Listagem filtra assets pelo locale da rota atual (ex: `/pt/assets` mostra só `locale: "pt"`)
- [ ] Grid de cards com: título, linguagem (badge colorido), descrição curta, tags, preview do código (3-4 linhas truncadas com syntax highlighting)
- [ ] Cards clicáveis → `/<locale>/assets/[slug]`
- [ ] Stagger animation nos cards
- [ ] Metadata SEO
- [ ] Responsivo
- [ ] Traduções i18n para labels estáticos (heading, filtros, etc.)
- [ ] Verify in browser using dev-browser skill

---

### US-010: Meus Assets — Página de detalhe
**Descrição:** Como visitante, quero ver um asset específico com o código completo, syntax highlighting e explicação detalhada.

**Acceptance Criteria:**
- [ ] Rota `/<locale>/assets/[slug]` criada
- [ ] `generateStaticParams` para pré-renderizar todos os slugs
- [ ] Título do asset com linguagem badge
- [ ] Bloco de código com syntax highlighting (rehype-pretty-code + shiki)
- [ ] Botão "Copiar código" usando shadcn `button` + Clipboard API
- [ ] Explicação renderizada como markdown/MDX com prose styling
- [ ] Tags como badges clicáveis (filtram na listagem)
- [ ] Navegação prev/next entre assets
- [ ] Metadata dinâmica via `generateMetadata`
- [ ] Traduções i18n para labels estáticos
- [ ] Verify in browser using dev-browser skill

---

### US-011: Blog — Data layer com MDX
**Descrição:** Como desenvolvedor, preciso configurar o sistema de blog com MDX para posts ricos.

**Acceptance Criteria:**
- [ ] Type `BlogPost` definido em `src/data/blog-posts.ts`
- [ ] Type inclui: `slug`, `title`, `description`, `locale` ("pt" | "en" | "es"), `date: string`, `updatedAt?: string`, `tags: string[]`, `category: string`, `readingTime: string`, `coverImage?: string`, `published: boolean`
- [ ] Posts MDX em `content/blog/` com frontmatter exportando metadata
- [ ] Função para calcular reading time baseado no conteúdo
- [ ] Funções utilitárias: `getAllPosts` (sorted by date), `getPostBySlug`, `getPostsByTag`, `getPostsByCategory`
- [ ] 2-3 posts placeholder com conteúdo técnico relevante (ex: "Como estruturo meus projetos Next.js", "Patterns que uso em todo projeto React", "Meu setup de DevOps") — maioria em `locale: "pt"`, 1 em `locale: "en"`
- [ ] Typecheck passa

---

### US-012: Blog — Página de listagem
**Descrição:** Como visitante, quero navegar pelos posts do blog com filtros e busca.

**Acceptance Criteria:**
- [ ] Rota `/<locale>/blog` criada
- [ ] Link "Blog" adicionado ao navbar (entre Assets e About)
- [ ] Heading animado com TextReveal
- [ ] Cards de posts com: título, data formatada pelo locale, reading time, descrição, tags, cover image (se houver)
- [ ] Filtro por categoria e/ou busca por texto
- [ ] Listagem filtra posts pelo locale da rota atual (ex: `/en/blog` mostra só `locale: "en"`)
- [ ] Posts ordenados por data (mais recente primeiro)
- [ ] Posts com `published: false` não aparecem na listagem
- [ ] Stagger animation nos cards
- [ ] Metadata SEO
- [ ] Responsivo
- [ ] Traduções i18n para labels estáticos
- [ ] Verify in browser using dev-browser skill

---

### US-013: Blog — Página de post
**Descrição:** Como visitante, quero ler um post completo com tipografia agradável e syntax highlighting.

**Acceptance Criteria:**
- [ ] Rota `/<locale>/blog/[slug]` criada
- [ ] `generateStaticParams` para pré-renderizar todos os slugs
- [ ] Header: título, data, reading time, tags, cover image
- [ ] Conteúdo MDX renderizado com `@tailwindcss/typography` prose classes
- [ ] Syntax highlighting em code blocks via rehype-pretty-code + shiki
- [ ] Headings com anchor links clicáveis (table of contents implícito)
- [ ] Navegação prev/next entre posts
- [ ] Metadata dinâmica (title, description, og:image) via `generateMetadata`
- [ ] Loading skeleton com shadcn `skeleton`
- [ ] Traduções i18n para labels estáticos
- [ ] Verify in browser using dev-browser skill

---

### US-014: Blog — Componentes MDX customizados
**Descrição:** Como autor, quero usar componentes React dentro dos posts MDX para enriquecer o conteúdo.

**Acceptance Criteria:**
- [ ] `mdx-components.tsx` atualizado com componentes customizados
- [ ] Componentes disponíveis nos MDX: `Callout` (info/warning/error), `CodeBlock` (com copy button), `Image` (wrapper de next/image otimizado)
- [ ] Estilos consistentes com o design system (cores, spacing, tipografia)
- [ ] Typecheck passa
- [ ] Verify in browser using dev-browser skill

---

### US-015: Syntax highlighting com rehype-pretty-code
**Descrição:** Como desenvolvedor, preciso configurar syntax highlighting bonito para code blocks no blog e nos assets.

**Acceptance Criteria:**
- [ ] `rehype-pretty-code` e `shiki` instalados e configurados no `next.config.ts`
- [ ] Tema de syntax highlighting que funciona com dark e light mode
- [ ] Line numbers opcionais em code blocks
- [ ] Line highlighting (destacar linhas específicas)
- [ ] Título de arquivo no code block (ex: ```tsx title="components/button.tsx"```)
- [ ] Typecheck passa
- [ ] Verify in browser using dev-browser skill

---

### US-016: Navbar atualizado com novos links
**Descrição:** Como visitante, quero ver os novos links (Assets, Blog) no navbar com suporte a i18n.

**Acceptance Criteria:**
- [ ] Navbar exibe links: Home, Projects, Assets, Blog, About
- [ ] Links traduzidos por locale
- [ ] Active state funciona para todas as rotas incluindo as novas
- [ ] Mobile drawer atualizado com todos os links
- [ ] Seletor de idioma integrado (US-007)
- [ ] Verify in browser using dev-browser skill

---

### US-017: Sitemap e SEO atualizado
**Descrição:** Como desenvolvedor, preciso atualizar sitemap e metadata para incluir as novas páginas e locales.

**Acceptance Criteria:**
- [ ] `sitemap.ts` inclui todas as rotas de assets e blog
- [ ] `sitemap.ts` gera URLs para todos os 3 locales
- [ ] `robots.ts` atualizado se necessário
- [ ] hreflang tags nas páginas para alternate locales
- [ ] Metadata de cada página inclui locale correto
- [ ] Typecheck passa

---

### US-018: Polish — Animações e transições refinadas
**Descrição:** Como visitante, quero que as animações sejam mais suaves e polidas em todas as páginas.

**Acceptance Criteria:**
- [ ] Revisar timing de todas as animações (scroll reveal, stagger, counters)
- [ ] Page transitions suaves entre páginas (Motion AnimatePresence ou View Transitions API)
- [ ] Hover effects consistentes em todos os cards (projetos, assets, blog)
- [ ] Loading states com skeleton em todas as páginas dinâmicas
- [ ] `prefers-reduced-motion` respeitado em todos os novos componentes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: O site deve suportar 3 idiomas: PT-BR (padrão), EN, ES
- FR-2: Rotas devem incluir locale prefix: `/<locale>/...`
- FR-3: Middleware deve detectar idioma do browser e redirecionar
- FR-4: Seletor de idioma no navbar permite trocar idioma manualmente
- FR-5: Seção "Meus Assets" exibe code snippets curados com syntax highlighting e explicação
- FR-6: Assets podem ser filtrados por categoria, tag e linguagem
- FR-7: Cada asset tem botão de copiar código com feedback visual
- FR-8: Blog exibe posts MDX com categorias, tags e reading time
- FR-9: Posts MDX suportam componentes React customizados (Callout, CodeBlock, Image)
- FR-10: Syntax highlighting funciona em dark e light mode
- FR-11: Sitemap inclui todas as páginas em todos os locales
- FR-12: Formulário de contato mantém mailto: e links diretos (melhoria futura anotada)
- FR-13: Fonte Varela Round funciona corretamente como fonte principal

## Non-Goals (Out of Scope — v2)

- Formulário de contato funcional (Resend, etc.) — manter mailto: por enquanto, melhorar na v3
- CMS ou painel admin — conteúdo continua em data files e MDX
- Analytics (Vercel Analytics, Plausible) — adicionar separadamente após deploy
- Depoimentos/testimonials — depende de conteúdo real de clientes
- Efeitos 3D com Three.js/WebGL
- Comentários nos posts do blog
- Newsletter/email subscription
- RSS feed (candidato para v3)
- PWA / offline support

## Design Considerations

- **Assets cards:** Mostrar preview do código com syntax highlighting no próprio card (3-4 linhas) — impacto visual diferenciado
- **Blog cards:** Cover image opcional, fallback com gradient colorido baseado na categoria
- **Language selector:** Bandeiras são controversas (países ≠ idiomas) — usar labels textuais (PT, EN, ES) ou Globe icon + dropdown
- **Code blocks:** Tema de syntax highlighting compatível com o design system — considerar GitHub Dark/One Dark para dark mode
- **Assets vs Blog no navbar:** Assets primeiro (mais diferenciado), Blog depois
- **Componentes reutilizáveis:** Asset card e blog card podem compartilhar estrutura base com o project card

## Technical Considerations

- **i18n com Next.js 16 App Router:** Usar `next-intl` como biblioteca de i18n
- **MDX + i18n:** Conteúdo (blog posts e assets) é separado por idioma — cada post/asset tem um campo `locale` ("pt", "en" ou "es"). A listagem filtra por locale da rota atual (`/pt/blog` mostra só posts com `locale: "pt"`). Labels da UI (headings, botões, filtros) usam as traduções do `next-intl`
- **Conteúdo multi-idioma:** Não há linking entre versões traduzidas de um mesmo post/asset. São itens independentes. O autor cria primeiro em PT e depois pode criar uma versão em EN ou ES como um item separado
- **rehype-pretty-code + shiki:** Configurar no `next.config.ts` via `createMDX` options. Shiki adiciona peso ao bundle — usar lazy loading se necessário
- **Routing com locale:** `src/app/[locale]/` como layout dinâmico, com `generateStaticParams` para os 3 locales
- **Next.js 16:** Continuar consultando `node_modules/next/dist/docs/` para APIs. `params` é Promise nos dynamic routes
- **Clipboard API:** `navigator.clipboard.writeText()` — requer HTTPS ou localhost. Fallback com `document.execCommand('copy')` para browsers antigos

## Success Metrics

- Fonte Varela Round carrega corretamente em todos os browsers
- Site funciona nos 3 idiomas sem strings hardcoded visíveis
- Assets e blog indexáveis por buscadores (SSG + metadata)
- Code blocks com syntax highlighting legível em dark e light mode
- Botão de copiar código funciona sem erros
- Lighthouse: Performance > 85, Accessibility > 95, SEO > 95
- Build passa sem erros em todos os locales

## Open Questions

- Shiki themes: qual tema combina melhor com o design system? (testar github-dark-default)
- Nota para v3: implementar formulário de contato funcional com Resend + opção de agendar reunião (Cal.com)

## Resolved Questions

- **Biblioteca de i18n:** `next-intl` (confirmado)
- **Conteúdo multi-idioma (blog e assets):** Cada post/asset tem um campo `locale`. São itens independentes por idioma, sem linking entre versões traduzidas. Listagens filtram pelo locale da rota atual. Autor cria primeiro em PT, depois pode criar versão em EN ou ES separadamente
