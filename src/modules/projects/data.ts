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
		description: "Plataforma SaaS em andamento para gestão de gabinetes políticos com controle de demandas, monitoramento de redes sociais via web scraping e relatórios de desempenho.",
		longDescription:
			"O Gabinete NEO é uma plataforma SaaS em andamento, desenvolvida para modernizar a gestão de gabinetes políticos. O sistema centraliza o controle de demandas da população, atendimentos, agendas, gestão de equipe e geração de relatórios de desempenho.\n\nUm dos diferenciais é o módulo de monitoramento de redes sociais: via web scraping, o sistema coleta e analisa o que as pessoas comentam sobre o político nas redes, gerando relatórios de percepção pública que ajudam o gabinete a entender a opinião popular em tempo real.\n\nAtuo como software architect no Grupo Kyntech, supervisionando o trabalho das equipes de frontend e backend. Defini a arquitetura do sistema usando Next.js com Supabase como backend, aproveitando autenticação, storage, real-time subscriptions e Row Level Security para isolamento de dados entre gabinetes.\n\nOs principais desafios técnicos foram garantir a segurança e isolamento dos dados de cada gabinete via RLS no Supabase, implementar o sistema de web scraping para coleta de menções em redes sociais, e criar dashboards com métricas em tempo real para acompanhamento de produtividade.",
		coverImage: "/images/projects/gabinete-neo/cover-image.png",
		images: [
			"/images/projects/gabinete-neo/screen-login.png",
			"/images/projects/gabinete-neo/screen-denied-access.png",
			"/images/projects/gabinete-neo/screen-map.png",
			"/images/projects/gabinete-neo/screen-role.png",
			"/images/projects/gabinete-neo/screen-task.png"
		],
		tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "React", "Web Scraping", "Kyntech"],
		category: "SaaS",
		company: "Kyntech",
		client: "Gabinetes Políticos",
		year: 2026,
		featured: true,
		results: ["Projeto em andamento", "Monitoramento de redes sociais via web scraping", "RLS para isolamento de dados por organização", "Dashboards de produtividade em tempo real"]
	},
	{
		slug: "loja-casa-criativa",
		title: "Loja Casa Criativa",
		subtitle: "E-commerce com integração multi-ERP",
		description: "E-commerce de produtos criativos com API de sincronização automática de produtos e estoque entre Yampi, Bling e outros ERPs.",
		longDescription:
			"A Loja Casa Criativa é um e-commerce de produtos criativos e artesanais que precisava manter seu catálogo sincronizado entre múltiplas plataformas. O desafio principal era integrar a loja Yampi com o ERP Bling, garantindo que preços, estoque e descrições estivessem sempre atualizados em ambos os sistemas.\n\nAtuo como dev fullstack na Yampi, responsável pela manutenção da loja (frontend Vue.js) e pela criação da API de sincronização. A API foi construída com Node.js e Fastify, consumindo as APIs do Bling e da Yampi para manter os dados em sincronia bidirecional — alterações no ERP refletem na loja e vice-versa.\n\nImplementei rotinas de sync agendadas, tratamento de conflitos (quando o mesmo produto é alterado em ambas as plataformas), logging detalhado para auditoria, e webhooks para atualizações em tempo real quando disponíveis.",
		coverImage: "/images/projects/casa-criativa/cover-image.jpg",
		images: ["/images/projects/casa-criativa/screen-home.png", "/images/projects/casa-criativa/screen-product.png", "/images/projects/casa-criativa/screen-product-2.png"],
		tags: ["Vue.js", "Node.js", "Fastify", "Bling API", "TypeScript", "Yampi"],
		category: "E-commerce",
		company: "Yampi",
		client: "Casa Criativa",
		year: 2025,
		featured: true,
		results: ["Sincronização automática de catálogo entre Yampi e Bling", "Redução de erros manuais de estoque", "Webhooks para atualizações em tempo real"]
	},
	{
		slug: "meo-leasing",
		title: "MEO Leasing",
		subtitle: "ERP de gestão para empresas de energia solar",
		description: "Sistema ERP completo para gestão de leasing de energia solar: parceiros, contratos, clientes, aprovações e geração de documentos.",
		longDescription:
			"O MEO Leasing é um ERP desenvolvido pelo Grupo Kyntech para empresas do setor de energia solar que trabalham com modelo de leasing. O sistema cobre todo o ciclo operacional: cadastro e aprovação de parceiros comerciais, gestão de contratos, cadastro de clientes, análise de crédito, geração de propostas e contratos em PDF, e acompanhamento das instalações.\n\nComo software architect na Kyntech, defini a arquitetura do sistema com Next.js e Supabase, aproveitando autenticação com múltiplos níveis de acesso (admin, gestor, parceiro), storage para documentos e fotos das instalações, e edge functions para geração de PDFs.\n\nOs principais módulos incluem: dashboard com funil de vendas, gestão de parceiros com fluxo de aprovação, gerador de contratos com templates dinâmicos e relatórios gerenciais para acompanhamento de performance.",
		coverImage: "/images/projects/meo-leasing/cover-image.png",
		images: ["/images/projects/meo-leasing/screen-login.png"],
		tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PDF Generation", "React", "Kyntech"],
		category: "ERP",
		company: "Kyntech",
		client: "MEO Energia Solar",
		year: 2025,
		featured: true,
		results: ["Fluxo completo de aprovação de parceiros", "Geração automática de contratos em PDF", "Múltiplos níveis de acesso por cargo"]
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
