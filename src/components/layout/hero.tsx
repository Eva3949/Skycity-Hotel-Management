'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useLanguage } from '@/hooks/use-language';

const sliderImages = [
  {
    id: '1',
    url: 'https://drive.google.com/uc?export=download&id=1n3i48Xq5hMFijjd7IYuKVLrjwIWMT055',
  },
  {
    id: '2',
    url: 'https://drive.google.com/uc?export=download&id=1inl55STMx35YNrJV-BXHYr4sMJlj_A4P',
  },
  {
    id: '3',
    url: 'https://drive.google.com/uc?export=download&id=1uK2AIvqOo4CDSfxoX3D7Ic8SRW0W5zR3',
  },
  {
    id: '4',
    url: 'https://drive.google.com/uc?export=download&id=1_czKWWCVDUgQXrtfyo0Qeh7VO-V-dtOR',
  },
];

export function Hero() {
  const { t } = useLanguage();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden group">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-[50vh] md:h-[70vh] ml-0">
            {sliderImages.map((image, index) => (
              <CarouselItem key={image.id} className="relative w-full h-full pl-0">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={image.url}
                    alt={t.hero.slides[index].title}
                    fill
                    className="object-cover transition-transform duration-10000 group-hover:scale-110"
                    priority
                  />
                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />
                  
                  <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-center md:text-left p-6 md:p-12 lg:p-24 z-20">
                    <div className="max-w-4xl space-y-6 md:space-y-8">
                      <div className="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
                        <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs md:text-sm font-bold tracking-widest uppercase">
                          {t.hero.luxuryReimagined}
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter text-white leading-[1.1] md:leading-[0.9]">
                          {t.hero.slides[index].title.split(' ').map((word, i) => {
                            const isBrand = word.toLowerCase().includes('skycity') || word.includes('ስካይሲቲ');
                            return (
                              <span key={i} className={isBrand ? 'text-primary' : ''}>
                                {word}{' '}
                              </span>
                            );
                          })}
                        </h1>
                      </div>
                      
                      <p className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-2xl drop-shadow-md font-medium leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000 delay-200 ease-out">
                        {t.hero.slides[index].description}
                      </p>

                      <div className="flex flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-4 pt-2 md:pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        <Link 
                          href="/rooms" 
                          className="px-4 py-2.5 md:px-10 md:py-4 bg-primary hover:bg-primary/90 text-white text-[13px] md:text-base font-bold rounded-lg md:rounded-2xl shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 whitespace-nowrap text-center"
                        >
                          {t.hero.exploreRooms}
                        </Link>
                        <Link 
                          href="/#menu" 
                          className="px-4 py-2.5 md:px-10 md:py-4 bg-white/10 hover:bg-white/20 text-white text-[13px] md:text-base font-bold rounded-lg md:rounded-2xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap text-center"
                        >
                          {t.hero.viewMenu}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Floating Glass Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {sliderImages.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-white/30 backdrop-blur-md transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
