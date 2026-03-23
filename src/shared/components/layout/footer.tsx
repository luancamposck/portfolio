import { Github, Linkedin, Mail } from "lucide-react"
import { Separator } from "@/shared/components/ui/separator"

const socialLinks = [
	{ href: "https://github.com/luancamposk", label: "GitHub", icon: Github },
	{ href: "https://linkedin.com/in/luancamposk", label: "LinkedIn", icon: Linkedin },
	{ href: "mailto:contato@luancamposk.dev", label: "Email", icon: Mail }
]

function Footer() {
	return (
		<footer className="mt-auto w-full">
			<Separator />
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
				<p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Luan Campos K. Todos os direitos reservados.</p>
				<nav className="flex items-center gap-4" aria-label="Social links">
					{socialLinks.map((link) => (
						<a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label={link.label}>
							<link.icon className="size-5" />
						</a>
					))}
				</nav>
			</div>
		</footer>
	)
}

export { Footer }
