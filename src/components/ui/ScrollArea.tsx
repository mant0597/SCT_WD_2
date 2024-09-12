// src/components/ui/ScrollArea.tsx
import React from 'react';

type ScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
};

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className }) => {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

export default ScrollArea;
