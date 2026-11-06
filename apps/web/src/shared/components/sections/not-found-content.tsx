"use client"

import { Home } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

export function NotFoundContent() {
	const t = useTranslations("notFound")
	const shouldReduceMotion = useReducedMotion()

	const animate = !shouldReduceMotion

	return (
		<div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 -mt-16 pt-16">
			<div className="relative z-10 flex flex-col items-center gap-6 text-center">
				<motion.h1
					className="text-[10rem] font-black leading-none tracking-tighter text-foreground/10 sm:text-[14rem] md:text-[18rem]"
					initial={animate ? { scale: 0.5, opacity: 0 } : undefined}
					animate={animate ? { scale: 1, opacity: 1 } : undefined}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					404
				</motion.h1>
				<motion.div
					className="-mt-20 flex flex-col items-center gap-4 sm:-mt-28 md:-mt-36"
					initial={animate ? { y: 20, opacity: 0 } : undefined}
					animate={animate ? { y: 0, opacity: 1 } : undefined}
					transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
				>
					<h2 className="text-2xl font-bold sm:text-3xl">{t("heading")}</h2>
					<p className="max-w-md text-muted-foreground">{t("description")}</p>
					<Link href="/" className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-2 gap-2")}>
						<Home className="size-4" />
						{t("backHome")}
					</Link>
				</motion.div>
			</div>
		</div>
	)
}
