import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outline';
  children: ReactNode;
  hover?: boolean;
}

export function Card({
  variant = 'glass',
  className = '',
  children,
  hover = false,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-3xl p-6 md:p-8';

  const variants = {
    glass: 'glass',
    solid: 'bg-white shadow-lg shadow-black/5',
    outline: 'border border-neutral-200 bg-white/50',
  };

  const hoverStyles = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10'
    : '';

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
