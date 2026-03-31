
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, AGE_GROUPS } from '../constants';
import { Brand } from '../types';
import { XIcon, ChevronDownIcon, ChevronUpIcon } from './icons/Icon';

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategories: string[];
    handleCategoryChange: (category: string) => void;
    priceRange: number;
    setPriceRange: (value: number) => void;
    brands: Brand[];
    selectedBrands: string[];
    handleBrandChange: (brand: string) => void;
    selectedAges: string[];
    handleAgeChange: (age: string) => void;
    clearFilters: () => void;
    productCount: number;
}

const FilterSection: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    defaultOpen?: boolean; 
}> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full py-4 px-1 flex justify-between items-center bg-transparent"
            >
                <span className="text-sm font-bold text-gray-800 uppercase tracking-wide font-quicksand">{title}</span>
                <span className="text-gray-400">
                    {isOpen ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
                </span>
            </button>
            
            {isOpen && (
                <div className="pb-4 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    isOpen,
    onClose,
    selectedCategories,
    handleCategoryChange,
    priceRange,
    setPriceRange,
    brands,
    selectedBrands,
    handleBrandChange,
    selectedAges,
    handleAgeChange,
    clearFilters,
    productCount
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 w-full h-[85vh] z-[61] bg-white/95 backdrop-blur-xl rounded-t-3xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/50">
                            <h2 className="text-xl font-bold text-brand-primary font-quicksand">Filters</h2>
                            <button 
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-5">
                            
                            {/* Price Filter */}
                            <FilterSection title="Price Range">
                                <div className="px-1">
                                    <input 
                                        type="range" 
                                        min="100" 
                                        max="5000" 
                                        step="100"
                                        value={priceRange} 
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary mb-4"
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                                            <span className="text-xs text-gray-400 block uppercase font-bold">Min</span>
                                            <div className="text-base font-bold text-gray-900">₹100</div>
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                                            <span className="text-xs text-gray-400 block uppercase font-bold">Max</span>
                                            <div className="text-base font-bold text-gray-900">₹{priceRange}</div>
                                        </div>
                                    </div>
                                </div>
                            </FilterSection>

                            {/* Categories */}
                            <FilterSection title="Categories">
                                <div className="space-y-3">
                                    {CATEGORIES.map(cat => (
                                        <label key={cat.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-transparent active:border-brand-primary/20 active:bg-blue-50 transition-all">
                                            <span className={`text-base ${selectedCategories.includes(cat.name) ? 'font-bold text-brand-primary' : 'text-gray-700'}`}>
                                                {cat.name}
                                            </span>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedCategories.includes(cat.name)}
                                                onChange={() => handleCategoryChange(cat.name)}
                                                className="clay-check w-6 h-6"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Age Group */}
                            <FilterSection title="Age Group">
                                <div className="flex flex-wrap gap-3">
                                    {AGE_GROUPS.map(age => (
                                        <label key={age} className="cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedAges.includes(age)}
                                                onChange={() => handleAgeChange(age)}
                                                className="hidden peer"
                                            />
                                            <div className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-slate-700 active:scale-95 transition-all peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary peer-checked:shadow-md">
                                                {age}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Brands */}
                            <FilterSection title="Brands" defaultOpen={false}>
                                <div className="space-y-3">
                                    {brands.map(brand => (
                                        <label key={brand.id} className="flex items-center cursor-pointer p-2">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedBrands.includes(brand.name)}
                                                onChange={() => handleBrandChange(brand.name)}
                                                className="clay-check w-6 h-6 flex-shrink-0"
                                            />
                                            <span className={`ml-4 text-base ${selectedBrands.includes(brand.name) ? 'font-bold text-brand-primary' : 'text-gray-700'}`}>
                                                {brand.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-5 border-t border-gray-100 bg-white shadow-lg flex gap-4">
                            <button 
                                onClick={clearFilters}
                                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm uppercase tracking-wider"
                            >
                                Reset
                            </button>
                            <button 
                                onClick={onClose}
                                className="flex-[2] py-3 px-4 rounded-xl bg-brand-primary text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-brand-primary/30"
                            >
                                Show {productCount} Results
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
