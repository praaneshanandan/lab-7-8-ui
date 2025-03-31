import React from 'react';
import { Link } from 'react-router';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

interface LinkButtonProps extends Omit<ButtonProps, 'type'> {
  to: string;
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 font-bold shadow-lg border-2 border-blue-700';
    case 'secondary':
      return 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500/50 font-bold shadow-lg border-2 border-green-700';
    case 'outline':
      return 'bg-white hover:bg-gray-100 text-gray-800 border-2 border-blue-600 focus:ring-blue-500/50 font-medium text-blue-700';
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50 font-bold shadow-md border-2 border-red-700';
    default:
      return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 font-bold shadow-lg border-2 border-blue-700';
  }
};

const getSizeClasses = (size: ButtonSize): string => {
  switch (size) {
    case 'sm':
      return 'text-sm px-3 py-1.5';
    case 'md':
      return 'text-base px-5 py-2.5';
    case 'lg':
      return 'text-lg px-6 py-3.5';
    default:
      return 'text-base px-5 py-2.5';
  }
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  to,
  onClick,
  className = '',
}: LinkButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-70 pointer-events-none' : '';

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClasses} ${className} no-underline`}
    >
      {children}
    </Link>
  );
};
