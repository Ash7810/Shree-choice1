
import React from 'react';
import { CATEGORIES } from '../constants';
import { Link } from '../lib/router';

interface CategorySectionProps { }

export const CategorySection: React.FC<CategorySectionProps> = () => {
    return (
        <section className="py-12 bg-white relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-brand text-slate-800 relative inline-block">
                        Shop By Categories
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-secondary rounded-full"></div>
                    </h2>
                    <p className="text-slate-500 mt-4 font-medium text-sm md:text-base">Find the perfect toy for every interest</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {CATEGORIES.slice(0, 5).map((cat, index) => {
                         const colors = ['border-red-200', 'border-blue-200', 'border-yellow-200', 'border-green-200', 'border-purple-200'];
                         const bgColors = ['bg-red-50', 'bg-blue-50', 'bg-yellow-50', 'bg-green-50', 'bg-purple-50'];
                         const textColors = ['text-red-600', 'text-blue-600', 'text-yellow-600', 'text-green-600', 'text-purple-600'];
                         
                         const borderColor = colors[index % colors.length];
                         const bgColor = bgColors[index % bgColors.length];
                         const textColor = textColors[index % textColors.length];

                         return (
                            <Link 
                                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                                key={cat.name}
                                className="group flex flex-col items-center cursor-pointer"
                            >
                                <div className={`w-28 h-28 md:w-44 md:h-44 rounded-full p-1.5 md:p-2 border-[3px] border-dashed ${borderColor} ${bgColor} mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                                    <img 
                                        src={cat.image_url} 
                                        alt={cat.name} 
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full rounded-full object-cover shadow-inner bg-white"
                                    />
                                </div>
                                <h3 className={`font-brand text-sm md:text-lg ${textColor} group-hover:opacity-80 transition-opacity text-center max-w-[120px]`}>{cat.name}</h3>
                            </Link>
                         );
                    })}
                </div>
            </div>
        </section>
    );
};
