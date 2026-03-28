
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  const baseClasses = "bg-pure-white rounded-3xl shadow-lg border border-gentle-green/10 overflow-hidden will-change-transform relative group";
  const hoverClasses = hoverEffect ? "hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {hoverEffect && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-50">
          <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;