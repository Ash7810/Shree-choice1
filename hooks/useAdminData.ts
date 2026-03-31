
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Order, Product, Brand, SupabaseProduct } from '../types';

export const useAdminData = () => {
    const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, pendingOrders: 0 });
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const [orderResult, productResult, brandResult] = await Promise.all([
            supabase.from('orders').select('*').order('created_at', { ascending: false }),
            supabase.from('products').select('*').order('id', { ascending: true }),
            supabase.from('brands').select('*').order('name', { ascending: true })
        ]);

        if (orderResult.data) {
            setOrders(orderResult.data as Order[]);
            const totalSales = orderResult.data.reduce((acc, curr) => acc + curr.total, 0);
            const pending = orderResult.data.filter(o => o.status === 'Processing').length;
            setStats({ totalSales, totalOrders: orderResult.data.length, pendingOrders: pending });
        }
        if (productResult.data) {
            const mappedProducts = productResult.data.map((p: SupabaseProduct) => ({
                ...p,
                image_url: p.image_url || p.image || '',
            })) as Product[];
            setProducts(mappedProducts);
        }
        if (brandResult.data) {
            setBrands(brandResult.data as Brand[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { stats, orders, products, brands, loading, setLoading, refreshData: fetchData };
};
