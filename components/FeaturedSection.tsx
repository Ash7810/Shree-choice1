
import React, { useRef } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icon';
import { SkeletonCard } from './SkeletonCard';

interface FeaturedSectionProps {
    products: Product[]; 
    isLoading?: boolean;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ products, isLoading }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.offsetWidth * 0.8; // Scroll by 80% of visible width
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return (
            <section className="relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Skeleton Header */}
                    <div className="flex justify-between items-end mb-6 md:mb-8 animate-pulse">
                        <div>
                            <div className="h-10 bg-slate-200 rounded w-64"></div>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                        </div>
                    </div>
                    {/* Skeleton Grid */}
                    <div className="flex gap-6 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4">
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-end mb-6 md:mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-brand text-brand-primary relative inline-block">
                            Trending Products
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-yellow-400 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </h2>
                    </div>
                    
                    {/* Navigation Buttons - Hidden on mobile */}
                    <div className="hidden md:flex gap-3">
                        <button 
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 transition hover:bg-brand-primary hover:border-brand-primary hover:text-white shadow-sm"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeftIcon className="w-5 h-5"/>
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 transition hover:bg-brand-primary hover:border-brand-primary hover:text-white shadow-sm"
                            aria-label="Scroll Right"
                        >
                            <ChevronRightIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
                
                <div 
                    ref={scrollContainerRef}
                    className="flex flex-nowrap overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
                >
                    {products.map(p => (
                        <div key={p.id} className="snap-start flex-shrink-0 w-[55vw] sm:w-[240px] lg:w-[280px]">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};
