
import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import MagneticButton from './MagneticButton';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  tooltip?: string;
}

const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  fullWidth = false,
  disabled = false,
  className = '',
  ariaLabel,
  tooltip,
}) => {
  const baseStyles = 'relative overflow-hidden z-10 inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide rounded-full transition-all duration-500 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 shadow-md hover:shadow-xl before:absolute before:inset-0 before:-z-10 before:translate-y-[100%] hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-out';
  
  const variantStyles = {
    primary: 'bg-warm-coral text-primary-text hover:text-gentle-green focus-visible:ring-warm-coral/50 before:bg-pure-white border border-transparent hover:border-warm-coral/50',
    secondary: 'bg-gentle-green text-pure-white hover:text-gentle-green focus-visible:ring-gentle-green/50 before:bg-pure-white border border-transparent hover:border-gentle-green/50',
    outline: 'bg-transparent border-2 border-gentle-green text-gentle-green hover:text-pure-white focus-visible:ring-gentle-green/50 before:bg-gentle-green',
  };

  const sizeStyles = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-10 py-4 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-md grayscale' : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;

  const renderButton = () => {
    let buttonContent;
    if (to) {
      buttonContent = (
        <Link 
          to={to} 
          className={combinedClassName} 
          onClick={onClick} 
          aria-label={ariaLabel}
          role="button"
          aria-disabled={disabled}
        >
          {children}
        </Link>
      );
    } else {
      buttonContent = (
        <button 
          type={type} 
          onClick={onClick} 
          className={combinedClassName} 
          disabled={disabled}
          aria-label={ariaLabel}
          aria-disabled={disabled}
        >
          {children}
        </button>
      );
    }

    if (variant === 'primary' || variant === 'secondary') {
      return <MagneticButton className={fullWidth ? 'w-full block' : ''}>{buttonContent}</MagneticButton>;
    }
    return buttonContent;
  };

  if (tooltip) {
    return (
      <Tooltip text={tooltip}>
        {renderButton()}
      </Tooltip>
    );
  }

  return renderButton();
};

export default Button;
