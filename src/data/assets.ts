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
		slug: "ralph-loop-script",
		title: "Ralph Loop — Script de agente autônomo",
		description: "Script bash que executa um agente de IA (Claude Code ou Amp) em loop, implementando user stories de um PRD automaticamente.",
		locale: "pt",
		language: "bash",
		code: `#!/bin/bash
# Ralph Wiggum - Long-running AI agent loop
# Usage: ./ralph.sh [--tool amp|claude] [max_iterations]

set -e

# Ensure npm global binaries are in PATH (needed in devcontainers)
export PATH="\${PATH}:/usr/local/share/npm-global/bin"

TOOL="amp"
MAX_ITERATIONS=10

while [[ $# -gt 0 ]]; do
  case $1 in
    --tool) TOOL="$2"; shift 2 ;;
    --tool=*) TOOL="\${1#*=}"; shift ;;
    *) [[ "$1" =~ ^[0-9]+$ ]] && MAX_ITERATIONS="$1"; shift ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Ralph - Tool: $TOOL - Max iterations: $MAX_ITERATIONS"

for i in $(seq 1 $MAX_ITERATIONS); do
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS ($TOOL)"
  echo "==============================================================="

  if [[ "$TOOL" == "claude" ]]; then
    OUTPUT=$(claude --dangerously-skip-permissions --print < "$SCRIPT_DIR/CLAUDE.md" 2>&1 | tee /dev/stderr) || true
  fi

  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo "Ralph completed all tasks at iteration $i!"
    exit 0
  fi

  sleep 2
done

echo "Reached max iterations ($MAX_ITERATIONS) without completing."
exit 1`,
		explanation: `## O que é o Ralph?

[Ralph](https://github.com/snarktank/ralph) é um sistema de loops autônomos para agentes de IA. A ideia é simples: você define um PRD com user stories no formato JSON, e o Ralph executa um agente (Claude Code, Amp, etc.) em loop até completar todas as stories.

## Como funciona

1. O script lê um \`prd.json\` com user stories ordenadas por prioridade
2. Em cada iteração, o agente recebe instruções via \`CLAUDE.md\` (ou \`prompt.md\` para Amp)
3. O agente implementa UMA story por iteração, commita, e atualiza o PRD
4. Quando todas as stories passam, o agente responde com \`<promise>COMPLETE</promise>\`
5. O script detecta o sinal e para o loop

## Por que guardo isso

Usei esse script para construir este portfólio inteiro — 29 user stories implementadas automaticamente. O segredo é:

- **Stories pequenas:** cada uma deve caber em uma janela de contexto
- **Ordem de dependência:** schema antes de UI, setup antes de features
- **Acceptance criteria verificáveis:** nada vago, tudo que o agente pode checar

## Dica importante

O \`--dangerously-skip-permissions\` é necessário para execução autônoma, mas só use em ambientes controlados (devcontainers com firewall).`,
		tags: ["bash", "automation", "ai-agents", "claude-code", "devops"],
		category: "devops",
		createdAt: "2026-03-25"
	},
	{
		slug: "ralph-agent-instructions",
		title: "Instruções do agente Ralph (CLAUDE.md)",
		description: "Template de instruções que o Claude Code recebe em cada iteração do Ralph loop para implementar user stories autonomamente.",
		locale: "pt",
		language: "markdown",
		code: `# Ralph Agent Instructions

You are an autonomous coding agent working on a software project.

## Your Task

1. Read the PRD at \`prd.json\`
2. Read the progress log at \`progress.txt\` (check Codebase Patterns first)
3. Check you're on the correct branch from PRD \`branchName\`
4. Pick the **highest priority** user story where \`passes: false\`
5. Implement that single user story
6. Run quality checks (typecheck, lint, test)
7. If checks pass, commit ALL changes
8. Update the PRD to set \`passes: true\`
9. Append your progress to \`progress.txt\`

## Progress Report Format

APPEND to progress.txt:
\\\`\\\`\\\`
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered
  - Gotchas encountered
\\\`\\\`\\\`

## Stop Condition

If ALL stories have \`passes: true\`, reply with:
<promise>COMPLETE</promise>`,
		explanation: `## O que é isso

Este é o "cérebro" do Ralph — as instruções que o agente recebe em cada iteração. O arquivo \`CLAUDE.md\` é injetado como prompt quando o Claude Code é executado com \`--print\`.

## Conceitos chave

### Progress como memória

O agente não tem memória entre iterações. O \`progress.txt\` funciona como memória persistente:

- **Codebase Patterns**: padrões gerais que todas as iterações devem seguir
- **Logs por story**: o que foi feito, arquivos mudados, e lições aprendidas

### Uma story por iteração

Isso é crucial. Se o agente tentar fazer mais de uma story, o contexto estoura e ele produz código quebrado.

### Stop condition

O \`<promise>COMPLETE</promise>\` é o sinal que o script bash procura para parar o loop. Sem ele, o loop continua até o máximo de iterações.

## Por que guardo isso

Este template é a diferença entre um agente que produz lixo e um que entrega código funcional. Os detalhes importam: formato do progress, consolidação de patterns, critérios de qualidade.`,
		tags: ["ai-agents", "claude-code", "prompt-engineering", "automation"],
		category: "patterns",
		createdAt: "2026-03-25"
	},
	{
		slug: "devcontainer-dockerfile",
		title: "Dockerfile para devcontainer com Claude Code",
		description: "Dockerfile que cria um ambiente isolado com Claude Code, zsh, git-delta e firewall via iptables. Vai em .devcontainer/Dockerfile.",
		locale: "pt",
		language: "dockerfile",
		code: `FROM node:20

ARG TZ
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=latest

# Install basic development tools and iptables/ipset
RUN apt-get update && apt-get install -y --no-install-recommends \\
  less git procps sudo fzf zsh man-db unzip gnupg2 gh \\
  iptables ipset iproute2 dnsutils aggregate jq nano vim \\
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Ensure default node user has access to /usr/local/share
RUN mkdir -p /usr/local/share/npm-global && \\
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \\
  && mkdir /commandhistory \\
  && touch /commandhistory/.bash_history \\
  && chown -R $USERNAME /commandhistory

ENV DEVCONTAINER=true

# Create workspace and config directories
RUN mkdir -p /workspace /home/node/.claude && \\
  chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

# Install git-delta for better diffs
ARG GIT_DELTA_VERSION=0.18.2
RUN ARCH=$(dpkg --print-architecture) && \\
  wget "https://github.com/dandavison/delta/releases/download/\${GIT_DELTA_VERSION}/git-delta_\${GIT_DELTA_VERSION}_\${ARCH}.deb" && \\
  sudo dpkg -i "git-delta_\${GIT_DELTA_VERSION}_\${ARCH}.deb" && \\
  rm "git-delta_\${GIT_DELTA_VERSION}_\${ARCH}.deb"

USER node

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin
ENV SHELL=/bin/zsh
ENV EDITOR=nano
ENV VISUAL=nano

# Install zsh with powerlevel10k
ARG ZSH_IN_DOCKER_VERSION=1.2.0
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v\${ZSH_IN_DOCKER_VERSION}/zsh-in-docker.sh)" -- \\
  -p git -p fzf \\
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \\
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \\
  -x

# Install Claude Code
RUN npm install -g @anthropic-ai/claude-code@\${CLAUDE_CODE_VERSION}

# Copy and set up firewall script
COPY init-firewall.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/init-firewall.sh && \\
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall && \\
  chmod 0440 /etc/sudoers.d/node-firewall
USER node`,
		explanation: `## Arquivo: \`.devcontainer/Dockerfile\`

Este Dockerfile cria um ambiente completo para rodar Claude Code de forma isolada e segura.

**Fonte:** [Documentação oficial do Claude Code — Devcontainer](https://code.claude.com/docs/pt/devcontainer)

## O que instala

- **Node.js 20** como base
- **Claude Code** via npm global
- **zsh + Powerlevel10k** como shell padrão
- **git-delta** para diffs bonitos no terminal
- **iptables + ipset** para o firewall de rede
- **gh (GitHub CLI)** para operações Git

## Por que usar devcontainer?

Quando você roda agentes autônomos com \`--dangerously-skip-permissions\`, o agente tem acesso total ao terminal. O devcontainer resolve dois problemas:

1. **Isolamento**: o agente roda dentro de um container, não na sua máquina
2. **Firewall**: o \`init-firewall.sh\` restringe acesso de rede — só GitHub, npm, e Anthropic API

## Detalhes importantes

- O firewall é configurado pelo \`init-firewall.sh\` (veja o asset separado)
- A configuração do container é definida no \`devcontainer.json\` (veja o asset separado)
- O Claude Code é instalado globalmente em \`/usr/local/share/npm-global/bin\`
- O usuário \`node\` tem permissão de sudo apenas para o script de firewall`,
		tags: ["docker", "devcontainer", "claude-code", "security", "devops"],
		category: "devops",
		createdAt: "2026-03-25"
	},
	{
		slug: "devcontainer-json",
		title: "devcontainer.json para Claude Code",
		description: "Configuração do VS Code devcontainer com volumes persistentes, firewall de rede e extensões. Vai em .devcontainer/devcontainer.json.",
		locale: "pt",
		language: "json",
		code: `{
  "name": "Claude Code Sandbox",
  "build": {
    "dockerfile": "Dockerfile",
    "args": {
      "TZ": "\${localEnv:TZ:America/Los_Angeles}",
      "CLAUDE_CODE_VERSION": "latest",
      "GIT_DELTA_VERSION": "0.18.2",
      "ZSH_IN_DOCKER_VERSION": "1.2.0"
    }
  },
  "runArgs": [
    "--cap-add=NET_ADMIN",
    "--cap-add=NET_RAW"
  ],
  "customizations": {
    "vscode": {
      "extensions": [
        "anthropic.claude-code",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "eamodio.gitlens"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "terminal.integrated.defaultProfile.linux": "zsh"
      }
    }
  },
  "remoteUser": "node",
  "mounts": [
    "source=claude-code-bashhistory-\${devcontainerId},target=/commandhistory,type=volume",
    "source=claude-code-config-\${devcontainerId},target=/home/node/.claude,type=volume"
  ],
  "containerEnv": {
    "NODE_OPTIONS": "--max-old-space-size=4096",
    "CLAUDE_CONFIG_DIR": "/home/node/.claude"
  },
  "workspaceMount": "source=\${localWorkspaceFolder},target=/workspace,type=bind,consistency=delegated",
  "workspaceFolder": "/workspace",
  "postStartCommand": "sudo /usr/local/bin/init-firewall.sh || true",
  "waitFor": "postStartCommand"
}`,
		explanation: `## Arquivo: \`.devcontainer/devcontainer.json\`

Este arquivo configura o VS Code para abrir o projeto dentro de um container Docker com Claude Code pré-instalado.

**Fonte:** [Documentação oficial do Claude Code — Devcontainer](https://code.claude.com/docs/pt/devcontainer)

## Configurações chave

### Capabilities de rede

\`"runArgs": ["--cap-add=NET_ADMIN", "--cap-add=NET_RAW"]\` — necessário para o \`init-firewall.sh\` configurar iptables dentro do container.

### Volumes persistentes

- **bash history**: histórico de comandos persiste entre rebuilds
- **claude config**: a configuração do Claude Code (\`~/.claude\`) persiste entre rebuilds, evitando re-autenticação

### Firewall automático

\`"postStartCommand": "sudo /usr/local/bin/init-firewall.sh || true"\` — o firewall é configurado automaticamente toda vez que o container inicia.

### Extensões

Instala automaticamente Claude Code, ESLint, Prettier e GitLens no VS Code dentro do container.

## Como usar

1. Coloque os 3 arquivos na pasta \`.devcontainer/\` na raiz do projeto:
   - \`devcontainer.json\` (este arquivo)
   - \`Dockerfile\` (veja asset separado)
   - \`init-firewall.sh\` (veja asset separado)
2. Abra o projeto no VS Code
3. Ctrl+Shift+P → "Dev Containers: Reopen in Container"
4. O container é construído com Claude Code + firewall automaticamente`,
		tags: ["devcontainer", "vscode", "claude-code", "docker", "devops"],
		category: "devops",
		createdAt: "2026-03-25"
	},
	{
		slug: "prd-skill-claude-code",
		title: "Skill de PRD para Claude Code",
		description: "Template de skill que ensina o Claude Code a gerar PRDs estruturados com user stories, acceptance criteria e perguntas clarificadoras. Vai em .claude/skills/prd/SKILL.md.",
		locale: "pt",
		language: "markdown",
		code: `---
name: prd
description: "Generate a PRD for a new feature."
user-invocable: true
---

# PRD Generator

## The Job

1. Receive a feature description from the user
2. Ask 3-5 clarifying questions (with lettered options)
3. Generate a structured PRD
4. Save to \\\`tasks/prd-[feature-name].md\\\`

## PRD Structure

1. Introduction/Overview
2. Goals (bullet list)
3. User Stories (US-001 format with acceptance criteria)
4. Functional Requirements (FR-1 format)
5. Non-Goals (out of scope)
6. Technical Considerations
7. Success Metrics
8. Open Questions

## User Story Format

### US-001: [Title]
**Description:** As a [user], I want [feature] so that [benefit].
**Acceptance Criteria:**
- [ ] Specific verifiable criterion
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill`,
		explanation: `## O que são Skills no Claude Code?

Skills são arquivos \`.md\` em \`.claude/skills/\` que ensinam o Claude Code a executar tarefas especializadas. Quando o usuário digita \`/prd\`, o Claude carrega esse arquivo como contexto adicional.

## Por que essa skill é útil

Escrever PRDs é repetitivo. Essa skill garante que todo PRD siga o mesmo formato:

- Perguntas com opções letradas (usuário responde "1A, 2C, 3B")
- User stories pequenas o suficiente para uma iteração do Ralph
- Acceptance criteria verificáveis (não vagos)

## Como usar

1. Coloque o arquivo em \`.claude/skills/prd/SKILL.md\`
2. No Claude Code, digite \`/prd\` seguido da descrição da feature
3. O Claude faz perguntas, você responde, e ele gera o PRD

## Composição com Ralph

O fluxo completo é: \`/prd\` gera o markdown → \`/ralph\` converte para JSON → \`ralph.sh\` executa o loop. Três skills que se encadeiam.`,
		tags: ["claude-code", "skills", "prd", "project-management"],
		category: "patterns",
		createdAt: "2026-03-25"
	},
	{
		slug: "ralph-converter-skill",
		title: "Skill de conversão PRD para Ralph JSON",
		description: "Skill que converte PRDs em markdown para o formato prd.json usado pelo Ralph, com regras de sizing e ordenação de dependências.",
		locale: "pt",
		language: "markdown",
		code: `---
name: ralph
description: "Convert PRDs to prd.json format for Ralph."
user-invocable: true
---

# Ralph PRD Converter

## Output Format

\\\`\\\`\\\`json
{
  "project": "[Name]",
  "branchName": "ralph/[feature-kebab]",
  "prdSource": "tasks/prd-[name].md",
  "userStories": [{
    "id": "US-001",
    "title": "[Title]",
    "description": "As a [user], I want...",
    "acceptanceCriteria": ["...", "Typecheck passes"],
    "priority": 1,
    "passes": false,
    "notes": ""
  }]
}
\\\`\\\`\\\`

## The Number One Rule

Each story must be completable in ONE iteration.

## Story Ordering: Dependencies First

1. Schema/database changes
2. Server actions / backend
3. UI components
4. Dashboard/summary views`,
		explanation: `## O que faz

Essa skill ensina o Claude Code a converter um PRD em markdown (\`tasks/prd-*.md\`) para o formato JSON que o Ralph consome (\`scripts/ralph/prd.json\`).

## Regras críticas

### Tamanho da story

Se você não consegue descrever a mudança em 2-3 frases, é grande demais. Divida.

### Ordem de dependência

Stories executam em ordem de prioridade. Se US-003 depende de US-001, US-001 deve ter prioridade menor (executar primeiro).

### prdSource

O campo \`prdSource\` permite que o Ralph saiba de onde veio o PRD, para arquivar corretamente quando terminar.

## Fluxo completo

1. \`/prd\` — gera \`tasks/prd-feature.md\`
2. \`/ralph\` — converte para \`scripts/ralph/prd.json\`
3. \`./scripts/ralph/ralph.sh --tool claude 20\` — executa

## Por que guardo isso

É a segunda metade do pipeline. Sem regras claras de sizing e ordenação, o Ralph falha — stories grandes demais estouram o contexto, e dependências fora de ordem causam erros de compilação.`,
		tags: ["claude-code", "skills", "ralph", "automation"],
		category: "patterns",
		createdAt: "2026-03-25"
	},
	{
		slug: "devcontainer-firewall",
		title: "Firewall para devcontainer com iptables",
		description: "Script que restringe acesso de rede em devcontainers, permitindo apenas GitHub, npm, e APIs essenciais. Vai em .devcontainer/init-firewall.sh.",
		locale: "pt",
		language: "bash",
		code: `#!/bin/bash
set -euo pipefail

# Extract Docker DNS rules BEFORE flushing
DOCKER_DNS_RULES=$(iptables-save -t nat | grep "127\\.0\\.0\\.11" || true)

# Flush all rules
iptables -F && iptables -X
iptables -t nat -F && iptables -t nat -X
ipset destroy allowed-domains 2>/dev/null || true

# Restore Docker DNS
if [ -n "$DOCKER_DNS_RULES" ]; then
    iptables -t nat -N DOCKER_OUTPUT 2>/dev/null || true
    echo "$DOCKER_DNS_RULES" | xargs -L 1 iptables -t nat
fi

# Allow DNS, SSH, localhost
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Create whitelist
ipset create allowed-domains hash:net

# Add GitHub IPs
gh_ranges=$(curl -s https://api.github.com/meta)
echo "$gh_ranges" | jq -r '(.web + .api + .git)[]' | \\
  aggregate -q | while read -r cidr; do
    ipset add allowed-domains "$cidr" -exist
done

# Add essential domains
for domain in "registry.npmjs.org" "api.anthropic.com" \\
  "sentry.io" "statsig.anthropic.com"; do
    dig +noall +answer A "$domain" | awk '$4 == "A" {print $5}' | \\
      while read -r ip; do ipset add allowed-domains "$ip" -exist; done
done

# Allow host network
HOST_IP=$(ip route | grep default | cut -d" " -f3)
HOST_NET=$(echo "$HOST_IP" | sed "s/\\.[0-9]*$/.0\\/24/")
iptables -A OUTPUT -d "$HOST_NET" -j ACCEPT

# Set default DROP policy
iptables -P OUTPUT DROP
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m set --match-set allowed-domains dst -j ACCEPT
iptables -A OUTPUT -j REJECT --reject-with icmp-admin-prohibited`,
		explanation: `## Arquivo: \`.devcontainer/init-firewall.sh\`

**Fonte:** [Documentação oficial do Claude Code — Devcontainer](https://code.claude.com/docs/pt/devcontainer)

## O que faz

Restringe todo o tráfego de saída do container, permitindo APENAS:

- **DNS** (porta 53) — para resolver domínios
- **Localhost** — comunicação interna
- **Rede do host** — para o VS Code se comunicar com o container
- **GitHub** (web, api, git) — para push/pull
- **npm registry** — para instalar pacotes
- **Anthropic API** — para o Claude Code funcionar

Todo o resto é **bloqueado com REJECT**.

## Por que isso importa

Quando você roda \`claude --dangerously-skip-permissions\`, o agente pode executar qualquer comando. Sem firewall, ele poderia:

- Fazer requests para APIs externas
- Enviar dados para serviços não autorizados
- Baixar e executar scripts arbitrários

Com o firewall, mesmo que o agente tente, o tráfego é bloqueado.

## Verificação

O script inclui auto-teste:

- Tenta acessar \`example.com\` — deve falhar
- Tenta acessar \`api.github.com\` — deve funcionar

## Requisitos

- \`--cap-add=NET_ADMIN\` e \`--cap-add=NET_RAW\` no devcontainer
- Pacotes: \`iptables\`, \`ipset\`, \`iproute2\`, \`dnsutils\`, \`aggregate\`, \`jq\`, \`curl\``,
		tags: ["bash", "security", "docker", "devcontainer", "iptables"],
		category: "devops",
		createdAt: "2026-03-25"
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
