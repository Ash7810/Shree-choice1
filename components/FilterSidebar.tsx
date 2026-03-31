
import React, { useState } from 'react';
import { CATEGORIES, AGE_GROUPS } from '../constants';
import { Brand } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from './icons/Icon';

interface FilterSidebarProps {
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
}

const FilterSection: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    defaultOpen?: boolean; 
}> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 last:border-0 py-4">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center bg-transparent group"
            >
                <span className="text-sm font-bold text-slate-800 uppercase tracking-wide group-hover:text-brand-primary transition-colors">{title}</span>
                <span className="text-gray-400 group-hover:text-brand-primary transition-colors">
                    {isOpen ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>}
                </span>
            </button>
            
            {isOpen && (
                <div className="pt-4 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    selectedCategories,
    handleCategoryChange,
    priceRange,
    setPriceRange,
    brands,
    selectedBrands,
    handleBrandChange,
    selectedAges,
    handleAgeChange,
    clearFilters
}) => {
    const [brandSearch, setBrandSearch] = useState('');

    const filteredBrands = brands.filter(brand => 
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    return (
        <aside className="hidden lg:block w-[280px] flex-shrink-0 sticky top-28 z-30 ml-1">
            <div className="clay-panel p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-primary font-brand flex items-center gap-2">
                         Filters
                    </h2>
                    <button 
                        onClick={clearFilters}
                        className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                {/* Price Filter */}
                <FilterSection title="Price Range">
                    <input 
                        type="range" 
                        min="100" 
                        max="5000" 
                        step="100"
                        value={priceRange} 
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary mb-4"
                    />
                    <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                        <div className="bg-gray-50 px-3 py-1 rounded border border-gray-200">₹100</div>
                        <div className="bg-gray-50 px-3 py-1 rounded border border-gray-200">₹{priceRange}</div>
                    </div>
                </FilterSection>

                {/* Categories */}
                <FilterSection title="Categories">
                    <div className="space-y-2">
                        {CATEGORIES.map(cat => (
                            <label key={cat.name} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2">
                                <input 
                                    type="checkbox" 
                                    checked={selectedCategories.includes(cat.name)}
                                    onChange={() => handleCategoryChange(cat.name)}
                                    className="clay-check flex-shrink-0"
                                />
                                <span className={`ml-3 text-sm transition-colors ${selectedCategories.includes(cat.name) ? 'font-bold text-brand-primary' : 'text-slate-600'}`}>
                                    {cat.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Age Group */}
                <FilterSection title="Age Group">
                    <div className="space-y-2">
                        {AGE_GROUPS.map(age => (
                            <label key={age} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2">
                                <input 
                                    type="checkbox" 
                                    checked={selectedAges.includes(age)}
                                    onChange={() => handleAgeChange(age)}
                                    className="clay-check flex-shrink-0"
                                />
                                <span className={`ml-3 text-sm transition-colors ${selectedAges.includes(age) ? 'font-bold text-brand-primary' : 'text-slate-600'}`}>
                                    {age}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Brands */}
                <FilterSection title="Brands" defaultOpen={false}>
                    <div className="relative mb-3">
                         <input 
                            type="text" 
                            placeholder="Find Brand..."
                            value={brandSearch}
                            onChange={(e) => setBrandSearch(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder-gray-400" 
                        />
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {filteredBrands.map(brand => (
                            <label key={brand.id} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2">
                                <input 
                                    type="checkbox" 
                                    checked={selectedBrands.includes(brand.name)}
                                    onChange={() => handleBrandChange(brand.name)}
                                    className="clay-check flex-shrink-0"
                                />
                                <span className={`ml-3 text-sm transition-colors ${selectedBrands.includes(brand.name) ? 'font-bold text-brand-primary' : 'text-slate-600'}`}>
                                    {brand.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
};
