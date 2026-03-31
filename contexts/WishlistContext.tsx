
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useToast } from './ToastContext';

interface WishlistContextType {
    wishlist: number[];
    toggleWishlist: (productId: number) => void;
    isWishlisted: (productId: number) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast } = useToast();
    const [wishlist, setWishlist] = useState<number[]>(() => {
        try {
            const savedWishlist = localStorage.getItem('shreechoice-wishlist');
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        } catch (error) {
            console.error('Failed to parse wishlist from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('shreechoice-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (productId: number) => {
        setWishlist(prevWishlist => {
            const isAdding = !prevWishlist.includes(productId);
            showToast(isAdding ? 'Added to wishlist!' : 'Removed from wishlist');
            return isAdding
                ? [...prevWishlist, productId]
                : prevWishlist.filter(id => id !== productId);
        });
    };
    
    const isWishlisted = (productId: number) => wishlist.includes(productId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, wishlistCount: wishlist.length }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
