
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { Product, CartItem } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast } = useToast();
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('shreechoice-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to parse cart from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('shreechoice-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantityToAdd: number = 1) => {
        const existingItem = cart.find(item => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        
        if (!product.in_stock || currentQuantity + quantityToAdd > product.stock_quantity) {
            showToast(`Sorry, only ${product.stock_quantity} of "${product.name}" are in stock.`);
            return;
        }

        setCart(prevCart => {
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: quantityToAdd }];
        });

        showToast(`${quantityToAdd > 1 ? `${quantityToAdd}x ` : ''}${product.name} added to cart!`);
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        showToast('Item removed from cart');
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            return removeFromCart(productId);
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
