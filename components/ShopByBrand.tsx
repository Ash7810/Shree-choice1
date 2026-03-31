
import React, { useRef } from 'react';
// FIX: Removed unused 'ViewType' import.
import { Brand } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icon';
import { Link } from '../lib/router';

interface ShopByBrandProps {
    brands: Brand[];
}

export const ShopByBrand: React.FC<ShopByBrandProps> = ({ brands }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const featuredBrands = brands.filter(b => b.is_featured).slice(0, 12);
    const brandsToShow = featuredBrands.length > 0 ? featuredBrands : brands.slice(0, 12);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.offsetWidth * 0.9; 
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div>
                         <h2 className="text-3xl font-brand text-brand-primary relative">
                           Shop by Brand
                           <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-play-yellow rounded-full"></span>
                         </h2>
                    </div>
                     <div className="hidden md:flex items-center gap-3">
                        <Link href="/shop" className="text-brand-primary font-bold hover:underline flex items-center gap-1">
                            View All Brands <span>→</span>
                        </Link>
                        <div className="w-px h-6 bg-slate-200 mx-2"></div>
                        <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 transition hover:bg-brand-primary hover:border-brand-primary hover:text-white shadow-sm" aria-label="Scroll Left">
                            <ChevronLeftIcon className="w-5 h-5"/>
                        </button>
                        <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 transition hover:bg-brand-primary hover:border-brand-primary hover:text-white shadow-sm" aria-label="Scroll Right">
                            <ChevronRightIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <div ref={scrollContainerRef} className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory auto-cols-[calc(50%-0.5rem)] sm:auto-cols-[calc(33.33%-0.66rem)] lg:auto-cols-[calc(25%-0.75rem)]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {brandsToShow.map(brand => (
                        <Link href={`/shop?brand=${encodeURIComponent(brand.name)}`} key={brand.id} className="snap-start flex justify-center items-center p-2 bg-white rounded-2xl h-28 transition-all hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100 group">
                            <img src={brand.logo_url} alt={brand.name} loading="lazy" decoding="async" className="w-full h-full object-contain p-2 transition-all duration-300" />
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link href="/shop" className="clay-btn bg-white border border-gray-300 px-6 py-2.5 rounded-xl text-brand-primary font-bold shadow-sm">
                        View All Brands
                    </Link>
                </div>
            </div>
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
        </section>
    );
};
