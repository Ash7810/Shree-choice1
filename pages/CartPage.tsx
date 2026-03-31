
import React from 'react';
import { TrashIcon } from '../components/icons/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { QuantityInput } from '../components/ui/QuantityInput';
import { PageHeader } from '../components/ui/PageHeader';
import { useCart } from '../contexts/CartContext';
import { useRouter } from '../contexts/RouterContext';

const CartPage: React.FC = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal; // Assuming free shipping
    const { onNavigate } = useRouter();

    return (
        <div className="bg-transparent pt-24 md:pt-32 pb-12 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader title="Shopping Cart" />
                {cart.length === 0 ? (
                    <div className="clay-panel p-12 text-center"><h2 className="text-xl font-semibold mb-4 text-brand-primary">Your cart is currently empty.</h2><button onClick={() => onNavigate('/shop')} className="bg-brand-primary text-white px-6 py-2 rounded font-bold clay-btn">Return to Shop</button></div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3">
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {cart.map(item => (
                                        <motion.div key={item.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }} className="clay-panel p-4 flex items-start gap-4">
                                            <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-brand-primary text-base leading-tight">{item.name}</h3>
                                                <p className="text-sm text-text-secondary mt-1">₹{item.price}</p>
                                                <div className="mt-3"><QuantityInput initialQuantity={item.quantity} onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)} maxQuantity={item.stock_quantity}/></div>
                                            </div>
                                            <div className="flex flex-col items-end justify-between h-full">
                                                <p className="font-bold text-brand-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 mt-auto" aria-label={`Remove ${item.name} from cart`}><TrashIcon className="w-5 h-5"/></button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3">
                            <div className="clay-panel p-6 sticky top-28">
                                <h2 className="text-xl font-bold font-quicksand mb-4 border-b pb-2">CART TOTALS</h2>
                                <div className="flex justify-between py-3 border-b text-sm"><span className="text-text-secondary">Subtotal</span><span className="font-semibold">₹{subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between py-4 text-xl font-bold"><span>Total</span><span className="text-brand-primary">₹{total.toFixed(2)}</span></div>
                                <button onClick={() => onNavigate('/checkout')} className="w-full bg-brand-secondary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors mt-2 clay-btn">PROCEED TO CHECKOUT</button>
                                <p className="text-xs text-center text-gray-400 mt-4">Free shipping on all orders</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
