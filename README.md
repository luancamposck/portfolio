# Luan Campos K. — software engineering portfolio

A personal portfolio bringing together professional projects, technical writing, and a collection of reusable code assets. The application is built with Next.js and organized around localized routes, content modules, and shared interface components.

**[Visit the portfolio →](https://luancamposk.dev)**

![Portfolio homepage showing the main introduction and navigation in the dark theme](docs/readme/homepage.webp)

## Visual showcase

The project collection presents work through filterable cards that lead to dedicated detail pages with context, technologies, and galleries.

![Portfolio projects page with category filters and project cards](docs/readme/projects.webp)

The technical blog renders MDX articles with linked headings and a dedicated reading layout. The article shown here is published in Portuguese.

![Technical article page showing its title, reading time, tags, and article content](docs/readme/blog.webp)

The code asset library combines searchable cards with detail pages for highlighted source code and explanations. These views show the portfolio's own interface, with examples from its content collection.

![Code asset library showing search, category filters, and snippet previews](docs/readme/code-assets.webp)

![Code asset detail page displaying a syntax-highlighted shell script](docs/readme/asset-detail.webp)

## Architecture and project structure

```text
src/
├── app/                  Routes, layouts, metadata, and page composition
│   └── [locale]/         Localized pages and detail routes
├── modules/
│   ├── projects/         Project data and queries
│   ├── blog/             MDX loading, queries, and frontmatter validation
│   ├── assets/           Code asset data and listing summaries
│   └── content/          Shared syntax-highlighting configuration
├── shared/
│   ├── components/       UI primitives, layouts, sections, and MDX components
│   ├── hooks/            Shared hooks
│   └── lib/              Shared utilities
├── i18n/                 Locale routing, navigation, and message loading
└── proxy.ts              Locale-aware request routing

content/blog/             MDX articles and frontmatter
messages/                 Interface translations
public/                   Images, fonts, and static files
```

Route files compose pages and generate metadata while the content modules own data access and content-specific operations. Shared components provide the visual building blocks used across routes. This keeps an article's MDX parsing and validation separate from its page layout, while leaving route behavior visible in the App Router.

## Engineering decisions

### Server rendering with focused client boundaries

Page and layout files are Server Components. Interactive pieces, including the navigation, filtering controls, theme switcher, and animation components, are isolated behind client boundaries. The hero and call to action dynamically load the magnetic button; the hero also loads its cursor spotlight with server rendering disabled. This keeps browser-dependent effects out of the server-rendered component tree while preserving server-side page composition.

### Content models shaped for their consumers

Projects and assets are maintained in domain modules; blog articles are read from MDX files. The blog loader validates required frontmatter, dates, locales, and duplicate locale/slug pairs before exposing published posts. Blog and asset listing pages pass summaries to client components, omitting full article bodies and asset explanations; asset code previews are limited to the first four lines. Detail pages access the complete content when needed.

### Localization tied to content availability

`next-intl` provides locale-aware routing and loads interface messages for Portuguese, English, and Spanish. Blog posts and assets carry their own locale, so translated interface routes do not imply that every content item is translated. Detail lookup and static parameters use both locale and slug; when a translation is unavailable, the language selector returns to the corresponding listing. Project data is shared across locales rather than translated in the content module.

### Search metadata and motion preferences

Pages define metadata and canonical URLs; localized content details and the sitemap derive language alternatives from available posts and assets. The homepage also includes person-shaped JSON-LD. Motion components such as project cards, text reveals, and section wrappers check the reduced-motion preference, and the layout provides a skip link. These are targeted measures within the implementation rather than a claim of comprehensive accessibility coverage.

## Technology stack

| Responsibility | Technologies |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Styling and UI | Tailwind CSS v4, shadcn/ui, Base UI |
| Interaction | Motion, Embla Carousel |
| Internationalization | next-intl |
| Content and code | MDX, gray-matter, rehype, Shiki |
| Development tooling | Biome |

## About the developer

Luan Campos K. is a software engineer whose work spans full-stack development, software architecture, and building web applications.

[Portfolio](https://luancamposk.dev) · [GitHub](https://github.com/luancamposck)
