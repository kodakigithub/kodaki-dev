'use client';

import { ReactNode } from 'react';

interface HoverRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function HoverRow({ children, onClick, className = '' }: HoverRowProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      className={`
        group/hover relative
        -mx-4 px-4 
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Left accent bar + gradient fade */}
      <div 
        className="
          absolute inset-0 
          opacity-0 group-hover/hover:opacity-100 group-focus/hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
        "
        style={{
          background: 'linear-gradient(to right, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.12) 15%, rgba(6, 182, 212, 0.06) 40%, rgba(6, 182, 212, 0.02) 70%, transparent 100%)',
          borderLeft: '2px solid rgba(6, 182, 212, 0.7)',
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
