// src/components/ui/Button.tsx
import React from 'react';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
  disabled?: boolean;
};

const buttonVariants = {
  default: 'bg-blue-500 text-white hover:bg-blue-600',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-100',
};

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'default', disabled = false }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none transition-colors duration-300';
  const variantStyles = buttonVariants[variant];

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
