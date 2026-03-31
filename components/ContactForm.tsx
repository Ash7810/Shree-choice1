
import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export const ContactForm: React.FC = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        showToast("Thanks for your message! We'll be in touch soon.");
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
    };

    return (
        <section id="contact-form" className="py-16 md:py-24 bg-[#FFFDE7]"> {/* Soft Yellow Background */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl border-4 border-white relative overflow-hidden">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 opacity-50 md:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 opacity-50 md:opacity-100"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-brand text-brand-secondary mb-3 md:mb-4 leading-tight">
                                Need help or <br/> have questions?
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-brand text-play-yellow mb-4 md:mb-6">
                                We're here for you!
                            </h3>
                            <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed font-medium text-sm md:text-base">
                                Have questions or need assistance? Our friendly team is here to help! Reach out to us through the contact form, email, or give us a call.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="bg-orange-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-orange-100 transform rotate-2">
                                    <div className="text-3xl md:text-4xl mb-2">🐻</div>
                                    <div className="font-bold text-orange-800 text-sm md:text-base">Friendly Support</div>
                                </div>
                                <div className="bg-blue-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-blue-100 transform -rotate-2 mt-2 md:mt-4">
                                    <div className="text-3xl md:text-4xl mb-2">📧</div>
                                    <div className="font-bold text-blue-800 text-sm md:text-base">Quick Response</div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 bg-white/80 backdrop-blur-sm p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm">
                            <input name="name" type="text" placeholder="Name*" required value={formData.name} onChange={handleChange} className="w-full clay-input"/>
                            <input name="email" type="email" placeholder="Your Email*" required value={formData.email} onChange={handleChange} className="w-full clay-input"/>
                            <input name="phone" type="tel" placeholder="Your Number*" required value={formData.phone} onChange={handleChange} className="w-full clay-input"/>
                            <textarea name="message" placeholder="Write your message" required value={formData.message} onChange={handleChange} rows={4} className="w-full clay-input resize-none"></textarea>
                            <button type="submit" className="w-full bg-[#8D6E63] text-white font-bold text-base md:text-lg py-3.5 md:py-4 rounded-full shadow-lg hover:bg-[#795548] hover:shadow-xl transition-all active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
