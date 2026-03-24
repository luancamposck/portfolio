"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog"

interface ProjectGalleryProps {
	images: string[]
	title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
	const t = useTranslations("projectGallery")
	const tDetail = useTranslations("projectDetail")
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
	const indexedImages = images.map((src, i) => ({ id: `img-${i}`, src, index: i }))

	if (images.length === 0) return null

	return (
		<SectionWrapper className="py-12">
			<h2 className="text-2xl font-bold">{t("heading")}</h2>
			<div className="mt-6">
				<Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-4xl">
					<CarouselContent>
						{indexedImages.map((item) => (
							<CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
								<button type="button" className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg" onClick={() => setLightboxIndex(item.index)}>
									<Image
										src={item.src}
										alt={tDetail("imageAlt", { title, index: item.index + 1 })}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
								</button>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="-left-2 sm:-left-12" />
					<CarouselNext className="-right-2 sm:-right-12" />
				</Carousel>
			</div>

			<Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
				<DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
					<DialogTitle className="sr-only">{lightboxIndex !== null ? tDetail("imageAlt", { title, index: lightboxIndex + 1 }) : ""}</DialogTitle>
					{lightboxIndex !== null && (
						<div className="relative aspect-video w-full overflow-hidden rounded-lg">
							<Image src={images[lightboxIndex]} alt={tDetail("imageAlt", { title, index: lightboxIndex + 1 })} fill className="object-contain" sizes="90vw" />
						</div>
					)}
				</DialogContent>
			</Dialog>
		</SectionWrapper>
	)
}
