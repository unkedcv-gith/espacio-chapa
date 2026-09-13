import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-11 sm:h-14 md:h-16 max-w-[220px] sm:max-w-[280px] md:max-w-[320px]',
    md: 'h-16 sm:h-20 max-w-[280px] sm:max-w-[360px]',
    lg: 'h-20 sm:h-24 max-w-[360px] sm:max-w-[440px]',
    xl: 'h-24 sm:h-32 md:h-36 max-w-[420px] sm:max-w-[540px]',
  };

  return (
    <div className={`relative inline-flex items-center select-none group/logo ${className}`}>
      {/* Subtle soft ambient neon backglow layer */}
      <div className="absolute inset-0 -m-1 rounded-full bg-cyan-400/15 blur-xl opacity-70 group-hover/logo:opacity-100 group-hover/logo:bg-cyan-400/25 transition-all duration-700 pointer-events-none" />

      {/* Main SVG Logo with layered neon drop-shadows and subtle pulse animation */}
      <img
        src="/logo.svg"
        alt="Espacio Chapa - Quinta de Eventos"
        className={`${sizeClasses[size]} relative z-10 w-auto object-contain transition-all duration-500 ease-out group-hover/logo:scale-105 logo-neon-glow`}
      />
    </div>
  );
};
