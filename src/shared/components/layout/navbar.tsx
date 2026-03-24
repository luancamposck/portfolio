"use client"

import { Menu, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { useIsMobile } from "@/shared/hooks/use-mobile"
import { cn } from "@/shared/lib/utils"

function Navbar() {
	const t = useTranslations("navbar")
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const isMobile = useIsMobile()
	const pathname = usePathname()
	const prefersReduced = useReducedMotion()

	const navLinks = [
		{ href: "/" as const, label: t("home") },
		{ href: "/projects" as const, label: t("projects") },
		{ href: "/about" as const, label: t("about") }
	]

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	// Close mobile menu on route change
	useEffect(() => {
		// Reference pathname so the effect re-runs on navigation
		void pathname
		setMobileOpen(false)
	}, [pathname])

	const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), [])

	return (
		<header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "h-14 bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "h-16 bg-transparent")}>
			<nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary">
					Luan Campos K.
				</Link>

				{/* Desktop links */}
				{!isMobile && (
					<div className="flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn("rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground", pathname === link.href ? "text-foreground" : "text-muted-foreground")}
							>
								{link.label}
							</Link>
						))}
					</div>
				)}

				{/* Right side: theme toggle + hamburger */}
				<div className="flex items-center gap-2">
					<ThemeToggle />
					{isMobile && (
						<button
							type="button"
							onClick={toggleMobile}
							className="inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
							aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
						>
							{mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
						</button>
					)}
				</div>
			</nav>

			{/* Mobile sheet overlay */}
			<AnimatePresence>
				{isMobile && mobileOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={prefersReduced ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={prefersReduced ? undefined : { opacity: 0 }}
							transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
							className="fixed inset-0 z-40 bg-black/50"
							onClick={() => setMobileOpen(false)}
							aria-hidden="true"
						/>
						{/* Side drawer */}
						<motion.div
							initial={prefersReduced ? false : { x: "100%" }}
							animate={{ x: 0 }}
							exit={prefersReduced ? undefined : { x: "100%" }}
							transition={prefersReduced ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
							className="fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-sm flex-col gap-6 border-l border-border bg-background p-6 shadow-lg"
						>
							<div className="flex items-center justify-between">
								<span className="text-lg font-semibold text-foreground">{t("menu")}</span>
								<button type="button" onClick={() => setMobileOpen(false)} className="inline-flex size-9 items-center justify-center rounded-md text-foreground hover:bg-accent cursor-pointer" aria-label={t("closeMenu")}>
									<X className="size-4" />
								</button>
							</div>
							<nav className="flex flex-col gap-2">
								{navLinks.map((link, i) => (
									<motion.div
										key={link.href}
										initial={prefersReduced ? false : { opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={prefersReduced ? { duration: 0 } : { delay: 0.05 + i * 0.08, duration: 0.3 }}
									>
										<Link
											href={link.href}
											onClick={() => setMobileOpen(false)}
											className={cn(
												"block rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
												pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
											)}
										>
											{link.label}
										</Link>
									</motion.div>
								))}
							</nav>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	)
}

export { Navbar }
