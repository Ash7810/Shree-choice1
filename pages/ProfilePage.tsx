
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Order, Address } from '../types';
import type { User } from '@supabase/supabase-js';
import { useRouter } from '../contexts/RouterContext';
import { useToast } from '../contexts/ToastContext';
import { XIcon } from '../components/icons/Icon';

interface ProfilePageProps { user: User; }

const TabButton: React.FC<{label: string; isActive: boolean; onClick: () => void;}> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-bold rounded-t-lg border-b-2 transition-all ${isActive ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800'}`}>{label}</button>
);

const AddressModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (data: Partial<Address>) => Promise<void>; address: Partial<Address> | null; error: string | null; }> = ({ isOpen, onClose, onSave, address, error }) => {
    const [formData, setFormData] = useState<Partial<Address> | null>(address);
    useEffect(() => { setFormData(address); }, [address]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    };
    
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl animate-bounce-in">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-slate-800">{formData.id ? 'Edit Address' : 'Add New Address'}</h2><button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"><XIcon className="w-5 h-5 text-slate-500"/></button></div>
                {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm font-bold">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input name="full_name" placeholder="Full Name *" value={formData.full_name || ''} className="clay-input" onChange={handleChange} />
                    <input name="phone" placeholder="Phone Number *" value={formData.phone || ''} className="clay-input" onChange={handleChange} />
                    <input name="street" placeholder="Street Address *" value={formData.street || ''} className="clay-input md:col-span-2" onChange={handleChange} />
                    <input name="city" placeholder="City *" value={formData.city || ''} className="clay-input" onChange={handleChange} />
                    <input name="zip_code" placeholder="ZIP Code *" value={formData.zip_code || ''} className="clay-input" onChange={handleChange} />
                    <input name="state" placeholder="State *" value={formData.state || ''} className="clay-input" onChange={handleChange} />
                    <input name="country" placeholder="Country" value={formData.country || 'India'} className="clay-input" onChange={handleChange} />
                </div>
                <div className="flex gap-3 justify-end"><button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold">Cancel</button><button onClick={() => onSave(formData)} className="px-6 py-2 bg-brand-secondary text-white font-bold rounded-lg shadow">Save Address</button></div>
            </div>
        </div>
    );
};

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Partial<Address> | null>(null);
    const { onNavigate } = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        if (activeTab === 'orders') fetchOrders();
        if (activeTab === 'addresses') fetchAddresses();
    }, [activeTab]);

    const handleLogout = async () => { await supabase.auth.signOut(); onNavigate('/'); showToast('Logged out successfully'); };
    const fetchOrders = async () => { setLoading(true); const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); if (data) setOrders(data); setLoading(false); };
    const fetchAddresses = async () => { setLoading(true); const { data } = await supabase.from('addresses').select('*'); if (data) setAddresses(data); setLoading(false); };
    
    const openAddressModal = (address: Partial<Address> | null) => {
        setCurrentAddress(address || { country: 'India' });
        setAddressModalOpen(true);
    };
    
    const closeAddressModal = () => { setAddressModalOpen(false); setCurrentAddress(null); setAddressError(null); };

    const handleSaveAddress = async (formData: Partial<Address>) => {
        if (!formData.full_name || !formData.street || !formData.city || !formData.zip_code) { setAddressError('Please fill all required fields.'); return; }
        setAddressError(null);
        const { id, ...updateData } = { ...formData, user_id: user.id };
        const promise = id ? supabase.from('addresses').update(updateData).eq('id', id) : supabase.from('addresses').insert([updateData]);
        const { error } = await promise;
        if (error) { setAddressError(error.message); } else { closeAddressModal(); fetchAddresses(); showToast('Address saved successfully!'); }
    };

    const handleDeleteAddress = async (id: string) => { if (window.confirm("Are you sure?")) { await supabase.from('addresses').delete().eq('id', id); fetchAddresses(); showToast('Address deleted.'); } };
    
    return (
        <div className="pt-24 pb-12 min-h-screen bg-gray-50">
             <AddressModal isOpen={addressModalOpen} onClose={closeAddressModal} onSave={handleSaveAddress} address={currentAddress} error={addressError} />
            <div className="container mx-auto px-4 lg:px-8"><div className="max-w-4xl mx-auto"><div className="clay-panel p-6 mb-6"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-brand-primary text-2xl font-bold flex-shrink-0">{user.email?.charAt(0).toUpperCase()}</div><div className="overflow-hidden"><h2 className="font-bold text-lg sm:text-xl truncate">{user.user_metadata?.full_name || 'Valued Customer'}</h2><p className="text-sm text-gray-500 truncate">{user.email}</p></div></div></div><div className="bg-white rounded-t-2xl shadow-sm border border-b-0 border-gray-200 px-4"><nav className="flex space-x-2 sm:space-x-4"><TabButton label="My Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} /><TabButton label="My Orders" isActive={activeTab === 'orders'} onClick={() => setActiveTab('orders')} /><TabButton label="My Addresses" isActive={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')} /></nav></div><div className="clay-panel p-6 md:p-8 min-h-[400px] rounded-t-none">{activeTab === 'profile' && <div><h2 className="text-2xl font-brand text-brand-primary mb-6">Profile Details</h2><div className="space-y-4"><div><label className="block text-sm font-bold text-gray-500">Full Name</label><div className="text-lg font-bold text-gray-800">{user.user_metadata?.full_name || '-'}</div></div><div><label className="block text-sm font-bold text-gray-500">Email Address</label><div className="text-lg font-bold text-gray-800">{user.email}</div></div><div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mt-8">To change your password or update your details, please contact support.</div></div></div>}{activeTab === 'orders' && <div><h2 className="text-2xl font-brand text-brand-primary mb-6">Order History</h2>{loading ? <p>Loading...</p> : orders.length === 0 ? <p className="text-gray-500">No orders found.</p> : <div className="space-y-4">{orders.map(order => <div key={order.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:bg-white transition-colors"><div className="flex flex-wrap justify-between items-center mb-4 pb-2 border-b border-gray-200 gap-2"><div><div className="text-xs text-gray-500 font-bold uppercase">Order ID</div><div className="font-mono text-sm">#{order.id.slice(0, 8)}</div></div><div><div className="text-xs text-gray-500 font-bold uppercase">Date</div><div className="text-sm font-bold">{new Date(order.created_at).toLocaleDateString()}</div></div><div><div className="text-xs text-gray-500 font-bold uppercase">Total</div><div className="text-sm font-bold">₹{order.total}</div></div><div><span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span></div></div><div className="space-y-2">{order.items.map((item: any, idx: number) => <div key={idx} className="flex items-center gap-4"><img src={item.image_url} alt={item.name} className="w-12 h-12 rounded object-cover border" /><div className="flex-1"><div className="text-sm font-bold text-gray-800">{item.name}</div><div className="text-xs text-gray-500">Qty: {item.quantity}</div></div><div className="text-sm font-bold">₹{item.price}</div></div>)}</div></div>)}</div>}</div>}{activeTab === 'addresses' && <div><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-brand text-brand-primary">My Addresses</h2><button onClick={() => openAddressModal(null)} className="text-sm font-bold bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">+ Add New</button></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{loading ? <p>Loading...</p> : addresses.map(addr => <div key={addr.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow relative group"><h3 className="font-bold text-gray-800">{addr.full_name}</h3><p className="text-sm text-gray-600 mt-1">{addr.street}</p><p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.zip_code}</p><p className="text-sm text-gray-600">{addr.country}</p><p className="text-sm text-gray-600 mt-2 font-mono">Phone: {addr.phone}</p><div className="mt-4 flex gap-3 text-sm font-bold"><button onClick={() => openAddressModal(addr)} className="text-brand-primary hover:underline">Edit</button><button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:underline">Delete</button></div></div>)}{addresses.length === 0 && !loading && <p className="text-gray-500 col-span-2 text-center py-8">No addresses saved yet.</p>}</div></div>}</div><div className="mt-8 flex justify-center"><button onClick={handleLogout} className="font-bold text-red-500 hover:bg-red-50 px-6 py-3 rounded-lg transition-colors">Logout</button></div></div></div>
        </div>
    );
};

export default ProfilePage;
