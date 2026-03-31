
import React from 'react';
import { ShieldCheckIcon, TruckIcon } from './icons/Icon';

const FeatureCard = React.memo<{ 
    title: string; 
    desc: string; 
    icon: React.ReactNode; 
    bgClass: string; 
    iconBgClass: string;
    iconColor: string;
}>(({ title, desc, icon, bgClass, iconBgClass, iconColor }) => (
    <div className={`${bgClass} rounded-[2rem] p-8 border-2 border-white shadow-sm flex flex-col items-start h-full transition-transform hover:-translate-y-2`}>
        <div className={`${iconBgClass} ${iconColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-5`}>
            {icon}
        </div>
        <h3 className={`font-brand text-xl ${iconColor} mb-3`}>{title}</h3>
        <p className="text-sm text-slate-600 font-bold leading-relaxed opacity-80">{desc}</p>
    </div>
));

// Custom Star Icon for "Fun & Educational"
const MagicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
    </svg>
);

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-brand text-slate-800 mb-4">Why Choose Us?</h2>
                <p className="text-slate-500 font-medium max-w-lg mx-auto">At ShreeChoice Playworld, we're dedicated to offering the best toys for your little ones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard 
                    title="Safe & Quality" 
                    desc="Non-toxic, child-safe materials."
                    icon={<ShieldCheckIcon className="w-7 h-7" />}
                    bgClass="bg-[#E0F2F1]" // Soft Teal
                    iconBgClass="bg-[#B2DFDB]"
                    iconColor="text-[#00695C]"
                />
                <FeatureCard 
                    title="Fun & Learning" 
                    desc="Boosts creativity and development."
                    icon={<MagicIcon />}
                    bgClass="bg-[#E1F5FE]" // Soft Blue
                    iconBgClass="bg-[#B3E5FC]"
                    iconColor="text-[#0277BD]"
                />
                <FeatureCard 
                    title="Fast Shipping" 
                    desc="Free shipping on orders over ₹500!"
                    icon={<TruckIcon className="w-7 h-7" />}
                    bgClass="bg-[#FFF3E0]" // Soft Orange
                    iconBgClass="bg-[#FFE0B2]"
                    iconColor="text-[#EF6C00]"
                />
                <FeatureCard 
                    title="Friendly Support" 
                    desc="Here to help with anything you need."
                    icon={<SupportIcon />}
                    bgClass="bg-[#F3E5F5]" // Soft Purple
                    iconBgClass="bg-[#E1BEE7]"
                    iconColor="text-[#8E24AA]"
                />
            </div>
        </div>
    </section>
  );
};