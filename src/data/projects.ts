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
	client: string
	year: number
	liveUrl?: string
	githubUrl?: string
	featured: boolean
	results: string[]
}

export const projects: Project[] = [
	{
		slug: "nexus-analytics",
		title: "Nexus Analytics",
		subtitle: "Real-time business intelligence platform",
		description: "A comprehensive analytics dashboard built for enterprise teams to monitor KPIs, visualize trends, and generate automated reports in real time.",
		longDescription:
			"Nexus Analytics was born from the need to unify fragmented data sources into a single, intuitive dashboard. The platform ingests data from multiple APIs — CRM, payment gateways, marketing tools — and presents actionable insights through interactive charts and automated alerts.\n\nThe frontend was built with Next.js and React for server-side rendering and optimal performance. Complex data visualizations were implemented using D3.js with custom animations. The real-time layer uses WebSockets for live metric updates without page refreshes.\n\nKey technical challenges included handling large datasets without UI lag (solved with virtual scrolling and Web Workers), implementing a flexible filter system that persists across sessions, and building a custom chart library that supports both light and dark themes seamlessly.",
		coverImage: "/images/projects/placeholder.svg",
		images: ["/images/projects/placeholder.svg", "/images/projects/placeholder.svg", "/images/projects/placeholder.svg"],
		tags: ["Next.js", "React", "TypeScript", "D3.js", "WebSockets", "PostgreSQL"],
		category: "SaaS",
		client: "Nexus Corp",
		year: 2025,
		liveUrl: "https://nexus-analytics.example.com",
		githubUrl: "https://github.com/example/nexus-analytics",
		featured: true,
		results: ["40% reduction in report generation time", "12k+ daily active users", "99.9% uptime over 12 months", "3x faster data processing pipeline"]
	},
	{
		slug: "verde-marketplace",
		title: "Verde Marketplace",
		subtitle: "Sustainable products e-commerce platform",
		description: "A modern e-commerce platform connecting eco-conscious consumers with verified sustainable brands, featuring AI-powered product recommendations.",
		longDescription:
			"Verde Marketplace was designed to make sustainable shopping accessible and enjoyable. The platform connects over 200 verified eco-friendly brands with consumers who care about their environmental impact.\n\nBuilt on Next.js with a headless CMS architecture, the storefront delivers sub-second page loads through ISR (Incremental Static Regeneration). The recommendation engine uses collaborative filtering to surface relevant products based on browsing patterns and purchase history.\n\nThe checkout flow was optimized through extensive A/B testing, reducing cart abandonment by 28%. Integration with multiple payment providers (Stripe, PIX, boleto) ensures broad accessibility for the Brazilian market. The admin panel gives vendors real-time visibility into sales, inventory, and customer feedback.",
		coverImage: "/images/projects/placeholder.svg",
		images: ["/images/projects/placeholder.svg", "/images/projects/placeholder.svg", "/images/projects/placeholder.svg"],
		tags: ["Next.js", "React", "Stripe", "Tailwind CSS", "Prisma", "Redis"],
		category: "E-commerce",
		client: "Verde Co.",
		year: 2025,
		featured: true,
		results: ["200+ partner brands onboarded", "28% reduction in cart abandonment", "$2M+ GMV in first quarter", "4.8/5 average user rating"]
	},
	{
		slug: "pulse-fitness",
		title: "Pulse Fitness",
		subtitle: "AI-powered workout tracking app",
		description: "A cross-platform fitness application with AI-driven workout plans, real-time form analysis, and social challenges to keep users motivated.",
		longDescription:
			"Pulse Fitness reimagines personal training by combining AI workout generation with community-driven motivation. Users receive personalized training plans that adapt based on progress, recovery data, and stated goals.\n\nThe mobile app was built with React Native for cross-platform deployment, sharing 85% of code between iOS and Android. The backend runs on Node.js with a GraphQL API, enabling efficient data fetching for complex workout and social feed queries.\n\nThe AI workout engine uses a fine-tuned model that considers exercise history, muscle group recovery windows, and progressive overload principles. Real-time form analysis leverages the device camera with TensorFlow Lite for on-device inference, providing instant feedback without sending video to servers.",
		coverImage: "/images/projects/placeholder.svg",
		images: ["/images/projects/placeholder.svg", "/images/projects/placeholder.svg", "/images/projects/placeholder.svg"],
		tags: ["React Native", "TypeScript", "GraphQL", "Node.js", "TensorFlow", "MongoDB"],
		category: "Mobile",
		client: "Pulse Health Inc.",
		year: 2024,
		liveUrl: "https://pulse-fitness.example.com",
		featured: true,
		results: ["50k+ downloads in first month", "85% code sharing between platforms", "4.7 App Store rating", "32% user retention improvement"]
	},
	{
		slug: "atlas-crm",
		title: "Atlas CRM",
		subtitle: "Customer relationship management for agencies",
		description: "A streamlined CRM designed specifically for creative agencies, featuring project pipelines, time tracking, and automated client communication.",
		longDescription:
			"Atlas CRM was built to solve the unique workflow challenges that creative agencies face. Unlike generic CRMs, Atlas understands the agency model — from initial pitch to final delivery, with built-in support for creative briefs, revision tracking, and team collaboration.\n\nThe application is a full-stack Next.js project with server actions for form handling and real-time updates via Server-Sent Events. The UI was designed with a focus on information density without visual clutter, using a card-based layout with contextual actions.\n\nKey features include a visual pipeline builder (drag-and-drop with react-dnd), automated email sequences triggered by pipeline stage changes, time tracking with Toggl integration, and a client portal where clients can review deliverables and leave feedback directly.",
		coverImage: "/images/projects/placeholder.svg",
		images: ["/images/projects/placeholder.svg", "/images/projects/placeholder.svg", "/images/projects/placeholder.svg"],
		tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Server Actions"],
		category: "SaaS",
		client: "Atlas Digital Agency",
		year: 2024,
		githubUrl: "https://github.com/example/atlas-crm",
		featured: false,
		results: ["60% faster client onboarding", "15 agencies using in production", "8h/week saved on admin tasks per team", "95% client satisfaction score"]
	},
	{
		slug: "lumina-landing",
		title: "Lumina Studio",
		subtitle: "Portfolio and booking platform for photographers",
		description: "A visually stunning portfolio website with integrated booking system, gallery management, and client proofing for professional photographers.",
		longDescription:
			"Lumina Studio was created for a boutique photography studio that needed their website to be as visually compelling as their work. The site serves as both a portfolio showcase and a business tool, handling everything from initial inquiry to final delivery.\n\nThe frontend emphasizes visual storytelling with full-bleed imagery, smooth scroll-driven animations, and a masonry gallery layout that adapts to any screen size. Performance was paramount — images are served through a custom optimization pipeline using sharp and next/image with AVIF/WebP support.\n\nThe booking system integrates with Google Calendar for availability checks and sends automated confirmation emails. The client proofing area allows clients to browse their session photos, mark favorites, and leave comments — all behind a secure, token-based access system.",
		coverImage: "/images/projects/placeholder.svg",
		images: ["/images/projects/placeholder.svg", "/images/projects/placeholder.svg", "/images/projects/placeholder.svg"],
		tags: ["Next.js", "React", "Motion", "Tailwind CSS", "Resend", "Cloudinary"],
		category: "Web",
		client: "Lumina Photography",
		year: 2025,
		liveUrl: "https://lumina-studio.example.com",
		featured: false,
		results: ["3s average page load with 50+ images", "40% increase in booking conversions", "200+ client galleries managed", "Core Web Vitals all green"]
	},
	{
		slug: "orbital-docs",
		title: "Orbital Docs",
		subtitle: "Developer documentation platform",
		description: "A modern documentation platform with MDX support, interactive code examples, versioning, and full-text search for developer tools.",
		longDescription:
			"Orbital Docs was built for a growing developer tools company that outgrew their existing documentation solution. The platform supports MDX for rich, interactive documentation pages with live code examples that readers can edit and run in the browser.\n\nThe architecture uses Next.js with static generation for documentation pages and ISR for blog posts and changelogs. Full-text search is powered by a pre-built index generated at build time, providing instant results without a backend search service.\n\nVersion management allows maintaining documentation for multiple product versions simultaneously, with an intuitive version switcher. The feedback system collects per-page ratings and comments, feeding into a dashboard that helps the docs team prioritize improvements. API reference docs are auto-generated from OpenAPI specs using a custom transformer.",
		coverImage: "/images/projects/placeholder.svg",
		images: ["/images/projects/placeholder.svg", "/images/projects/placeholder.svg", "/images/projects/placeholder.svg"],
		tags: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "Algolia", "Vercel"],
		category: "Web",
		client: "Orbital Systems",
		year: 2024,
		liveUrl: "https://docs.orbital.example.com",
		githubUrl: "https://github.com/example/orbital-docs",
		featured: false,
		results: ["50ms average search response", "300+ documentation pages", "45% reduction in support tickets", "98% positive page ratings"]
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
