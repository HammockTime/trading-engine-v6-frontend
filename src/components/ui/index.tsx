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

// Slider component
export function Slider({ className = '', ...props }) {
  return (
    <div
      className={`relative flex w-full touch-none select-none items-center ${className}`}
      {...props}
    >
      <span className="relative h-2 w-full rounded-full bg-secondary">
        <span className="absolute h-full rounded-full bg-primary" style={{ width: '50%' }}></span>
        <span className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" style={{ left: '50%', transform: 'translateX(-50%)' }}></span>
      </span>
    </div>
  );
}

export function SliderTrack({ className = '', ...props }) {
  return <div className={`relative h-2 w-full rounded-full bg-secondary ${className}`} {...props} />;
}

export function SliderRange({ className = '', ...props }) {
  return <div className={`absolute h-full rounded-full bg-primary ${className}`} {...props} />;
}

export function SliderThumb({ className = '', ...props }) {
  return <div className={`block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`} {...props} />;
}

// RadioGroup component
export function RadioGroup({ className = '', ...props }) {
  return <div className={`grid gap-2 ${className}`} {...props} />;
}

export function RadioGroupItem({ className = '', children, ...props }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        type="button"
        className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        <span className="flex h-full w-full items-center justify-center">
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        </span>
      </button>
      {children}
    </div>
  );
}

// Progress component
export function Progress({ value = 0, className = '', ...props }) {
  return (
    <div
      className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
      {...props}
    >
      <div 
        className="h-full w-full flex-1 bg-primary transition-all" 
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}

// Fix useToast hook export
export function useToast() {
  return {
    toast: (options) => console.log('Toast:', options),
    dismiss: (id) => console.log('Dismiss toast:', id),
    toasts: []
  };
}

// Fix Button component export if not already defined
export function Button({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center rounded-md ${className}`} {...props}>{children}</button>;
}
