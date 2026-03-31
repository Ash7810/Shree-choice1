
import React from 'react';
import { REVIEWS } from '../constants';
import { StarRating } from './StarRating';

export const CustomerReviews: React.FC = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-brand text-brand-primary text-center mb-12 relative">
           Hear from Happy Parents
           <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-play-yellow rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map(review => (
            <div key={review.id} className="clay-card p-8 relative flex flex-col">
                <div className="absolute top-4 right-8 text-8xl text-sky-100 font-serif -z-0 opacity-80 select-none">“</div>
                
                <div className="flex items-center mb-4 relative z-10">
                    <img src={review.avatarUrl} alt={review.name} loading="lazy" decoding="async" className="w-14 h-14 rounded-full border-4 border-white shadow-md" />
                    <div className="ml-4">
                        <h3 className="font-bold text-lg text-brand-primary">{review.name}</h3>
                        <StarRating rating={review.rating} showLabel={false} />
                    </div>
                </div>

                <blockquote className="text-text-secondary z-10 relative flex-grow">
                    <p className="leading-relaxed">"{review.comment}"</p>
                </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
