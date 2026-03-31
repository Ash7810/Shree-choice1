
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { SiteFooter } from './components/SiteFooter';
import { MobileNavBar } from './components/MobileNavBar';
import { RouterContext } from './contexts/RouterContext';

// Providers
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

// UI
import { FullScreenLoader } from './components/ui/FullScreenLoader';

// Types
import type { User } from '@supabase/supabase-js';
import type { Product, Brand, SupabaseProduct } from './types';
import { ALL_PRODUCTS } from './constants';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const Router: React.FC<{
    currentPath: string;
    products: Product[];
    brands: Brand[];
    user: User | null;
    isLoading: boolean;
}> = (props) => {
    const path = props.currentPath;

    if (path.startsWith('/admin')) {
        return <AdminPage user={props.user} />;
    }

    if (path.startsWith('/product/')) {
        const id = path.split('/')[2];
        const product = props.products.find(p => p.id === parseInt(id, 10));
        return product ? <ProductPage product={product} products={props.products} /> : <NotFoundPage />;
    }

    switch (path) {
        case '/': return <HomePage products={props.products} brands={props.brands} isLoading={props.isLoading} />;
        case '/shop': return <ShopPage products={props.products} brands={props.brands} isLoading={props.isLoading} />;
        case '/wishlist': return <WishlistPage products={props.products} isLoading={props.isLoading} />;
        case '/cart': return <CartPage />;
        case '/checkout': return <CheckoutPage user={props.user} />;
        case '/login': return <LoginPage />;
        case '/register': return <RegisterPage />;
        case '/profile': return props.user ? <ProfilePage user={props.user} /> : <LoginPage />;
        default: return <NotFoundPage />;
    }
};

const AppContent = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const { cartCount } = useCart();

    useEffect(() => {
        const onPopState = () => setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/');
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));

        const fetchData = async () => {
            setIsLoading(true);
            const [productResult, brandResult] = await Promise.all([supabase.from('products').select('*'), supabase.from('brands').select('*')]);
            if (productResult.error) { console.error('Error fetching products:', productResult.error); setProducts(ALL_PRODUCTS); } 
            else if (productResult.data) { setProducts(productResult.data.map((p: SupabaseProduct) => ({ ...p, image_url: p.image_url || p.image }))); }
            if (brandResult.error) console.error('Error fetching brands:', brandResult.error);
            else if (brandResult.data) setBrands(brandResult.data as Brand[]);
            setIsLoading(false);
        };
        fetchData();
        return () => subscription.unsubscribe();
    }, []);

    const onNavigate = (path: string) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path.split('?')[0].replace(/\/$/, '') || '/');
        window.scrollTo(0, 0);
    };
    
    const routerProps = { products, brands, user, isLoading };
    const isAppPage = !currentPath.startsWith('/admin');
    
    return (
        <RouterContext.Provider value={{ onNavigate }}>
            <div className="font-sans text-text-primary min-h-screen flex flex-col bg-[#F8FAFC] relative">
                {isAppPage && (
                    <>
                        <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        <Header currentPath={currentPath} user={user} />
                    </>
                )}

                <main className={`flex-grow relative ${isAppPage ? 'z-10' : ''}`}>
                    <Suspense fallback={<FullScreenLoader />}>
                        <Router currentPath={currentPath} {...routerProps} />
                    </Suspense>
                </main>

                {isAppPage && (
                    <>
                        <SiteFooter />
                        <MobileNavBar cartCount={cartCount} currentPath={currentPath} />
                    </>
                )}
            </div>
        </RouterContext.Provider>
    );
};

export default function App() {
    return (
        <ToastProvider>
            <WishlistProvider>
                <CartProvider>
                    <AppContent />
                </CartProvider>
            </WishlistProvider>
        </ToastProvider>
    );
}
