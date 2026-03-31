
import React, { useState, useEffect, useContext } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, SearchIcon, HeartIcon, XIcon } from './icons/Icon';
import { Logo } from './Logo';
import { Link } from '../lib/router';
import type { User } from '@supabase/supabase-js';
import { RouterContext } from '../contexts/RouterContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface HeaderProps {
  user: User | null;
  currentPath: string;
}

const SearchOverlay: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const router = useContext(RouterContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            router?.onNavigate(`/shop?q=${encodeURIComponent(inputValue.trim())}`);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
                        <motion.button initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }} onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white">
                            <XIcon className="w-8 h-8" />
                        </motion.button>
                        <motion.form initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }} onSubmit={handleSubmit} className="w-full max-w-2xl">
                            <div className="relative">
                                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Search for toys, brands, and more..." className="w-full bg-white text-slate-800 text-lg font-bold py-5 pl-16 pr-6 rounded-full shadow-2xl border-2 border-transparent focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 outline-none" autoFocus />
                            </div>
                            <p className="text-center text-white/60 text-sm mt-4">Press Enter to search</p>
                        </motion.form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const Header: React.FC<HeaderProps> = ({ user, currentPath }) => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY;
    if (diff > 0 && latest > 100) setIsHidden(true);
    else if (diff < 0) setIsHidden(false);
    setLastY(latest);
  });

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <motion.nav variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }} animate={isHidden ? "hidden" : "visible"} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-90"><Logo className="h-10 w-auto object-contain" /></Link>
                <div className="hidden md:flex items-center justify-center space-x-12 flex-1 px-8">
                    <NavButton href="/" label="Home" currentPath={currentPath} />
                    <NavButton href="/shop" label="Shop Toys" currentPath={currentPath} />
                    <NavButton href="/#contact-form" label="Contact" currentPath={currentPath} />
                </div>
                <div className="flex items-center gap-4">
                    <IconButton onClick={() => setIsSearchOpen(true)} title="Search"><SearchIcon className="w-5 h-5 text-slate-600" /></IconButton>
                    <div className="relative hidden sm:block">
                        <Link href="/wishlist"><IconButton title="Wishlist"><HeartIcon className="w-5 h-5 text-slate-600 hover:text-red-500 transition-colors" /></IconButton></Link>
                        {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">{wishlistCount}</span>}
                    </div>
                    <div className="relative">
                        <Link href="/cart"><IconButton title="Cart"><ShoppingCartIcon className="w-5 h-5 text-slate-600 hover:text-brand-primary transition-colors" /></IconButton></Link>
                        {cartCount > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount} className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">{cartCount}</motion.span>}
                    </div>
                    {user ? (
                        <Link href="/profile" className="hidden sm:flex items-center gap-2 ml-2 bg-blue-50 text-brand-primary text-sm font-bold px-4 py-2 rounded-full hover:bg-blue-100 transition-all border border-blue-100">
                            <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs">{user.email?.charAt(0).toUpperCase()}</div>
                            <span className="max-w-[100px] truncate">{user.user_metadata?.full_name?.split(' ')[0] || 'Account'}</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="hidden sm:block ml-2 bg-brand-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-all shadow-md active:scale-95">Sign In</Link>
                    )}
                </div>
            </div>
        </div>
      </motion.nav>
    </>
  );
};

const NavButton = ({ href, label, currentPath }: { href: string, label: string, currentPath: string }) => {
    const normalizedHref = href.split('#')[0] || '/';
    const isActive = currentPath === normalizedHref;
    
    return (
        <Link href={href} className={`font-sans font-bold text-sm transition-all relative py-2 ${isActive ? 'text-brand-primary' : 'text-slate-500 hover:text-brand-primary'}`}>
            {label}
            {isActive && <motion.span layoutId="activeDesktopTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-full" />}
        </Link>
    );
};

const IconButton: React.FC<{onClick?: () => void; children: React.ReactNode; title?: string}> = React.forwardRef(({ onClick, children, title }, ref: React.Ref<HTMLButtonElement>) => (
    <button ref={ref} onClick={onClick} title={title} className="w-10 h-10 rounded-full bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 flex items-center justify-center transition-all">
        {children}
    </button>
));