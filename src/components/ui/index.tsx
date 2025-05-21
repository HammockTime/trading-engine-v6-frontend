import React from 'react';

// Tooltip component
export function Tooltip({ className = '', children, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function TooltipTrigger({ className = '', children, ...props }) {
  return <span className={className} {...props}>{children}</span>;
}

export function TooltipContent({ className = '', children, ...props }) {
  return (
    <div 
      className={`z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

// Tooltip component
export function Tooltip({ className = '', children, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function TooltipTrigger({ className = '', children, ...props }) {
  return <span className={className} {...props}>{children}</span>;
}

export function TooltipContent({ className = '', children, ...props }) {
  return (
    <div 
      className={`z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function TooltipProvider({ children }) {
  return <>{children}</>;
}
