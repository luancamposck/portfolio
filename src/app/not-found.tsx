import { Home } from "lucide-react"
import { GradientBlob } from "@/shared/components/creative/gradient-blob"

export default function NotFound() {
	return (
		<div className="relative">
			<GradientBlob color="bg-primary/20" size="w-96 h-96" className="top-1/4 -left-20" delay={0} />
			<GradientBlob color="bg-chart-1/20" size="w-80 h-80" className="bottom-1/4 -right-20" delay={2} />
			<div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 -mt-16 pt-16">
				<div className="relative z-10 flex flex-col items-center gap-6 text-center">
					<h1 className="text-[10rem] font-black leading-none tracking-tighter text-foreground/10 sm:text-[14rem] md:text-[18rem]">404</h1>
					<div className="-mt-20 flex flex-col items-center gap-4 sm:-mt-28 md:-mt-36">
						<h2 className="text-2xl font-bold sm:text-3xl">Página não encontrada</h2>
						<p className="max-w-md text-muted-foreground">A página que você está procurando não existe ou foi movida.</p>
						<a
							href="/pt"
							className="group/button mt-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary bg-clip-padding text-sm font-medium text-primary-foreground whitespace-nowrap transition-all outline-none select-none h-9 px-2.5 [a]:hover:bg-primary/80"
						>
							<Home className="size-4" />
							Voltar ao início
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
