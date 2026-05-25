interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-9 h-9', text: 'text-lg' },
    md: { icon: 'w-11 h-11', text: 'text-xl' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl' },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.png"
        alt="Paper Crafts"
        className={`${sizes[size].icon} object-contain rounded-lg`}
      />

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${sizes[size].text} font-display text-accent-500 tracking-wide`}>
            PAPER CRAFTS
          </span>
          <span className="text-[10px] font-semibold text-primary-500 uppercase tracking-widest">
            For Sweet & Bakery Boxes
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Paper Crafts"
      className={`object-contain rounded-lg ${className}`}
    />
  );
}
