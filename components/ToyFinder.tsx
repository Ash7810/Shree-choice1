
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ChevronDownIcon } from './icons/Icon';
import { useRouter } from '../contexts/RouterContext';

export const ToyFinder: React.FC = () => {
    const [age, setAge] = useState('');
    const [interest, setInterest] = useState('');
    const { onNavigate } = useRouter();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (age) params.set('age', age);
        
        let category: string | undefined;
        if (interest === 'Creative') category = 'Arts & Crafts';
        if (interest === 'Puzzles') category = 'Puzzles';
        if (interest === 'Action') category = 'Toys';
        if (interest === 'Soft') category = 'Soft Toys';
        if(category) params.set('category', category);

        onNavigate(`/shop?${params.toString()}`);
    };

    return (
        <div className="bg-white p-6 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
            
            {/* Title Section */}
            <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto md:min-w-[240px] border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFF9C4] text-yellow-700 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm flex-shrink-0">
                    🎁
                </div>
                <div>
                    <h3 className="font-brand text-xl md:text-2xl text-slate-800">Toy Finder</h3>
                    <p className="text-xs md:text-sm text-slate-500 font-bold mt-1">Find the perfect gift</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                <div className="relative group">
                    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block ml-1">For Age</label>
                    <div className="relative">
                        <select 
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full appearance-none bg-gray-50 border-2 border-gray-100 hover:border-brand-primary/40 rounded-xl md:rounded-2xl py-3 px-4 md:py-4 md:px-5 text-sm md:text-base font-bold text-slate-700 cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm"
                        >
                            <option value="">Select Age Group</option>
                            <option value="0-12m">0-12 Months</option>
                            <option value="1-3y">1-3 Years</option>
                            <option value="3-5y">3-5 Years</option>
                            <option value="5-8y">5-8 Years</option>
                            <option value="8-14y">8-14 Years</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <ChevronDownIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block ml-1">Interest</label>
                    <div className="relative">
                        <select 
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            className="w-full appearance-none bg-gray-50 border-2 border-gray-100 hover:border-brand-primary/40 rounded-xl md:rounded-2xl py-3 px-4 md:py-4 md:px-5 text-sm md:text-base font-bold text-slate-700 cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm"
                        >
                            <option value="">Select Interest</option>
                            <option value="Action">Action & Adventure</option>
                            <option value="Creative">Arts & Creativity</option>
                            <option value="Puzzles">Brain Games</option>
                            <option value="Soft">Soft & Cuddly</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                             <ChevronDownIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Launch Button */}
            <div className="w-full md:w-auto mt-2 md:mt-6">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-brand-primary text-white font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-xl md:rounded-2xl shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap border-2 border-transparent"
                >
                    <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-base md:text-lg">Search</span>
                </motion.button>
            </div>
        </div>
    );
};
