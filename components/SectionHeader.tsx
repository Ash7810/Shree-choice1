
import React from 'react';

interface SectionHeaderProps {
    title: string;
    actionText?: string;
    onAction?: () => void;
}

export const SectionHeader = React.memo<SectionHeaderProps>(({ title, actionText, onAction }) => (
  <div className="flex justify-between items-end mb-8 px-4 max-w-7xl mx-auto">
     <h2 className="text-3xl font-brand text-brand-primary relative">
       {title}
       <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-play-yellow rounded-full"></span>
     </h2>
     {actionText && (
       <button onClick={onAction} className="text-brand-primary font-bold hover:underline hidden md:flex items-center gap-1">
          {actionText} <span>→</span>
       </button>
     )}
  </div>
));