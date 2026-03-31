
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Order, Product, Brand } from '../../types';
import { GridIcon, ShoppingCartIcon, PackageIcon, PlusIcon, StarIcon, BuildingStorefrontIcon, LogOutIcon } from '../../components/icons/Icon';
import { OrderDetailsModal } from '../../components/Admin/OrderDetailsModal';
import { BrandManagement } from '../../components/Admin/BrandManagement';
import { FeaturedManagement } from '../../components/Admin/FeaturedManagement';
import { Logo } from '../../components/Logo';
import { ProductModal } from '../../components/Admin/ProductModal';
import { useAdminData } from '../../hooks/useAdminData';
import { useRouter } from '../../contexts/RouterContext';
import { useToast } from '../../contexts/ToastContext';

type AdminView = 'overview' | 'orders' | 'products' | 'brands' | 'featured';

export const AdminDashboard: React.FC = () => {
    const [view, setView] = useState<AdminView>('overview');
    const [user, setUser] = useState<any>(null);
    const { onNavigate } = useRouter();
    const { showToast } = useToast();

    const { stats, orders, products, brands, loading, setLoading, refreshData } = useAdminData();
    
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [currentTargetProduct, setCurrentTargetProduct] = useState<Partial<Product> | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user && user.email === 'admin@shreechoice.com') {
                setUser(user);
            } else {
                onNavigate('/admin');
            }
        });
    }, [onNavigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        onNavigate('/');
        showToast('Logged out successfully.');
    };

    const updateOrderStatus = async (id: string, status: any) => {
        await supabase.from('orders').update({ status }).eq('id', id);
        refreshData();
    };

    const handleEditProduct = (product: Product) => {
        setCurrentTargetProduct(product);
        setProductModalOpen(true);
    };

    const handleAddProduct = () => {
        setCurrentTargetProduct({
            name: '', price: 0, original_price: 0, category: 'Toys', in_stock: true, image_url: '', description: '',
            images: [], tags: [], age_group: '1-3y', brand: brands[0]?.name || '', rating: 4.5, reviews: 0, stock_quantity: 0
        });
        setProductModalOpen(true);
    };

    const handleCloseModal = () => {
        setProductModalOpen(false);
        setCurrentTargetProduct(null);
    };

    const handleSaveProduct = async (productData: Partial<Product>) => {
        if (!productData.name || !productData.price) {
            alert("Name and Price are required.");
            return;
        }
        setLoading(true);

        const promise = productData.id 
            ? supabase.from('products').update(productData).eq('id', productData.id)
            : supabase.from('products').insert([productData]);

        const { error } = await promise;
        if (error) {
            alert(error.message);
        } else {
            await refreshData();
            handleCloseModal();
        }
        setLoading(false);
    };

    const handleDeleteProduct = async (productId: number) => {
        if (window.confirm("Are you sure you want to delete this product permanently?")) {
            setLoading(true);
            await supabase.from('products').delete().eq('id', productId);
            await refreshData();
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100 font-sans">
            <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col">
                <div className="p-6 border-b border-slate-200"><Logo className="h-10 w-auto" /></div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavItem icon={<GridIcon/>} label="Dashboard" active={view === 'overview'} onClick={() => setView('overview')} />
                    <NavItem icon={<ShoppingCartIcon/>} label="Orders" active={view === 'orders'} onClick={() => setView('orders')} />
                    <NavItem icon={<PackageIcon/>} label="Products" active={view === 'products'} onClick={() => setView('products')} />
                    <NavItem icon={<BuildingStorefrontIcon/>} label="Brands" active={view === 'brands'} onClick={() => setView('brands')} />
                    <NavItem icon={<StarIcon/>} label="Featured" active={view === 'featured'} onClick={() => setView('featured')} />
                </nav>
                <div className="p-4 border-t border-slate-200">
                    <button onClick={handleLogout} className="w-full text-left text-slate-500 hover:text-red-500 text-sm font-bold p-3 hover:bg-red-50 rounded-lg transition-colors">Logout</button>
                </div>
            </aside>

            <main className="flex-1 p-4 sm:p-8 overflow-y-auto pb-24 md:pb-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 capitalize">{view.replace('-', ' ')}</h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="font-bold text-slate-700 text-sm">{user?.user_metadata?.full_name || user?.email}</div>
                            <div className="text-xs text-slate-500">Administrator</div>
                        </div>
                        <div className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <button onClick={handleLogout} className="md:hidden p-2 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <LogOutIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </header>

                {view === 'overview' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Total Sales" value={`₹${stats.totalSales.toLocaleString()}`} icon={<div className="w-12 h-12 rounded-full bg-blue-100 text-brand-primary flex items-center justify-center"><ShoppingCartIcon/></div>} />
                    <StatCard title="Total Orders" value={stats.totalOrders.toString()} icon={<div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><PackageIcon/></div>} />
                    <StatCard title="Pending Orders" value={stats.pendingOrders.toString()} icon={<div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><StarIcon/></div>} />
                </div>}

                {view === 'orders' && <div>
                    {/* Mobile Order Cards */}
                    <div className="md:hidden space-y-3">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border p-4 text-sm">
                                <div className="flex justify-between items-start pb-2 mb-2 border-b">
                                    <div>
                                        <div className="font-bold text-slate-800">{order.shipping_address.full_name}</div>
                                        <div className="text-xs text-slate-500 font-mono">#{order.id.slice(0, 8)}</div>
                                    </div>
                                    <div className="font-bold text-brand-primary">₹{order.total}</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className={`w-1/2 p-2 rounded-lg text-xs font-bold border-2 appearance-none ${ order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700 border-red-200' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200' }`} ><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select>
                                    <button onClick={() => setSelectedOrder(order)} className="text-brand-primary hover:underline font-bold text-xs">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop Order Table */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto"><table className="w-full text-left min-w-[800px]"><thead className="bg-slate-50 text-slate-500 text-xs uppercase"><tr className="border-b border-slate-200"><th className="p-4 font-semibold">Order ID</th><th className="p-4 font-semibold">Customer</th><th className="p-4 font-semibold">Date</th><th className="p-4 font-semibold">Total</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Actions</th></tr></thead><tbody>{orders.map(order => (<tr key={order.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 text-sm"><td className="p-4 font-mono text-slate-500">#{order.id.slice(0,8)}</td><td className="p-4 font-bold text-slate-700">{order.shipping_address.full_name}</td><td className="p-4 text-slate-600">{new Date(order.created_at).toLocaleDateString()}</td><td className="p-4 font-bold text-slate-700">₹{order.total}</td><td className="p-4"><select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className={`w-full p-2 rounded-lg text-xs font-bold border-2 appearance-none ${ order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700 border-red-200' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200' }`} ><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></td><td className="p-4"><button onClick={() => setSelectedOrder(order)} className="text-brand-primary hover:underline font-bold">View Details</button></td></tr>))}</tbody></table></div>
                </div>}

                {view === 'products' && <div>
                    <div className="flex justify-end mb-6"><button onClick={handleAddProduct} className="bg-brand-primary text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-opacity-90 shadow-lg shadow-brand-primary/20"><PlusIcon className="w-4 h-4"/> Add Product</button></div>
                     {/* Mobile Product Cards */}
                     <div className="md:hidden space-y-3">
                         {products.map(product => (
                             <div key={product.id} className="bg-white rounded-xl shadow-sm border p-3 flex gap-3">
                                <img src={product.image_url} className="w-16 h-16 rounded-lg object-cover border flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-800 text-sm truncate">{product.name}</p>
                                    <p className="font-bold text-brand-primary text-sm mt-1">₹{product.price}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
                                        <div className="space-x-3">
                                            <button onClick={() => handleEditProduct(product)} className="text-brand-primary hover:underline font-bold text-xs">EDIT</button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:underline font-bold text-xs">DELETE</button>
                                        </div>
                                    </div>
                                </div>
                             </div>
                         ))}
                     </div>
                    {/* Desktop Product Table */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto"><table className="w-full text-left min-w-[800px]"><thead className="bg-slate-50 text-slate-500 text-xs uppercase"><tr className="border-b border-slate-200"><th className="p-4 font-semibold">ID</th><th className="p-4 font-semibold">Image</th><th className="p-4 font-semibold">Name</th><th className="p-4 font-semibold">Price</th><th className="p-4 font-semibold">Stock Qty</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Actions</th></tr></thead><tbody>{products.map(product => (<tr key={product.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 text-sm"><td className="p-4 font-mono text-slate-500">{product.id}</td><td className="p-4"><img src={product.image_url} className="w-12 h-12 rounded-lg object-cover border"/></td><td className="p-4 font-bold text-slate-700">{product.name}</td><td className="p-4 font-bold text-slate-700">₹{product.price}</td><td className="p-4 font-bold text-slate-700">{product.stock_quantity}</td><td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.in_stock ? 'In Stock' : 'Out of Stock'}</span></td><td className="p-4 space-x-4"><button onClick={() => handleEditProduct(product)} className="text-brand-primary hover:underline font-bold">Edit</button><button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:underline font-bold">Delete</button></td></tr>))}</tbody></table></div>
                </div>}

                {view === 'brands' && <BrandManagement brands={brands} onDataChange={refreshData} />}
                {view === 'featured' && <FeaturedManagement products={products} onDataChange={refreshData} />}
                
                {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
                <ProductModal isOpen={productModalOpen} onClose={handleCloseModal} product={currentTargetProduct} brands={brands} onSave={handleSaveProduct} />
            </main>
        </div>
    );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = React.memo(({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-bold transition-colors text-sm ${active ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}>
        {icon} {label}
    </button>
));

const StatCard: React.FC<{title: string; value: string; icon: React.ReactNode}> = React.memo(({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6">
        {icon}
        <div>
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">{title}</div>
            <div className="text-3xl font-bold text-slate-800">{value}</div>
        </div>
    </div>
));
