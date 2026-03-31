
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from '../lib/router';
import { useRouter } from '../contexts/RouterContext';
import { useToast } from '../contexts/ToastContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { onNavigate } = useRouter();
    const { showToast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            showToast('Logged in successfully!');
            onNavigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 clay-panel p-8">
                <div className="text-center"><h2 className="text-3xl font-brand text-brand-primary">Welcome Back!</h2><p className="mt-2 text-sm text-gray-600">Sign in to access your orders and wishlist</p></div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div><label className="text-sm font-bold text-gray-700">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all mt-1" placeholder="name@example.com" /></div>
                        <div><label className="text-sm font-bold text-gray-700">Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all mt-1" placeholder="••••••••" /></div>
                    </div>
                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary clay-btn disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
                    <div className="text-center text-sm"><span className="text-gray-500">Don't have an account? </span><Link href="/register" className="font-bold text-brand-secondary hover:underline">Register</Link></div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
