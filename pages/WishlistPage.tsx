
import React from 'react';
import type { Product } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { HeartIcon } from '../components/icons/Icon';
import { useRouter } from '../contexts/RouterContext';
import { PageHeader } from '../components/ui/PageHeader';
import { useWishlist } from '../contexts/WishlistContext';

const EmptyWishlist: React.FC = () => {
    const { onNavigate } = useRouter();
    return (
        <div className="clay-panel p-8 sm:p-12 text-center flex flex-col items-center animate-fade-in">
            <div className="relative mb-6">
                <div className="absolute -inset-4 bg-red-50 rounded-full animate-pulse opacity-50"></div>
                 <div className="relative w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-12 h-12 text-red-300"/>
                 </div>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-brand-primary">Your Wishlist is a Blank Canvas</h2>
            <p className="text-text-secondary mb-6 max-w-sm">
                Looks like you haven't added any toys to your wishlist yet. Explore our magical collection and find something special!
            </p>
            <button onClick={() => onNavigate('/shop')} className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold clay-btn shadow-lg hover:shadow-brand-primary/40 transition-shadow">
                Find Toys
            </button>
        </div>
    );
};

interface WishlistPageProps {
    products: Product[];
    isLoading?: boolean;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ products, isLoading }) => {
    const { wishlist } = useWishlist();
    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    return (
        <div className="bg-transparent pt-24 md:pt-32 pb-12 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader title="My Wishlist" subtitle="Your favorite toys, all in one place." />

                {wishlistedProducts.length === 0 && !isLoading ? (
                    <EmptyWishlist />
                ) : (
                    <ProductGrid 
                        isLoading={isLoading}
                        products={wishlistedProducts}
                    />
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
