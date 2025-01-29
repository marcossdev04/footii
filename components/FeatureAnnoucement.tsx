/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { Star, X } from 'lucide-react'
import Image from 'next/image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { usePathname } from 'next/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import image1 from '@/assets/image1.png'
import image2 from '@/assets/image2.png'

const FEATURE_ANNOUNCEMENT_KEY = 'feature-announcement-shown'
const DIALOG_DELAY = 3000
const CAROUSEL_INTERVAL = 2000

export function FeatureAnnouncementDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const hasShown = localStorage.getItem(FEATURE_ANNOUNCEMENT_KEY)

    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, DIALOG_DELAY)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open)

    // Se o modal está sendo fechado, define a flag no localStorage
    if (!open) {
      localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, 'true')
    }
  }

  if (pathname === '/' || pathname === '/register') {
    return null
  }

  const carouselImages = [image1, image2]

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="p-0 bg-[#1a1a1f] md:max-w-[450px] border-gray-800">
        <DialogHeader className="bg-[#24232B] p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-default font-semibold">New Feature</span>
            </div>
          </div>
        </DialogHeader>

        {/* Image */}
        <Carousel
          plugins={[
            Autoplay({
              delay: CAROUSEL_INTERVAL,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full mx-auto mb-0"
        >
          <CarouselContent>
            {carouselImages.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  src={src}
                  alt={`Feature ${index + 1}`}
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-[400px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Content */}
        <div className="px-4 pb-4 space-y-4">
          <DialogClose className="absolute top-4 right-4">
            <X />
          </DialogClose>
          <div className="flex items-center justify-between">
            <h3 className="text-white text-lg font-bold flex items-center">
              <Star className="text-default mr-2" size={20} />
              H2H and complete Statistics
            </h3>
          </div>

          <div className="bg-[#24232B] rounded-lg p-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Access the history of direct confrontations and detailed
              statistics before the matches. After the game's end, click to see
              complete results and analysis.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
