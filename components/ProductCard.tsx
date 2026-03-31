
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { HeartIcon, ShoppingCartIcon } from './icons/Icon';
import { StarRating } from './StarRating';
import { Link } from '../lib/router';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isProductWishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const discount = product.original_price && product.original_price > product.price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
    : 0;

  return (
    <motion.div className="bg-white rounded-2xl flex flex-col text-center transition-all duration-300 relative group border border-slate-100 hover:shadow-xl hover:border-blue-200 h-full overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href={`/product/${product.id}`} className="block p-3 pb-0">
            <div className="relative aspect-square w-full mb-2 overflow-hidden rounded-xl bg-slate-50">
                <img src={product.image_url} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button onClick={handleToggleWishlist} className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${isProductWishlisted ? 'text-play-red bg-red-50 border-red-100' : 'bg-white/80 text-gray-400 hover:text-play-red border-transparent'}`}><HeartIcon className="w-4 h-4" fill={isProductWishlisted ? "currentColor" : "none"}/></button>
                {discount > 0 && <div className="absolute top-2 left-2 bg-brand-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{discount}% OFF</div>}
            </div>
            <div className="flex flex-col gap-1 flex-grow p-2">
                <h3 className="text-sm font-bold text-slate-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
                <div className="flex items-baseline justify-center gap-2 mt-auto">
                    <p className="text-lg font-bold text-brand-primary">₹{product.price.toLocaleString()}</p>
                    {product.original_price && product.original_price > product.price && <p className="text-sm text-gray-400 line-through">₹{product.original_price.toLocaleString()}</p>}
                </div>
                <div className="mt-1"><StarRating rating={product.rating} /></div>
            </div>
        </Link>
      <div className="p-3 pt-2 md:pt-4 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
          <button onClick={handleAddToCart} disabled={!product.in_stock || isAdded} className={`w-full py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wide border-2 ${isAdded ? 'bg-green-100 text-green-700 border-green-200' : !product.in_stock ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-brand-primary/5 text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-white'}`}>
              <span className="font-quicksand font-bold text-xs md:text-sm">{isAdded ? 'Added!' : !product.in_stock ? 'Out of Stock' : 'Add To Cart'}</span>
              {isAdded ? <CheckIcon className="w-4 h-4" /> : !product.in_stock ? null : <ShoppingCartIcon className="w-4 h-4" />}
          </button>
      </div>
    </motion.div>
  );
};
