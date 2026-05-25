import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, Factory, Leaf, Zap, Globe, type LucideIcon } from 'lucide-react';
import { timelineEvents } from '@/data/mock';

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Shield,
  Factory,
  Leaf,
  Zap,
  Globe,
};

export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 360;
    const newIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(timelineEvents.length - 1, activeIndex + 1);

    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <button
          onClick={() => scroll('left')}
          disabled={activeIndex === 0}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <button
          onClick={() => scroll('right')}
          disabled={activeIndex === timelineEvents.length - 1}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative overflow-hidden mx-0 md:mx-16">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 -translate-y-1/2 hidden md:block" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 md:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timelineEvents.map((event, index) => {
            const Icon = iconMap[event.icon];
            const isActive = index === activeIndex;

            return (
              <div
                key={event.year}
                className={`flex-shrink-0 w-80 snap-center transition-all duration-500 ${
                  isActive ? 'scale-100 opacity-100' : 'md:scale-95 md:opacity-60'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative pt-8 md:pt-12">
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 transition-colors duration-300 hidden md:block ${
                    isActive
                      ? 'bg-primary-500 border-primary-200'
                      : 'bg-white border-primary-300'
                  }`} />

                  <div className={`glass rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                    isActive ? 'ring-2 ring-primary-500/30' : 'hover:ring-2 hover:ring-primary-500/20'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-3xl font-bold transition-colors duration-300 ${
                        isActive ? 'text-gradient' : 'text-neutral-400'
                      }`}>
                        {event.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {timelineEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              scrollRef.current?.scrollTo({
                left: index * 336,
                behavior: 'smooth',
              });
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-primary-500 w-6' : 'bg-neutral-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
