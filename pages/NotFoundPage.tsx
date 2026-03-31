

import React from 'react';
import { Link } from '../lib/router';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
            <div className="clay-panel p-12">
                <div className="text-7xl font-bold text-brand-secondary">404</div>
                <h1 className="text-3xl font-brand text-brand-primary mt-4">Page Not Found</h1>
                <p className="mt-2 text-gray-600">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link href="/" className="mt-8 inline-block bg-brand-primary text-white px-8 py-3 rounded-xl font-bold clay-btn">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
