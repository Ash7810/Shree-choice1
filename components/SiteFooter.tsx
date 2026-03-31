import React from 'react';
import { InstagramIcon, FacebookIcon, MapPinIcon, MailIcon, PhoneIcon } from './icons/Icon';
import { Logo } from './Logo';
import { Link } from '../lib/router';

// FIX: Export the SiteFooter component so it can be imported in other files.
export const SiteFooter: React.FC = () => {
    const waveColor = '#F8FAFC'; // Default app background color
    const footerBgClass = "bg-[#103059]"; 

    return (
        <footer className="relative mt-0">
            <div className={`relative w-full overflow-hidden leading-[0] ${footerBgClass}`}>
                <svg className="relative block w-full h-[50px] sm:h-[80px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={waveColor}></path>
                </svg>
            </div>
            <div className={`${footerBgClass} text-white pb-24 md:pb-12 pt-4`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="bg-white p-3 rounded-xl mb-6 shadow-md inline-block"><Logo className="h-8 w-auto" /></div>
                            <p className="text-blue-100 text-sm leading-relaxed font-medium mb-6">Sparking joy and imagination in every child. We are dedicated to providing safe, educational, and fun toys for the little ones you love.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-play-yellow hover:text-[#103059] transition-all duration-300"><InstagramIcon className="w-5 h-5"/></a>
                                <a href="#" className="flex w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-play-yellow hover:text-[#103059] transition-all duration-300"><FacebookIcon className="w-5 h-5"/></a>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold font-quicksand mb-6 text-play-yellow">Shop Toys</h3>
                            <ul className="space-y-3">
                                {['Arts & Crafts', 'Toys', 'Soft Toys', 'Puzzles'].map((item) => (
                                    <li key={item}><Link href={`/shop?category=${encodeURIComponent(item)}`} className="text-blue-100 hover:text-white hover:translate-x-1 transition-transform duration-200 text-sm font-medium block">{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold font-quicksand mb-6 text-play-yellow">Support</h3>
                             <ul className="space-y-3">
                                {['Track Order', 'Shipping Policy', 'Returns & Refunds', 'Terms of Service'].map((item) => (
                                    <li key={item}><a href="#" className="text-blue-100 hover:text-white hover:translate-x-1 transition-transform duration-200 text-sm font-medium block">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold font-quicksand mb-6 text-play-yellow">Contact Us</h3>
                            <div className="space-y-5">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-3"><div className="mt-1 text-play-yellow flex-shrink-0"><MapPinIcon className="w-5 h-5" /></div><p className="text-blue-100 text-sm leading-relaxed">Shop No. 17, Devraj CHS,<br/>S V Road, Goregaon West,<br/>Mumbai - 400062</p></div>
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-3"><div className="mt-1 text-play-yellow flex-shrink-0"><MailIcon className="w-5 h-5" /></div><a href="mailto:info@shreechoice.in" className="text-blue-100 hover:text-white text-sm font-bold transition-colors">info@shreechoice.in</a></div>
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-3"><div className="mt-1 text-play-yellow flex-shrink-0"><PhoneIcon className="w-5 h-5" /></div><a href="tel:+918668543498" className="text-blue-100 hover:text-white text-sm font-bold transition-colors">+91 86685 43498</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200">
                        <p>© {new Date().getFullYear()} Shree Choice Playworld. All Rights Reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="/admin" className="hover:text-white transition-colors" title="Admin Login"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></Link>
                            <span>Privacy Policy</span>
                            <span>Sitemap</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};