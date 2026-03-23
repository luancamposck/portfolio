# PRD: Portfólio Criativo — Luan Campos K.

## Introdução

Criar um portfólio web multi-page que impressione clientes freelance e empresas contratantes. O site deve ser uma demonstração viva de habilidade técnica: animações pesadas (cursor spotlight, magnetic buttons, 3D tilt cards, text reveal, parallax), dark mode como padrão, e uso extensivo de componentes shadcn. O portfólio em si é o projeto mais impressionante do portfólio.

**Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + shadcn (base-nova) + Motion + TypeScript

## Goals

- Criar uma experiência visual que impressione nos primeiros 3 segundos (hero com wow factor)
- Demonstrar domínio fullstack através do próprio site (animações, performance, SEO, acessibilidade)
- Facilitar contato de clientes e recrutadores (CTAs claros, múltiplos canais)
- Ser rápido e acessível apesar das animações pesadas (respeitar `prefers-reduced-motion`)
- Maximizar uso de componentes shadcn para consistência e manutenibilidade

## User Stories

### US-001: Setup de dependências e configuração base
**Descrição:** Como desenvolvedor, preciso instalar as dependências e configurar o projeto para suportar animações (Motion), blog (MDX) e tema dark/light.

**Acceptance Criteria:**
- [ ] `motion` instalado e funcionando
- [ ] `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` instalados
- [ ] `next.config.ts` configurado com suporte a MDX (`createMDX` + `pageExtensions`)
- [ ] `mdx-components.tsx` criado na raiz do projeto
- [ ] `@tailwindcss/typography` instalado para prose styles no blog
- [ ] `next-themes` instalado para gerenciamento de tema dark/light
- [ ] Estrutura de pastas criada: `components/layout/`, `components/creative/`, `components/sections/`, `data/`, `content/blog/`
- [ ] Typecheck passa (`npx tsc --noEmit`)

---

### US-002: Instalar componentes shadcn necessários
**Descrição:** Como desenvolvedor, preciso instalar todos os componentes shadcn que serão usados no portfólio para manter consistência visual.

**Acceptance Criteria:**
- [ ] Componentes UI instalados via `npx shadcn@latest add`: `card`, `badge`, `separator`, `sheet`, `navigation-menu`, `dialog`, `skeleton`, `tabs`, `toggle`, `avatar`, `tooltip`, `scroll-area`, `carousel`, `dropdown-menu`
- [ ] Hook `use-mobile` instalado via shadcn
- [ ] Todos os componentes importáveis sem erro
- [ ] Typecheck passa

---

### US-003: Sistema de tema dark/light com shadcn
**Descrição:** Como visitante, quero alternar entre dark mode e light mode para navegar no tema que prefiro.

**Acceptance Criteria:**
- [ ] `next-themes` configurado com ThemeProvider no layout raiz
- [ ] Dark mode é o padrão (`defaultTheme: "dark"`)
- [ ] Respeita preferência do sistema como fallback
- [ ] Botão de toggle no navbar usando shadcn `dropdown-menu` com opções: Light, Dark, System
- [ ] Ícone muda entre Sun/Moon (lucide-react) conforme o tema ativo
- [ ] Transição suave entre temas (CSS transition em background-color)
- [ ] Tema persiste via cookie/localStorage
- [ ] Verify in browser using dev-browser skill

---

### US-004: Navbar responsivo com animação
**Descrição:** Como visitante, quero navegar entre as páginas do portfólio por um menu elegante que reage ao scroll.

**Acceptance Criteria:**
- [ ] Navbar sticky no topo usando shadcn `navigation-menu` como base
- [ ] Links: Home, Projetos, About (Blog fica para v2)
- [ ] Logo/nome "Luan Campos K." à esquerda
- [ ] Toggle de tema à direita (US-003)
- [ ] Efeito backdrop-blur + shrink ao scrollar (CSS transition + IntersectionObserver ou scroll event)
- [ ] No mobile: menu hamburger que abre shadcn `sheet` (drawer lateral) com links animados (stagger com Motion)
- [ ] Hook `use-mobile` do shadcn para detectar breakpoint
- [ ] Verify in browser using dev-browser skill

---

### US-005: Footer
**Descrição:** Como visitante, quero ver informações de contato e links sociais no rodapé.

**Acceptance Criteria:**
- [ ] Footer com shadcn `separator` no topo
- [ ] Links sociais: GitHub, LinkedIn, Email (ícones lucide-react)
- [ ] Copyright com ano dinâmico
- [ ] Layout responsivo (stack vertical no mobile, horizontal no desktop)
- [ ] Verify in browser using dev-browser skill

---

### US-006: Layout raiz com Navbar + Footer
**Descrição:** Como desenvolvedor, preciso montar o layout raiz que envolve todas as páginas com Navbar e Footer.

**Acceptance Criteria:**
- [ ] `layout.tsx` atualizado com ThemeProvider, Navbar e Footer
- [ ] `scroll-behavior: smooth` no `globals.css`
- [ ] Conteúdo (`children`) ocupa espaço entre Navbar e Footer (flex-grow)
- [ ] Typecheck passa
- [ ] Verify in browser using dev-browser skill

---

### US-007: Componentes criativos — Gradient Blob
**Descrição:** Como visitante, quero ver blobs decorativos animados no background do hero para criar atmosfera visual.

**Acceptance Criteria:**
- [ ] Componente `gradient-blob.tsx` em `components/creative/`
- [ ] Blobs usam CSS `@keyframes` (float/morph) — sem JS para performance
- [ ] Cores baseadas nas variáveis de tema (oklch) — mudam com dark/light
- [ ] `position: absolute` + `pointer-events: none` para não atrapalhar interação
- [ ] Blur forte (`blur-3xl`) para efeito de glow suave
- [ ] Aceita props: `className`, `color`, `size`, `delay`

---

### US-008: Componentes criativos — Text Reveal
**Descrição:** Como visitante, quero ver textos aparecendo caractere por caractere ou palavra por palavra conforme eu faço scroll — efeito cinematográfico.

**Acceptance Criteria:**
- [ ] Componente `text-reveal.tsx` em `components/creative/`
- [ ] Usa Motion `whileInView` + `stagger` para animar cada palavra/caractere
- [ ] Props: `text`, `className`, `delay`, `mode: "words" | "chars"`
- [ ] Respeita `prefers-reduced-motion` (mostra texto direto sem animação)
- [ ] Animação de `opacity` + `translateY` (GPU-composited)

---

### US-009: Componentes criativos — Cursor Spotlight
**Descrição:** Como visitante em desktop, quero ver um efeito sutil de luz seguindo meu cursor no fundo escuro — sensação premium.

**Acceptance Criteria:**
- [ ] Componente `cursor-spotlight.tsx` em `components/creative/`
- [ ] Gradiente radial que segue a posição do mouse via CSS custom properties
- [ ] Usa `mousemove` event listener no container
- [ ] Desativado no mobile (sem mouse)
- [ ] `pointer-events: none` para não bloquear cliques
- [ ] Carregado com `next/dynamic({ ssr: false })` para evitar custo de hydration
- [ ] Sutil — não deve distrair do conteúdo

---

### US-010: Componentes criativos — Magnetic Button
**Descrição:** Como visitante, quero que botões CTA importantes "puxem" na direção do meu cursor — efeito magnético interativo.

**Acceptance Criteria:**
- [ ] Componente `magnetic-button.tsx` em `components/creative/`
- [ ] Usa Motion `useMotionValue` + `useSpring` para tracking suave do mouse
- [ ] Efeito ativo somente em hover (desktop)
- [ ] Aceita `children` e herda estilos do shadcn `button`
- [ ] Volta suavemente à posição original ao sair do hover (spring physics)
- [ ] Respeita `prefers-reduced-motion`

---

### US-011: Componentes criativos — Marquee
**Descrição:** Como visitante, quero ver uma faixa de tecnologias/ferramentas rolando infinitamente — visual moderno de tech stack.

**Acceptance Criteria:**
- [ ] Componente `marquee.tsx` em `components/creative/`
- [ ] Scroll horizontal infinito usando CSS `@keyframes translateX` (sem JS)
- [ ] Aceita `items: string[]` e `speed` como props
- [ ] Duplica os items para criar loop sem gap
- [ ] Pausa no hover (CSS `animation-play-state: paused`)
- [ ] Respeita `prefers-reduced-motion` (fica estático)

---

### US-012: Componentes criativos — Counter animado
**Descrição:** Como visitante, quero ver números contando de 0 até o valor final quando a seção entra na tela — demonstra impacto.

**Acceptance Criteria:**
- [ ] Componente `counter.tsx` em `components/creative/`
- [ ] Usa Motion `useInView` para trigger + `animate` para count-up
- [ ] Props: `target: number`, `suffix?: string` (ex: "+", "%"), `duration?: number`
- [ ] Anima somente uma vez (quando entra na viewport pela primeira vez)
- [ ] Respeita `prefers-reduced-motion` (mostra valor final direto)

---

### US-013: Componentes criativos — Project Card com 3D tilt
**Descrição:** Como visitante, quero que cards de projetos tenham um efeito 3D sutil no hover — destaca cada projeto de forma interativa.

**Acceptance Criteria:**
- [ ] Componente `project-card.tsx` em `components/creative/`
- [ ] Base: shadcn `card` com overlay customizado
- [ ] Efeito 3D tilt via CSS `perspective` + `rotateX/rotateY` calculado pela posição do mouse
- [ ] Overlay com gradiente que revela título e tags no hover
- [ ] Imagem de capa com efeito parallax sutil no hover
- [ ] Props tipadas: `project: Project` (type definido em `data/projects.ts`)
- [ ] Clicável — navega para `/projects/[slug]`
- [ ] Respeita `prefers-reduced-motion` (sem tilt, hover normal)
- [ ] Verify in browser using dev-browser skill

---

### US-014: Section Wrapper com scroll reveal
**Descrição:** Como desenvolvedor, preciso de um wrapper reutilizável que anima qualquer seção com fade-up ao entrar na viewport.

**Acceptance Criteria:**
- [ ] Componente `section-wrapper.tsx` em `components/layout/`
- [ ] Usa Motion `whileInView` com `fadeIn` + `translateY(20px → 0)`
- [ ] Props: `children`, `className`, `delay?: number`
- [ ] `viewport: { once: true }` — anima somente na primeira vez
- [ ] Respeita `prefers-reduced-motion`

---

### US-015: Dados mock de projetos
**Descrição:** Como desenvolvedor, preciso de dados placeholder de projetos para construir as páginas.

**Acceptance Criteria:**
- [ ] Arquivo `src/data/projects.ts` com type `Project` exportado
- [ ] Type inclui: `slug`, `title`, `subtitle`, `description`, `longDescription`, `coverImage`, `images: string[]`, `tags: string[]`, `category`, `client`, `year`, `liveUrl?`, `githubUrl?`, `featured: boolean`, `results: string[]`
- [ ] 5-6 projetos mock com dados realistas (nomes fictícios mas plausíveis)
- [ ] 2-3 projetos marcados como `featured: true`
- [ ] Imagens referenciando paths em `/public/images/projects/` (placeholder — usar `placeholder.svg` ou similar)
- [ ] Typecheck passa

---

### US-016: Home — Seção Hero
**Descrição:** Como visitante, quero ser impactado nos primeiros segundos com um hero animado e marcante.

**Acceptance Criteria:**
- [ ] Componente `hero.tsx` em `components/sections/`
- [ ] Full viewport height (`min-h-svh`)
- [ ] Heading grande e bold com `text-reveal` animado: frase impactante sobre entregar resultados
- [ ] Subtítulo com descrição curta
- [ ] CTA usando `magnetic-button` → link para `/projects`
- [ ] `gradient-blob` no background (2-3 blobs com cores diferentes)
- [ ] `cursor-spotlight` ativo na seção inteira
- [ ] Layout centralizado vertical e horizontalmente
- [ ] Responsivo — funciona bem em mobile (sem efeitos mouse-dependent)
- [ ] Verify in browser using dev-browser skill

---

### US-017: Home — Seção Tech Stack Marquee
**Descrição:** Como visitante, quero ver as tecnologias que o dev domina em uma faixa rolante.

**Acceptance Criteria:**
- [ ] Componente `tech-stack.tsx` em `components/sections/`
- [ ] Usa componente `marquee` com lista de tecnologias
- [ ] Ícones ou texto em monospace para cada tech
- [ ] shadcn `separator` acima e abaixo da faixa
- [ ] Envolvido em `section-wrapper` para fade-in no scroll
- [ ] Verify in browser using dev-browser skill

---

### US-018: Home — Seção Projetos Destacados
**Descrição:** Como visitante, quero ver 2-3 projetos em destaque com cards interativos que me levam aos detalhes.

**Acceptance Criteria:**
- [ ] Componente `featured-projects.tsx` em `components/sections/`
- [ ] Filtra projetos com `featured: true` do `data/projects.ts`
- [ ] Renderiza `project-card` para cada projeto
- [ ] Heading da seção com `text-reveal`
- [ ] Grid responsivo: 1 coluna mobile, 2-3 colunas desktop
- [ ] Stagger animation nos cards (cada um aparece com delay incremental)
- [ ] Link "Ver todos os projetos" no final → `/projects`
- [ ] Envolvido em `section-wrapper`
- [ ] Verify in browser using dev-browser skill

---

### US-019: Home — Seção About Preview com Counters
**Descrição:** Como visitante, quero ter um resumo sobre o dev com números de impacto animados.

**Acceptance Criteria:**
- [ ] Componente `about-preview.tsx` em `components/sections/`
- [ ] Layout split: texto à esquerda, counters à direita
- [ ] Texto placeholder: breve bio, abordagem de trabalho
- [ ] 3-4 counters animados: anos de experiência, projetos entregues, clientes satisfeitos, tecnologias dominadas
- [ ] Cada counter usa componente `counter` com sufixo ("+")
- [ ] Botão "Saiba mais" → `/about`
- [ ] Envolvido em `section-wrapper`
- [ ] Verify in browser using dev-browser skill

---

### US-020: Home — Seção CTA
**Descrição:** Como visitante interessado, quero uma seção final clara que me incentive a entrar em contato.

**Acceptance Criteria:**
- [ ] Componente `cta.tsx` em `components/sections/`
- [ ] Heading impactante: "Vamos construir algo incrível juntos?"
- [ ] `magnetic-button` com link para email (mailto:)
- [ ] Links sociais (GitHub, LinkedIn) com ícones lucide-react
- [ ] Background diferenciado (gradient sutil ou cor de acento)
- [ ] Envolvido em `section-wrapper`
- [ ] Verify in browser using dev-browser skill

---

### US-021: Montar Home Page completa
**Descrição:** Como desenvolvedor, preciso compor todas as seções na home page na ordem certa.

**Acceptance Criteria:**
- [ ] `src/app/page.tsx` compõe as seções em ordem: Hero → Tech Stack → Featured Projects → About Preview → CTA
- [ ] Espaçamento consistente entre seções (`py-20` ou similar)
- [ ] Todas as animações funcionam no scroll
- [ ] Performance: não trava no scroll, animações suaves (60fps)
- [ ] Responsivo: todas as seções funcionam em mobile e desktop
- [ ] Typecheck passa
- [ ] Verify in browser using dev-browser skill

---

### US-022: Página de Projetos — Listagem com filtros
**Descrição:** Como visitante, quero ver todos os projetos organizados com filtro por categoria.

**Acceptance Criteria:**
- [ ] `src/app/projects/page.tsx` criado
- [ ] Heading animado com `text-reveal`
- [ ] Barra de filtro com shadcn `toggle-group`: All, Web, SaaS, E-commerce, Mobile
- [ ] Grid de `project-card` com todos os projetos (filtrado pela categoria ativa)
- [ ] Stagger animation nos cards ao trocar filtro
- [ ] Layout responsivo: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Metadata (title, description) para SEO
- [ ] Envolvido em `section-wrapper`
- [ ] Verify in browser using dev-browser skill

---

### US-023: Página de Projeto — Detalhe
**Descrição:** Como visitante, quero ver os detalhes completos de um projeto com galeria de imagens e resultados.

**Acceptance Criteria:**
- [ ] `src/app/projects/[slug]/page.tsx` criado
- [ ] `await params` usado corretamente (Next.js 16 — params é Promise)
- [ ] `generateStaticParams` exportado para pré-renderizar todos os slugs
- [ ] Hero: imagem de capa full-width com título overlay
- [ ] Info: cliente, ano, tags com shadcn `badge`, links (live/GitHub) com shadcn `button`
- [ ] Descrição longa do projeto
- [ ] Galeria de imagens com shadcn `carousel` ou `dialog` para lightbox
- [ ] Resultados em cards com `counter` animados
- [ ] Navegação prev/next para outros projetos
- [ ] Metadata dinâmica (title, description, og:image) via `generateMetadata`
- [ ] `loading.tsx` com shadcn `skeleton`
- [ ] Verify in browser using dev-browser skill

---

### US-024: Página About
**Descrição:** Como visitante, quero conhecer o dev em detalhe: bio, habilidades, experiência e forma de contato.

**Acceptance Criteria:**
- [ ] `src/app/about/page.tsx` criado
- [ ] Hero: avatar placeholder + nome + título, animação de entrada
- [ ] Bio: texto extended sobre background, abordagem e filosofia (placeholder)
- [ ] Skills: grid de tecnologias agrupadas por categoria (Frontend, Backend, DevOps, Tools) usando shadcn `badge` e shadcn `card`
- [ ] Timeline: experiência profissional em timeline vertical, cada item com scroll reveal
- [ ] CTA final: reutiliza componente `cta.tsx`
- [ ] Metadata para SEO
- [ ] Verify in browser using dev-browser skill

---

### US-025: Página 404 criativa
**Descrição:** Como visitante que acessa URL inválida, quero ver uma página 404 com personalidade em vez de uma tela genérica.

**Acceptance Criteria:**
- [ ] `src/app/not-found.tsx` criado
- [ ] Heading grande "404" com animação
- [ ] Mensagem amigável
- [ ] Botão para voltar à home usando shadcn `button`
- [ ] Gradient blob no background
- [ ] Verify in browser using dev-browser skill

---

### US-026: Polish — Performance e Acessibilidade
**Descrição:** Como desenvolvedor, preciso garantir que o site é performático e acessível apesar das animações pesadas.

**Acceptance Criteria:**
- [ ] Todas as animações respeitam `prefers-reduced-motion` (mediaQuery check)
- [ ] Imagens usam `next/image` com lazy loading
- [ ] Componentes pesados (cursor-spotlight, magnetic-button) carregados com `next/dynamic({ ssr: false })`
- [ ] Semantic HTML: headings hierárquicos, landmarks (`main`, `nav`, `footer`)
- [ ] Skip-to-content link acessível
- [ ] Focus visible em todos os interativos
- [ ] `npm run build` passa sem erros
- [ ] Core Web Vitals razoáveis (LCP < 2.5s, CLS < 0.1)

---

### US-027: Polish — Metadata e SEO
**Descrição:** Como desenvolvedor, preciso que o site tenha bom SEO e boa aparência quando compartilhado em redes sociais.

**Acceptance Criteria:**
- [ ] Metadata global no `layout.tsx`: title template, description, og:image default
- [ ] Cada página tem `generateMetadata` ou metadata estática com title e description únicos
- [ ] Open Graph images para compartilhamento social
- [ ] `robots.txt` e `sitemap.xml` via Next.js App Router conventions
- [ ] Structured data (JSON-LD) para Person schema na home

## Functional Requirements

- FR-1: O site deve ter 4 páginas: Home, Projetos (listagem), Projeto (detalhe), About
- FR-2: Navegação entre páginas via Navbar presente em todas as páginas
- FR-3: Toggle de tema dark/light acessível de qualquer página, dark como padrão
- FR-4: Hero da home deve ter animações pesadas: text reveal, gradient blobs, cursor spotlight, magnetic CTA
- FR-5: Cards de projeto devem ter efeito 3D tilt no hover com overlay de informações
- FR-6: Seções devem animar com fade-up ao entrar na viewport (scroll reveal)
- FR-7: Marquee de tech stack com scroll infinito horizontal
- FR-8: Counters animados (count-up) para métricas de impacto
- FR-9: Página de projetos deve filtrar por categoria sem reload
- FR-10: Página de detalhe do projeto deve ser gerada estaticamente (`generateStaticParams`)
- FR-11: Mobile: drawer menu (shadcn sheet), sem efeitos mouse-dependent
- FR-12: Todas as animações devem respeitar `prefers-reduced-motion`
- FR-13: Componentes shadcn usados sempre que possível para UI base (card, badge, button, sheet, navigation-menu, dialog, skeleton, tabs, toggle-group, separator, carousel, dropdown-menu, avatar, tooltip, scroll-area)

## Non-Goals (Out of Scope — v1)

- Blog (listagem e posts MDX) — será adicionado na v2
- Formulário de contato funcional — v1 usa mailto: e links diretos
- Internacionalização (i18n) — v1 é somente em PT-BR
- CMS ou painel admin — conteúdo é hardcoded/data files
- Analytics — será adicionado após deploy
- Efeitos 3D com Three.js/WebGL — complexidade excessiva para v1
- Efeitos sonoros — distrativo e problemático para acessibilidade
- Depoimentos/testimonials — depende de conteúdo real

## Design Considerations

- **Visual:** Dark mode premium, inspirado em linear.app e vercel.com, com personalidade própria via animações criativas
- **Tipografia:** Geist Sans (body) + Geist Mono (code/tech), hierarquia clara com tamanhos grandes no hero
- **Cores:** Esquema oklch com acento vibrante (electric blue ou violet) sobre fundo escuro neutro; tema light alternativo
- **Spacing:** Seções generosas (`py-20`+), breathing room entre elementos
- **Componentes shadcn:** Base para toda UI; customizar via CVA variants e Tailwind quando necessário
- **Imagens placeholder:** Usar gradientes ou SVGs até ter screenshots reais dos projetos

## Technical Considerations

- **Next.js 16:** `params` é Promise nos dynamic routes — usar `await params`. Consultar `node_modules/next/dist/docs/` antes de usar APIs do framework
- **React 19 + React Compiler:** Evitar patterns incompatíveis (refs em funções de render, etc.)
- **Motion (ex-Framer Motion):** Biblioteca principal de animação. Preferir `whileInView`, `useMotionValue`, `useSpring`, `AnimatePresence`
- **Performance:** Animações CSS para efeitos simples (blobs, marquee), Motion para efeitos complexos (scroll, gestures). Somente `transform`/`opacity` animados
- **shadcn components.json:** Style "base-nova", usa `@base-ui/react` como primitive layer. Componentes instalados via CLI `npx shadcn@latest add`
- **next-themes:** Para gerenciamento de tema com SSR-safe approach (evitar flash)

## Success Metrics

- Visitante fica impressionado nos primeiros 3 segundos (hero impactante com animações)
- Navegação fluida sem lag — animações a 60fps
- Lighthouse Performance > 90, Accessibility > 95, SEO > 95
- Tempo de carregamento inicial < 2s
- Portfólio funciona perfeitamente em mobile e desktop
- Build passa sem warnings ou erros

## Open Questions

- Qual email e links sociais reais do Luan? (usar placeholders por enquanto)
- Fotos/avatar do Luan disponíveis? (usar placeholder)
- Cor de acento preferida? (assumir electric blue/violet, ajustar depois)
- Domínio para deploy? (não afeta desenvolvimento)
