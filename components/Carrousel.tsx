'use client'
import { api } from '@/api/api'
import { NewsInterface } from '@/types/News'
import { useQuery } from 'react-query'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export function Carrousel() {
  async function fetchNewsCarrousel() {
    const response = await api.get('/news/')
    return response.data.results
  }

  const { data: news } = useQuery<NewsInterface[]>(
    ['getNewsCarrousel'],
    fetchNewsCarrousel,
  )

  const plugin = Autoplay({ delay: 3000, stopOnInteraction: false })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'MM/d/yyyy')
  }

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full mt-1 mb-1 px-2 rounded-lg"
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent className="rounded-lg">
        {news?.map((item, index) => (
          <CarouselItem key={index} className="rounded-lg">
            <Link href={item.news_link} target="_blank">
              <div className="pt-2 rounded-lg">
                <Card className="bg-[#272927] rounded-lg border-none h-[180px] relative overflow-hidden">
                  {/* Imagem ocupando todo o card */}
                  <Image
                    src={item.image_link}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />

                  {/* Gradiente escuro sobreposto à imagem */}
                  <div className="absolute mt-24 inset-0 bg-gradient-to-b from-transparent to-black/90" />

                  {/* Conteúdo sobreposto */}
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-1 z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-white truncate block mb-1">
                        {item.source}
                      </span>
                      <span className="text-xs font-semibold text-white truncate block mb-1">
                        {formatDate(item.pub_date)}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-200 line-clamp-3">
                      {item.title}
                    </span>
                  </div>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}
