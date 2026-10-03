import React from 'react';

interface DangoLogoProps {
  variant?: 'header' | 'footer' | 'invoice' | 'hero' | 'symbol-only';
  className?: string;
  theme?: 'light' | 'dark';
}

export const DangoLogo: React.FC<DangoLogoProps> = ({ 
  variant = 'header', 
  className = '',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  // Height configurations preserving original aspect ratio
  const heightClass = 
    variant === 'footer' ? 'h-10 sm:h-12' :
    variant === 'invoice' ? 'h-12 sm:h-14' :
    variant === 'hero' ? 'h-12 sm:h-14' :
    'h-9 sm:h-11';

  return (
    <div className={`inline-flex items-center select-none ${isDark ? 'bg-white/95 px-2.5 py-1 rounded-lg' : ''} ${className}`}>
      <img
        src="/dango-cargo-logo.png"
        alt="DANGO CARGO AIR SERVICES"
        className={`${heightClass} w-auto max-w-full object-contain`}
      />
    </div>
  );
};
