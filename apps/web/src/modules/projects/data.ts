export interface Project {
	slug: string
	title: string
	subtitle: string
	description: string
	longDescription: string
	coverImage: string
	images: string[]
	tags: string[]
	category: string
	company: string
	client: string
	year: number
	liveUrl?: string
	githubUrl?: string
	featured: boolean
	results: string[]
}

export const projects: Project[] = [
	{
		slug: "gabinete-neo",
		title: "Gabinete NEO",
		subtitle: "Plataforma SaaS de gestão para gabinetes políticos",
		description: "Plataforma de gestão para campanhas e equipes, com tarefas, cadastros, automações e relacionamento com eleitores.",
		longDescription:
			"O Gabinete NEO é uma plataforma de gestão que reúne operações de campanha, equipe, conteúdo, tarefas, cadastros, automações e relacionamento com eleitores.\n\nAtuei como responsável técnico pelo projeto entre setembro de 2025 e março de 2026, da arquitetura e implementação ao alinhamento com o cliente e à evolução em produção.\n\nO trabalho incluiu modelagem de dados, autenticação, controle de acesso por papéis e RLS, além de dashboards, pagamentos e integrações com serviços externos.",
		coverImage: "/images/projects/gabinete-neo/cover-image.png",
		images: [
			"/images/projects/gabinete-neo/screen-login.png",
			"/images/projects/gabinete-neo/screen-denied-access.png",
			"/images/projects/gabinete-neo/screen-map.png",
			"/images/projects/gabinete-neo/screen-role.png",
			"/images/projects/gabinete-neo/screen-task.png"
		],
		tags: ["Next.js", "TypeScript", "React", "PostgreSQL", "Stripe", "Puppeteer"],
		category: "SaaS",
		company: "Gabinete NEO",
		client: "Gabinetes Políticos",
		year: 2025,
		featured: true,
		results: ["Gestão de campanhas, tarefas e cadastros", "Controle de acesso por papéis e RLS", "Dashboards, pagamentos e integrações"]
	},
	{
		slug: "meo-leasing",
		title: "MEO Leasing",
		subtitle: "ERP de gestão para empresas de energia solar",
		description: "Plataforma de simulações, orçamentos e financiamento para empresas de energia solar.",
		longDescription:
			"O MEO Leasing é uma plataforma de orçamentos e financiamento de energia solar que substituiu um processo manual baseado em planilhas.\n\nAtuei na arquitetura, implementação full stack e evolução do MVP entre maio e agosto de 2025. O trabalho incluiu levantamento de regras, validação de simulações existentes e desenvolvimento de fluxos de dados e documentos.\n\nA solução utiliza autenticação, papéis, permissões e RLS para separar dados, além de acompanhar simulações e pedidos e integrar notificações e anexos.",
		coverImage: "/images/projects/meo-leasing/cover-image.png",
		images: ["/images/projects/meo-leasing/screen-login.png"],
		tags: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
		category: "ERP",
		company: "MEO Leasing",
		client: "MEO Energia Solar",
		year: 2025,
		featured: true,
		results: ["Fluxos de simulação e acompanhamento de pedidos", "Geração de documentos e notificações", "Acesso separado por papéis e RLS"]
	}
]

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
	return projects.filter((p) => p.featured)
}

export function getProjectsByCategory(category: string): Project[] {
	if (category === "All") return projects
	return projects.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
	return ["All", ...new Set(projects.map((p) => p.category))]
}

export function getProjectsByCompany(company: string): Project[] {
	if (company === "All") return projects
	return projects.filter((p) => p.company === company)
}

export function getAllCompanies(): string[] {
	return ["All", ...new Set(projects.map((p) => p.company))]
}
