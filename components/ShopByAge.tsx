
import React from 'react';
import { Link } from '../lib/router';

const ageData = [
    { range: '0-12', unit: 'Months', filterValue: '0-12m', bg: 'bg-[#FFB3D9]', text: 'text-white' },
    { range: '1-3', unit: 'Years', filterValue: '1-3y', bg: 'bg-[#FFD533]', text: 'text-white' },
    { range: '3-5', unit: 'Years', filterValue: '3-5y', bg: 'bg-[#5FB5E5]', text: 'text-white' },
    { range: '5-8', unit: 'Years', filterValue: '5-8y', bg: 'bg-[#FF9966]', text: 'text-white' },
    { range: '8-14', unit: 'Years', filterValue: '8-14y', bg: 'bg-[#7BC74E]', text: 'text-white' },
    { range: '14+', unit: 'Years', filterValue: '14+', bg: 'bg-[#2B5F9E]', text: 'text-white' },
];

export const ShopByAge: React.FC = () => {
    return (
        <div className="relative py-4 md:py-8">
            <div className="relative z-10">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                    {ageData.map(age => (
                        <Link 
                            key={age.range} 
                            href={`/shop?age=${age.filterValue}`}
                            className={`group flex flex-col items-center justify-center w-24 h-24 sm:w-36 sm:h-36 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl ${age.bg}`}
                        >
                            <span className="text-2xl sm:text-4xl font-brand text-white drop-shadow-md">{age.range}</span>
                            <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/90 mt-0.5 sm:mt-1">{age.unit}</span>
                            
                            <div className="mt-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden sm:block">
                                View
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
