
import React from 'react';
import type { User } from '@supabase/supabase-js';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminPageProps {
    user: User | null;
}

const AdminPage: React.FC<AdminPageProps> = ({ user }) => {
    const isAdmin = user && user.email === 'admin@shreechoice.com';

    if (!isAdmin) {
        return <AdminLogin />;
    }

    return <AdminDashboard />;
};

export default AdminPage;
