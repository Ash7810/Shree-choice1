
import React from 'react';
import { HomeIcon, GridIcon, ShoppingCartIcon, UserIcon } from './icons/Icon';
import { motion } from 'framer-motion';
import { Link } from '../lib/router';

interface MobileNavBarProps {
    cartCount: number;
    currentPath: string;
}

const NavItem: React.FC<{ 
    icon: React.ReactNode; 
    label: string; 
    href: string;
    isActive: boolean;
    badge?: number;
}> = ({ icon, label, href, isActive, badge }) => {
    return (
        <Link href={href} className="flex flex-col items-center justify-end w-full h-full pb-3 relative transition-colors focus:outline-none group">
            <div className="relative flex flex-col items-center justify-center gap-1">
                 {isActive && (
                    <motion.div
                        layoutId="activeMobileTab"
                        className="absolute -top-1.5 w-12 h-8 bg-brand-primary/10 rounded-2xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                 )}
                
                <div className="relative z-10">
                    {React.cloneElement(icon as React.ReactElement<{ className?: string, strokeWidth?: string }>, { 
                        className: `w-6 h-6 transition-all duration-300 ${isActive ? 'text-brand-primary' : 'text-slate-400 group-hover:text-slate-600'}`,
                        strokeWidth: isActive ? "2.5" : "2"
                    })}
                    {badge !== undefined && badge > 0 ? (
                        <span className="absolute -top-1.5 -right-2 bg-brand-secondary text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            {badge}
                        </span>
                    ) : null}
                </div>
                <span className={`text-[10px] font-bold tracking-wide z-10 transition-colors duration-300 ${isActive ? 'text-brand-primary translate-y-0' : 'text-slate-500'}`}>
                    {label}
                </span>
            </div>
        </Link>
    );
};

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ cartCount, currentPath }) => {
    const isPathActive = (paths: string[]) => paths.some(path => currentPath.startsWith(path) && (currentPath === path || path !== '/'));

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-100 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] pb-safe rounded-t-2xl">
            <div className="flex justify-around items-end h-[70px]">
                <NavItem icon={<HomeIcon />} label="Home" href="/" isActive={currentPath === '/'} />
                <NavItem icon={<GridIcon />} label="Shop" href="/shop" isActive={isPathActive(['/shop', '/product'])} />
                <NavItem icon={<ShoppingCartIcon />} label="Cart" href="/cart" isActive={isPathActive(['/cart', '/checkout'])} badge={cartCount} />
                <NavItem icon={<UserIcon />} label="Account" href="/profile" isActive={isPathActive(['/profile', '/login', '/register'])} />
            </div>
        </div>
    );
};
