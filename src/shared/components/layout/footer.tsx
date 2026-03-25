import { Github, Mail } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Separator } from "@/shared/components/ui/separator"

const socialLinks = [
	{ href: "https://github.com/luancamposck", label: "GitHub", icon: Github },
	{ href: "mailto:luancamposck@gmail.com", label: "Email", icon: Mail }
]

async function Footer() {
	const t = await getTranslations("footer")

	return (
		<footer className="mt-auto w-full">
			<Separator />
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
				<p className="text-sm text-muted-foreground">{t("copyright", { year: new Date().getFullYear() })}</p>
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
