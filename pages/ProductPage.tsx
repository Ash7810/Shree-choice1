
import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { TruckIcon, ShieldCheckIcon } from '../components/icons/Icon';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGrid } from '../components/ProductGrid';
import { StarRating } from '../components/StarRating';
import { QuantityInput } from '../components/ui/QuantityInput';
import { ShareButton } from '../components/ui/ShareButton';
import { useCart } from '../contexts/CartContext';
import { useRouter } from '../contexts/RouterContext';
import { useToast } from '../contexts/ToastContext';

interface ProductPageProps {
  product: Product;
  products: Product[];
}

const InfoBadge: React.FC<{ icon: React.ReactNode, title: string, subtitle: string }> = ({ icon, title, subtitle }) => (
    <div className="flex items-center text-sm text-text-secondary"><div className="mr-3 text-brand-secondary">{icon}</div><div><div className="font-semibold">{title}</div><div>{subtitle}</div></div></div>
);

const ProductPage: React.FC<ProductPageProps> = ({ product, products }) => {
  const [mainImage, setMainImage] = useState(product.image_url);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { onNavigate } = useRouter();
  const { showToast } = useToast();
  
  useEffect(() => {
    setMainImage(product.image_url);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);

  const handleAddToCart = () => {
      addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
      addToCart(product, quantity);
      onNavigate('/checkout');
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const breadcrumbCrumbs = [{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: product.name }];
  const discount = product.original_price && product.original_price > product.price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  return (
    <div className="pt-24 md:pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6"><Breadcrumbs crumbs={breadcrumbCrumbs} /></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div>
                    <div className="mb-4 rounded-xl overflow-hidden bg-white border border-gray-100 relative shadow-sm"><img src={mainImage} alt={product.name} className="w-full h-auto object-contain aspect-square" />{discount > 0 && <div className="absolute top-3 left-3 bg-brand-secondary text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">{discount}% OFF</div>}</div>
                    <div className="flex space-x-3 overflow-x-auto pb-2">{[product.image_url, ...product.images].filter((v, i, a) => a.indexOf(v) === i).map((img, index) => (<div key={index} className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${mainImage === img ? 'border-brand-primary' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setMainImage(img)}><img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-contain" /></div>))}</div>
                </div>
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold font-quicksand text-text-primary mb-3">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-4"><StarRating rating={product.rating} /><span className="text-sm text-gray-500">({product.reviews} reviews)</span></div>
                    <div className="flex items-baseline gap-4 mb-6"><span className="text-4xl font-bold text-brand-primary">₹{product.price}</span>{product.original_price && product.original_price > product.price && <span className="text-2xl text-gray-400 line-through">₹{product.original_price}</span>}</div>
                    <p className="text-text-secondary mb-6 leading-relaxed">{product.description}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <QuantityInput initialQuantity={quantity} onQuantityChange={setQuantity} maxQuantity={product.stock_quantity} />
                        <button onClick={handleAddToCart} disabled={!product.in_stock} className="w-full sm:w-auto text-center bg-brand-primary/10 border-2 border-brand-primary/20 text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-brand-primary hover:text-white transition-all active:scale-95 disabled:opacity-50">ADD TO CART</button>
                    </div>
                    <button onClick={handleBuyNow} disabled={!product.in_stock} className="w-full sm:w-auto bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all shadow-md active:scale-95 disabled:bg-gray-400">BUY NOW</button>
                    <div className="space-y-4 my-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <InfoBadge icon={<TruckIcon className="w-6 h-6"/>} title="Free Delivery" subtitle="For orders over ₹500"/>
                        <InfoBadge icon={<ShieldCheckIcon className="w-6 h-6"/>} title="7 Days" subtitle="Replacement Guarantee"/>
                    </div>
                    <ShareButton shareData={{ title: product.name, text: `Check out ${product.name}!`, url: window.location.href }} showToast={showToast}/>
                </div>
            </div>
            <div className="mt-24">
                <h2 className="text-3xl font-brand text-brand-primary text-center mb-12">Related Products</h2>
                <ProductGrid products={relatedProducts} />
            </div>
        </div>
    </div>
  );
};

export default ProductPage;
