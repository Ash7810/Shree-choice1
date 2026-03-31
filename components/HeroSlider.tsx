
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../lib/router';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[auto] md:min-h-[85vh] flex flex-col justify-center bg-[#E0F7FA] pt-24 pb-48 md:pt-32 md:pb-64 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-40 left-10 w-48 h-48 md:w-64 md:h-64 bg-yellow-200/40 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-4 md:mb-6"
              >
                <span className="bg-white/90 backdrop-blur-sm text-brand-primary font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-blue-100 shadow-sm text-xs md:text-sm tracking-wide uppercase">
                  Welcome to ShreeChoice Playworld
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-brand text-[#2C3E50] mb-4 md:mb-6 leading-tight drop-shadow-sm"
              >
                Unleash The Best Toys <br/>
                <span className="text-brand-secondary inline-block transform -rotate-2 mt-1 md:mt-2">
                  for Happy Kids!
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl text-slate-700 mb-8 md:mb-10 max-w-lg font-medium leading-relaxed px-2 md:px-0"
              >
                Shop our wide selection of toys for endless joy and learning. Our collection features the best educational and developmental toys for kids of all ages.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Link
                  href="/shop"
                  className="relative z-30 inline-block bg-play-yellow text-slate-900 font-brand text-base md:text-lg py-3.5 px-10 md:py-4 md:px-12 rounded-full shadow-[0_4px_0_rgb(217,119,6)] hover:shadow-[0_3px_0_rgb(217,119,6)] hover:translate-y-[1px] transition-all border-2 border-yellow-400 cursor-pointer active:shadow-none active:translate-y-[4px]"
                >
                  Explore Our Collection
                </Link>
              </motion.div>
          </div>

           {/* Right Image */}
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3, type: "spring", stiffness: 50 }}
             className="w-full md:w-1/2 relative flex justify-center md:justify-end z-10 mt-8 md:mt-0"
           >
              <div className="relative w-full max-w-[300px] md:max-w-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80" 
                    alt="Happy Kids Playing" 
                    className="w-full h-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white transform rotate-2 relative z-10"
                  />
                  
                  {/* Floating Decor Elements */}
                  <div className="absolute -top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce hidden lg:block z-20">
                    <span className="text-5xl">🧸</span>
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl animate-float hidden lg:block z-20">
                    <span className="text-5xl">🎨</span>
                  </div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-20 translate-y-1 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};
