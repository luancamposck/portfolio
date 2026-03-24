export type AssetLocale = "pt" | "en" | "es"
export type AssetCategory = "utils" | "hooks" | "patterns" | "algorithms" | "devops"

export interface CodeAsset {
	slug: string
	title: string
	description: string
	locale: AssetLocale
	language: string
	code: string
	explanation: string
	tags: string[]
	category: AssetCategory
	createdAt: string
	updatedAt?: string
}

export const assets: CodeAsset[] = [
	{
		slug: "debounce",
		title: "Debounce Genérico com TypeScript",
		description: "Implementação type-safe de debounce que preserva os tipos dos argumentos da função original.",
		locale: "pt",
		language: "ts",
		code: `function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Uso:
const handleSearch = debounce((query: string) => {
  fetch(\`/api/search?q=\${query}\`)
}, 300)

handleSearch("react") // executa após 300ms sem chamadas`,
		explanation: `O **debounce** é uma das utilidades mais usadas em frontend. Ele atrasa a execução de uma função até que um período de inatividade passe — ideal para campos de busca, resize de janela ou scroll handlers.

Esta implementação usa generics do TypeScript (\`T extends (...args: unknown[]) => void\`) para **preservar os tipos dos argumentos**. Isso significa que o TypeScript vai saber que \`handleSearch\` aceita exatamente um \`string\`, não \`any\`.

**Como funciona:**
1. Cada chamada limpa o timeout anterior com \`clearTimeout\`
2. Um novo timeout é criado com o delay especificado
3. Só quando o delay passa sem novas chamadas, a função original é executada

**Quando usar:** inputs de busca, auto-save, handlers de scroll/resize.
**Quando NÃO usar:** eventos que precisam de resposta imediata (clicks de botão, submits de form).`,
		tags: ["typescript", "performance", "frontend"],
		category: "utils",
		createdAt: "2026-02-15"
	},
	{
		slug: "use-local-storage",
		title: "useLocalStorage Hook",
		description: "Hook React que sincroniza estado com localStorage, com suporte a SSR e serialização automática.",
		locale: "pt",
		language: "ts",
		code: `import { useState, useEffect, useCallback } from "react"

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) setStoredValue(JSON.parse(item))
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error)
    }
  }, [key])

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue =
          value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue))
        } catch (error) {
          console.warn(\`Error setting localStorage key "\${key}":\`, error)
        }
        return nextValue
      })
    },
    [key]
  )

  return [storedValue, setValue]
}

// Uso:
// const [theme, setTheme] = useLocalStorage("theme", "dark")`,
		explanation: `Hook que persiste estado no \`localStorage\` do navegador. Diferente de implementações ingênuas, este hook é **compatível com SSR** — usa \`useEffect\` para ler do localStorage apenas no cliente, evitando erros de hydration.

**Características:**
- **Serialização automática**: usa \`JSON.parse/stringify\`, suportando objetos, arrays, números, etc.
- **API funcional**: aceita updater function como \`useState\` (\`setValue(prev => !prev)\`)
- **Error handling**: falhas de localStorage (modo privado, quota excedida) não quebram a aplicação
- **SSR-safe**: inicializa com \`initialValue\` no servidor, sincroniza com localStorage no cliente

**Padrão:** inicializa com valor default → \`useEffect\` lê do storage no mount → \`setValue\` atualiza ambos estado e storage.`,
		tags: ["react", "hooks", "localStorage", "ssr"],
		category: "hooks",
		createdAt: "2026-02-20"
	},
	{
		slug: "retry-with-backoff",
		title: "Retry com Exponential Backoff",
		description: "Função async que retenta operações com backoff exponencial e jitter, ideal para chamadas de API instáveis.",
		locale: "pt",
		language: "ts",
		code: `async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    baseDelay?: number
    maxDelay?: number
  } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = options

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxRetries) throw error

      const exponentialDelay = baseDelay * 2 ** attempt
      const jitter = Math.random() * baseDelay
      const delay = Math.min(exponentialDelay + jitter, maxDelay)

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw new Error("Retry failed")
}

// Uso:
const data = await retry(
  () => fetch("/api/data").then((r) => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`)
    return r.json()
  }),
  { maxRetries: 3, baseDelay: 500 }
)`,
		explanation: `Padrão essencial para lidar com falhas transitórias em chamadas de rede. O **exponential backoff** aumenta o tempo entre tentativas exponencialmente (1s, 2s, 4s...), e o **jitter** adiciona variação aleatória para evitar que múltiplos clientes retentem ao mesmo tempo (thundering herd).

**Como funciona:**
1. Tenta executar \`fn()\`
2. Se falhar e ainda houver tentativas, calcula o delay: \`baseDelay * 2^attempt + jitter\`
3. Espera o delay e tenta novamente
4. Se todas as tentativas falharem, propaga o último erro

**\`maxDelay\`** impõe um teto — sem ele, o delay cresceria indefinidamente em cenários com muitas tentativas.

**Quando usar:** chamadas HTTP, conexões WebSocket, operações de banco de dados.`,
		tags: ["typescript", "async", "network", "resilience"],
		category: "patterns",
		createdAt: "2026-01-10",
		updatedAt: "2026-03-01"
	},
	{
		slug: "docker-compose-fullstack",
		title: "Docker Compose — App Full-Stack",
		description: "Template de docker-compose para app Node.js com PostgreSQL, Redis e Nginx como reverse proxy.",
		locale: "pt",
		language: "yaml",
		code: `services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/myapp
      REDIS_URL: redis://cache:6379
      NODE_ENV: production
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5

  cache:
    image: redis:7-alpine
    command: redis-server --maxmemory 128mb --maxmemory-policy allkeys-lru

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app

volumes:
  pgdata:`,
		explanation: `Template pronto para produção de uma stack Node.js completa. Pontos importantes:

**Healthcheck no PostgreSQL:** O \`depends_on\` com \`condition: service_healthy\` garante que o app só inicia quando o banco está realmente pronto para aceitar conexões — não apenas quando o container subiu.

**Redis com policy LRU:** O \`allkeys-lru\` faz o Redis evitar automaticamente as chaves menos usadas quando atingir o limite de memória. Ideal para cache.

**Volumes nomeados:** \`pgdata\` persiste os dados do PostgreSQL entre rebuilds do container.

**Nginx como reverse proxy:** Separar o proxy permite terminar SSL, servir arquivos estáticos, e adicionar rate limiting sem modificar o app.

**Dica:** Em produção, troque as credenciais hardcoded por \`secrets\` do Docker ou variáveis de ambiente externas.`,
		tags: ["docker", "devops", "postgres", "redis", "nginx"],
		category: "devops",
		createdAt: "2026-03-05"
	},
	{
		slug: "binary-search",
		title: "Binary Search Genérico",
		description: "Implementação genérica de busca binária com comparador customizável para arrays ordenados.",
		locale: "pt",
		language: "ts",
		code: `function binarySearch<T>(
  arr: T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): number {
  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2)
    const cmp = compare(arr[mid], target)

    if (cmp === 0) return mid
    if (cmp < 0) low = mid + 1
    else high = mid - 1
  }

  return -1
}

// Uso com números:
binarySearch([1, 3, 5, 7, 9], 5) // 2

// Uso com objetos:
const users = [
  { id: 1, name: "Ana" },
  { id: 5, name: "Bruno" },
  { id: 12, name: "Carlos" },
]
binarySearch(users, { id: 5 } as typeof users[0], (a, b) => a.id - b.id) // 1`,
		explanation: `Busca binária é O(log n) — para um array de 1 milhão de elementos, faz no máximo ~20 comparações vs 1 milhão na busca linear.

**Por que genérico?** O comparador customizável permite usar em qualquer tipo de dado: números, strings, objetos. O comparador padrão funciona para tipos primitivos.

**Detalhe importante:** \`mid = low + Math.floor((high - low) / 2)\` em vez de \`(low + high) / 2\` para evitar overflow de inteiros em linguagens com inteiros de tamanho fixo. Em JavaScript isso não é estritamente necessário, mas é uma boa prática portável.

**Retorna -1** se o elemento não for encontrado, seguindo a convenção de \`Array.prototype.indexOf\`.`,
		tags: ["typescript", "algorithms", "search"],
		category: "algorithms",
		createdAt: "2026-01-25"
	},
	{
		slug: "use-media-query",
		title: "useMediaQuery Hook",
		description: "Hook React para escutar media queries CSS com suporte a SSR e cleanup automático.",
		locale: "pt",
		language: "ts",
		code: `import { useState, useEffect } from "react"

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}

// Uso:
// const isMobile = useMediaQuery("(max-width: 768px)")
// const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
// const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")`,
		explanation: `Hook leve para reagir a mudanças de media queries no React. Usa a API nativa \`window.matchMedia\` que é mais performática que escutar \`resize\` events.

**SSR-safe:** Inicializa com \`false\` e sincroniza no \`useEffect\`, evitando erros de hydration em frameworks como Next.js.

**Cleanup automático:** O \`removeEventListener\` no return do \`useEffect\` garante que não há memory leaks quando o componente desmonta ou a query muda.

**Casos de uso comuns:**
- Renderização condicional por breakpoint (alternativa ao CSS quando o HTML difere)
- Detectar preferências do usuário (\`prefers-color-scheme\`, \`prefers-reduced-motion\`)
- Adaptar comportamento de componentes (ex: drawer vs dropdown em mobile)`,
		tags: ["react", "hooks", "responsive", "css"],
		category: "hooks",
		createdAt: "2026-02-28"
	},
	{
		slug: "fetch-wrapper",
		title: "Type-Safe Fetch Wrapper",
		description: "A minimal, type-safe wrapper around fetch with automatic JSON parsing, error handling, and timeout support.",
		locale: "en",
		language: "ts",
		code: `class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown
  ) {
    super(\`HTTP \${status}: \${statusText}\`)
    this.name = "HttpError"
  }
}

async function api<T>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })

    if (!response.ok) {
      const body = await response.text().catch(() => null)
      throw new HttpError(response.status, response.statusText, body)
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timeoutId)
  }
}

// Usage:
interface User { id: number; name: string }
const user = await api<User>("/api/users/1")
const users = await api<User[]>("/api/users", { timeout: 5000 })`,
		explanation: `A thin wrapper that adds three things the native \`fetch\` API lacks: **type safety**, **automatic error throwing**, and **timeouts**.

**Why throw on non-ok responses?** Native \`fetch\` only rejects on network errors — a 404 or 500 resolves successfully. This wrapper throws an \`HttpError\` with the status code, making error handling consistent.

**Timeout via AbortController:** The native \`fetch\` has no timeout option. This uses \`AbortController\` to abort the request after the specified duration (default 10s). The \`finally\` block ensures the timer is always cleaned up.

**Type parameter \`<T>\`:** The return type is whatever you specify — the caller is responsible for ensuring the API actually returns that shape. For runtime validation, pair with zod or valibot.

**What this does NOT do:** retries, caching, interceptors. Keep it minimal — compose with other utilities as needed.`,
		tags: ["typescript", "fetch", "api", "error-handling"],
		category: "utils",
		createdAt: "2026-03-10"
	},
	{
		slug: "github-actions-ci",
		title: "GitHub Actions — CI Pipeline",
		description: "Reusable CI workflow for Node.js projects with caching, type checking, linting, and testing in parallel.",
		locale: "en",
		language: "yaml",
		code: `name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        check: [typecheck, lint, test]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - name: Typecheck
        if: matrix.check == 'typecheck'
        run: npx tsc --noEmit

      - name: Lint
        if: matrix.check == 'lint'
        run: npx biome check src/

      - name: Test
        if: matrix.check == 'test'
        run: npm test -- --coverage`,
		explanation: `A production-ready CI pipeline that runs **typecheck, lint, and test in parallel** using a matrix strategy. This is faster than running them sequentially in a single job.

**Key decisions:**

- **\`fail-fast: false\`**: All three checks run to completion even if one fails. This way you see ALL issues at once, not just the first.

- **\`concurrency\` with \`cancel-in-progress\`**: If you push again while CI is running, the old run is cancelled. Saves runner minutes and avoids stale results.

- **\`npm ci\` over \`npm install\`**: Faster, deterministic installs from lockfile. Never use \`npm install\` in CI.

- **Node 22 + npm cache**: \`actions/setup-node\` caches the npm store automatically when you specify \`cache: npm\`.

**To extend:** Add a \`build\` job with \`needs: [quality]\` to run only after all checks pass. Add a \`deploy\` job with environment protection rules for production.`,
		tags: ["github-actions", "ci", "devops", "testing"],
		category: "devops",
		createdAt: "2026-03-12"
	},
	{
		slug: "pipe-function",
		title: "Pipe — Composição de Funções",
		description: "Função pipe type-safe para compor transformações de forma legível, da esquerda para a direita.",
		locale: "pt",
		language: "ts",
		code: `function pipe<A>(value: A): A
function pipe<A, B>(value: A, fn1: (a: A) => B): B
function pipe<A, B, C>(value: A, fn1: (a: A) => B, fn2: (b: B) => C): C
function pipe<A, B, C, D>(
  value: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D
): D
function pipe<A, B, C, D, E>(
  value: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E
): E
function pipe(value: unknown, ...fns: ((arg: unknown) => unknown)[]): unknown {
  return fns.reduce((acc, fn) => fn(acc), value)
}

// Uso:
const result = pipe(
  "  Hello, World!  ",
  (s) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/\\s+/g, "-")
)
// "hello,-world!"

const processUsers = (users: { name: string; age: number }[]) =>
  pipe(
    users,
    (u) => u.filter((x) => x.age >= 18),
    (u) => u.map((x) => x.name),
    (u) => u.sort()
  )`,
		explanation: `O padrão **pipe** permite compor transformações da esquerda para a direita, de forma mais legível que funções aninhadas: \`pipe(x, f, g, h)\` é mais claro que \`h(g(f(x)))\`.

**Type safety via overloads:** As múltiplas assinaturas de função garantem que o TypeScript rastreia o tipo em cada etapa da pipeline. Se \`fn1\` retorna \`string\`, \`fn2\` recebe \`string\`. Suporta até 4 funções com tipos completos.

**A implementação real** é simples: um \`reduce\` que passa o resultado de cada função para a próxima.

**Por que não usar \`Array.prototype\` encadeado?** Pipe funciona com qualquer transformação, não apenas arrays. Você pode alternar entre filtros, mapeamentos, formatações e operações de qualquer tipo.

**Padrão popular em:** fp-ts, Effect, Ramda, RxJS (operadores encadeados).`,
		tags: ["typescript", "functional", "composition"],
		category: "patterns",
		createdAt: "2026-02-05"
	},
	{
		slug: "useful-regex",
		title: "Regex Úteis para Validação",
		description: "Coleção de expressões regulares testadas para validação de email, URL, telefone BR, CPF e senha forte.",
		locale: "pt",
		language: "ts",
		code: `const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,

  url: /^https?:\\/\\/[\\w-]+(\\.[\\w-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?$/,

  brazilPhone: /^\\+?55\\s?\\(?\\d{2}\\)?\\s?9?\\d{4}[-\\s]?\\d{4}$/,

  cpf: /^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$/,

  strongPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$/,

  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  isoDate: /^\\d{4}-\\d{2}-\\d{2}(T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:?\\d{2})?)?$/,
} as const

function validate(pattern: RegExp, value: string): boolean {
  return pattern.test(value)
}

// Uso:
validate(patterns.email, "user@example.com")         // true
validate(patterns.brazilPhone, "+55 11 99999-1234")   // true
validate(patterns.cpf, "123.456.789-09")              // true
validate(patterns.slug, "meu-post-legal")             // true
validate(patterns.strongPassword, "Abc@1234")         // true`,
		explanation: `Coleção de regex prontas para uso que cobrem os casos mais comuns de validação em apps brasileiros.

**Observações importantes:**

- **Email:** Esta regex cobre 99% dos emails válidos. Para validação 100% conforme RFC 5322, use uma biblioteca — a regex completa tem centenas de caracteres.
- **Telefone BR:** Aceita formatos com/sem +55, com/sem parênteses no DDD, com/sem o 9° dígito.
- **CPF:** Valida apenas o formato (com/sem pontuação). Para validar o dígito verificador, você precisa do algoritmo de módulo 11 separadamente.
- **Senha forte:** Mínimo 8 caracteres, pelo menos: 1 minúscula, 1 maiúscula, 1 número, 1 caractere especial.

**Dica:** Em produção, combine regex com bibliotecas como \`zod\` para mensagens de erro tipadas e composição de validações.`,
		tags: ["regex", "validation", "typescript", "brazil"],
		category: "utils",
		createdAt: "2026-01-18",
		updatedAt: "2026-03-15"
	}
]

export function getAssetBySlug(slug: string): CodeAsset | undefined {
	return assets.find((a) => a.slug === slug)
}

export function getAssetsByCategory(category: AssetCategory): CodeAsset[] {
	return assets.filter((a) => a.category === category)
}

export function getAssetsByTag(tag: string): CodeAsset[] {
	return assets.filter((a) => a.tags.includes(tag))
}

export function getAllAssetCategories(): AssetCategory[] {
	return [...new Set(assets.map((a) => a.category))]
}

export function getAllAssetTags(): string[] {
	return [...new Set(assets.flatMap((a) => a.tags))].sort()
}

export function getAssetsByLocale(locale: AssetLocale): CodeAsset[] {
	return assets.filter((a) => a.locale === locale)
}
