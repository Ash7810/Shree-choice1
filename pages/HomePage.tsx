
import React from 'react';
import { HeroSection } from '../components/HeroSlider';
import { CategorySection } from '../components/CategorySection';
import { FeaturedSection } from '../components/FeaturedSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ContactForm } from '../components/ContactForm';
import { CustomerReviews } from '../components/CustomerReviews';
import { ShopByAge } from '../components/ShopByAge';
import { ToyFinder } from '../components/ToyFinder'; 
import { SectionHeader } from '../components/SectionHeader';
import { ShopByBrand } from '../components/ShopByBrand';
import type { Product, Brand } from '../types';

interface HomePageProps {
    isLoading: boolean;
    products: Product[];
    brands: Brand[];
}

const HomePage: React.FC<HomePageProps> = ({ isLoading, products, brands }) => {
    
    const trendingProducts = React.useMemo(() => {
        let trending = products.filter(p => p.tags.includes('trending') || p.tags.includes('bestseller'));
        if (trending.length < 4) {
            trending = [...products].sort((a, b) => b.id - a.id).slice(0, 8);
        }
        return trending;
    }, [products]);

    return (
        <div className="animate-fade-in bg-white">
            <HeroSection />
            <div className="relative -mt-24 md:-mt-32 z-30 px-4 mb-16">
                <div className="max-w-6xl mx-auto shadow-2xl shadow-blue-900/10 rounded-[2.5rem] bg-white overflow-hidden border border-gray-100">
                    <ToyFinder />
                </div>
            </div>
            <CategorySection />
            <div className="bg-[#F0F9FF] py-20 border-y border-blue-50 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#BFDBFE 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                 <FeaturedSection isLoading={isLoading} products={trendingProducts} />
            </div>
            <div className="bg-white py-20">
                <section className="w-full">
                    <SectionHeader title="Shop by Age" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><ShopByAge /></div>
                </section>
            </div>
            <WhyChooseUs />
            <ShopByBrand brands={brands} />
            <CustomerReviews />
            <ContactForm />
        </div>
    );
};

export default HomePage;
