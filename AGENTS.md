<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

## File structure

- shadcn UI components: `@/shared/components/ui/`
- General shared components: `@/shared/components/`
- Section components: `@/shared/components/sections/<section-name>/` (e.g. `sections/home/`, `sections/about/`)

## Server vs Client components

- `page.tsx` and `layout.tsx` files must NEVER be `"use client"`. They are always Server Components.
- When client-side interactivity is needed, extract a new client component and import it into the page/layout. Only make the minimum necessary piece a client component.

## Git commits

- All commit messages must be semantic (e.g. `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `test:`) and written in English.
- NEVER include "Co-Authored-By" or any co-author trailer in commit messages.
