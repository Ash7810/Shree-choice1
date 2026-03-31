
import React, { useState, useEffect } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { FilterSidebar } from '../components/FilterSidebar';
import { MobileFilterDrawer } from '../components/MobileFilterDrawer';
import { Breadcrumbs, type Crumb } from '../components/Breadcrumbs';
import { Pagination } from '../components/ui/Pagination';
import type { Product, Brand } from '../types';
import { EmptyBoxIcon, FilterIcon, XIcon, ChevronDownIcon } from '../components/icons/Icon';
import { SkeletonCard } from '../components/SkeletonCard';

const SectionTitle = ({ title }: { title: string }) => (
    <div className="relative inline-block mb-1">
      <h1 className="text-3xl md:text-4xl font-brand text-brand-primary relative z-10">{title}</h1>
      <div className="absolute -bottom-2 left-0 w-2/3 h-2 bg-play-yellow rounded-full -z-0 opacity-70"></div>
    </div>
);

const ActiveFilters: React.FC<{ filters: { type: string, value: string }[]; onRemove: (type: string, value: string) => void; onClearAll: () => void;}> = ({ filters, onRemove, onClearAll }) => {
    if (filters.length === 0) return null;
    return (
        <div className="px-0 mb-6 flex items-center gap-2 flex-wrap">
            <div className="flex-shrink-0 text-xs font-bold text-gray-500 uppercase tracking-wide">Active Filters:</div>
            <div className="flex items-center gap-2 flex-wrap">
                {filters.map(filter => (
                    <div key={`${filter.type}-${filter.value}`} className="flex items-center gap-2 bg-white border border-blue-100 text-brand-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        <span>{filter.value}</span>
                        <button onClick={() => onRemove(filter.type, filter.value)} className="text-brand-primary hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"><XIcon className="w-3 h-3"/></button>
                    </div>
                ))}
                <button onClick={onClearAll} className="text-xs font-bold text-red-500 hover:underline px-2">Clear All</button>
            </div>
        </div>
    );
};

interface ShopPageProps {
    products: Product[];
    brands: Brand[];
    isLoading: boolean;
}

const PRODUCTS_PER_PAGE = 12;

const ShopPage: React.FC<ShopPageProps> = ({ products, brands, isLoading }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(5000);
    const [sortBy, setSortBy] = useState('relevance');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchQuery(params.get('q') || '');
        setSelectedCategories(params.getAll('category'));
        setSelectedBrands(params.getAll('brand'));
        setSelectedAges(params.getAll('age'));
        setPriceRange(Number(params.get('price')) || 5000);
        setSortBy(params.get('sort') || 'relevance');
        setCurrentPage(parseInt(params.get('page') || '1', 10));
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        selectedCategories.forEach(c => params.append('category', c));
        selectedBrands.forEach(b => params.append('brand', b));
        selectedAges.forEach(a => params.append('age', a));
        if (priceRange < 5000) params.set('price', String(priceRange));
        if (sortBy !== 'relevance') params.set('sort', sortBy);
        if (currentPage > 1) params.set('page', String(currentPage));
        
        const newSearch = params.toString();
        const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
        
        window.history.replaceState({ path: newUrl }, '', newUrl);
    }, [searchQuery, selectedCategories, selectedBrands, selectedAges, priceRange, sortBy, currentPage]);

    const filteredProducts = React.useMemo(() => {
        let result = products;
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(lowercasedQuery) || p.description.toLowerCase().includes(lowercasedQuery) || p.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)) || p.category.toLowerCase().includes(lowercasedQuery) || p.brand.toLowerCase().includes(lowercasedQuery));
        }
        if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category));
        if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
        if (selectedAges.length > 0) result = result.filter(p => selectedAges.includes(p.age_group));
        result = result.filter(p => p.price <= priceRange);

        if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
        else if (sortBy === 'newest') result = [...result].sort((a, b) => b.id - a.id);
        
        return result;
    }, [products, searchQuery, selectedCategories, selectedBrands, selectedAges, priceRange, sortBy]);
    
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const currentProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    const handleFilterChange = () => setCurrentPage(1);

    const handleCategoryChange = (category: string) => { setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]); handleFilterChange(); };
    const handleBrandChange = (brand: string) => { setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]); handleFilterChange(); };
    const handleAgeChange = (age: string) => { setSelectedAges(prev => prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]); handleFilterChange(); };
    const handlePriceChange = (price: number) => { setPriceRange(price); handleFilterChange(); };
    const clearFilters = () => { setSearchQuery(''); setSelectedCategories([]); setSelectedBrands([]); setSelectedAges([]); setPriceRange(5000); setSortBy('relevance'); handleFilterChange(); };

    const activeFilters = [...selectedCategories.map(c => ({ type: 'category', value: c })), ...selectedBrands.map(b => ({ type: 'brand', value: b })), ...selectedAges.map(a => ({ type: 'age', value: a }))];
    if (priceRange < 5000) activeFilters.push({ type: 'price', value: `Under ₹${priceRange}` });
    
    const removeFilter = (type: string, value: string) => {
        if (type === 'category') handleCategoryChange(value);
        if (type === 'brand') handleBrandChange(value);
        if (type === 'age') handleAgeChange(value);
        if (type === 'price') handlePriceChange(5000);
    };
    
    const crumbs: Crumb[] = [{ label: 'Home', href: '/' }, { label: 'Shop' }];

    return (
        <div className="pt-24 md:pt-32 pb-8 font-sans text-gray-900 min-h-screen">
            <MobileFilterDrawer isOpen={showMobileFilters} onClose={() => setShowMobileFilters(false)} {...{selectedCategories, handleCategoryChange, priceRange, setPriceRange: handlePriceChange, brands, selectedBrands, handleBrandChange, selectedAges, handleAgeChange, clearFilters, productCount: filteredProducts.length}} />
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6 z-10">
                <div className="mb-6 pl-1"><Breadcrumbs crumbs={crumbs} /></div>
                <div className="lg:hidden sticky top-[80px] z-40 bg-white/95 backdrop-blur-md border-y border-gray-100 mb-6 -mx-4 px-4 py-3 flex gap-4 shadow-sm"><button onClick={() => setShowMobileFilters(true)} className="flex-1 flex items-center justify-center gap-2 font-bold text-sm text-slate-700 active:text-brand-primary"><FilterIcon className="w-4 h-4 text-slate-500" /> Filter {activeFilters.length > 0 && <span className="bg-brand-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{activeFilters.length}</span>}</button><div className="w-px bg-gray-200 h-6 self-center"></div><div className="flex-1 relative"><select className="w-full text-center font-bold text-sm text-slate-700 bg-transparent appearance-none focus:outline-none py-1 pl-4 pr-6" value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="relevance">Relevance</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="newest">Newest First</option></select><div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"><ChevronDownIcon className="w-3 h-3"/></div></div></div>
                <div className="flex gap-8 items-start mb-24">
                    <FilterSidebar {...{selectedCategories, handleCategoryChange, priceRange, setPriceRange: handlePriceChange, brands, selectedBrands, handleBrandChange, selectedAges, handleAgeChange, clearFilters}} />
                    <main className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                             <div>
                                <SectionTitle title={searchQuery ? 'Search Results' : 'All Toys'} />
                                <p className="text-sm text-text-secondary mt-1 ml-1 font-medium">{filteredProducts.length} results found</p>
                             </div>
                             <div className="hidden lg:flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"><span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Sort By:</span><select className="text-sm font-bold text-brand-primary bg-transparent border-none focus:ring-0 cursor-pointer py-1 pr-8 pl-0" value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="relevance">Relevance</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="newest">Newest First</option></select></div>
                        </div>
                        <ActiveFilters filters={activeFilters} onRemove={removeFilter} onClearAll={clearFilters} />
                        <div className="min-h-[600px]">
                            {isLoading ? <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">{Array.from({ length: 12 }).map((_, index) => <SkeletonCard key={index} />)}</div> : currentProducts.length > 0 ? <ProductGrid products={currentProducts} /> : <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]"><EmptyBoxIcon className="w-24 h-24 text-gray-200 mb-6" /><h3 className="text-2xl font-bold text-slate-800 mb-2">No toys matched your search.</h3><p className="text-slate-500 mb-8 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p><button onClick={clearFilters} className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-transform active:scale-95">Clear All Filters</button></div>}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
