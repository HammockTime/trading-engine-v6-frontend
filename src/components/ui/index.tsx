import React from 'react';

// Button component
export function Button({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`} {...props}>{children}</button>;
}

// Card components
export function Card({ className = '', children, ...props }) {
  return <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>{children}</div>;
}

export function CardHeader({ className = '', children, ...props }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = '', children, ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>;
}

export function CardDescription({ className = '', children, ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props}>{children}</p>;
}

export function CardContent({ className = '', children, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = '', children, ...props }) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

// Input component
export function Input({ className = '', type = 'text', ...props }) {
  return <input type={type} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />;
}

// Label component
export function Label({ className = '', children, ...props }) {
  return <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>;
}

// Tabs components
export function Tabs({ defaultValue, value, onValueChange, className = '', children, ...props }) {
  return <div className={`w-full ${className}`} {...props}>{children}</div>;
}

export function TabsList({ className = '', children, ...props }) {
  return <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`} {...props}>{children}</div>;
}

export function TabsTrigger({ value, className = '', children, ...props }) {
  return <button data-state="active" data-value={value} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`} {...props}>{children}</button>;
}

export function TabsContent({ value, className = '', children, ...props }) {
  return <div data-state="active" data-value={value} className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`} {...props}>{children}</div>;
}

// Skeleton component
export function Skeleton({ className = '', ...props }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} {...props} />;
}

// Avatar components
export function Avatar({ className = '', children, ...props }) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>{children}</div>;
}

export function AvatarImage({ className = '', src, alt = '', ...props }) {
  return <img className={`aspect-square h-full w-full ${className}`} src={src} alt={alt} {...props} />;
}

export function AvatarFallback({ className = '', children, ...props }) {
  return <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>{children}</div>;
}

// DropdownMenu components
export function DropdownMenu({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function DropdownMenuTrigger({ children, className = '', ...props }) {
  return <button className={className} {...props}>{children}</button>;
}

export function DropdownMenuContent({ children, className = '', ...props }) {
  return <div className={`z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`} {...props}>{children}</div>;
}

export function DropdownMenuItem({ children, className = '', ...props }) {
  return <button className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground ${className}`} {...props}>{children}</button>;
}

export function DropdownMenuSeparator({ className = '', ...props }) {
  return <div className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />;
}

// Sheet components
export function Sheet({ children, className = '', ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function SheetTrigger({ children, className = '', ...props }) {
  return <button className={className} {...props}>{children}</button>;
}

export function SheetContent({ children, className = '', side = 'right', ...props }) {
  const sideClasses = {
    top: 'inset-x-0 top-0 border-b',
    right: 'inset-y-0 right-0 border-l',
    bottom: 'inset-x-0 bottom-0 border-t',
    left: 'inset-y-0 left-0 border-r',
  };
  
  return <div className={`fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out ${sideClasses[side]} ${className}`} {...props}>{children}</div>;
}

// ScrollArea component
export function ScrollArea({ className = '', children, ...props }) {
  return <div className={`relative overflow-auto ${className}`} {...props}>{children}</div>;
}

// Progress component
export function Progress({ value = 0, className = '', ...props }) {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`} {...props}>
      <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    </div>
  );
}

// Slider components
export function Slider({ className = '', ...props }) {
  return (
    <div className={`relative flex w-full touch-none select-none items-center ${className}`} {...props}>
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

// RadioGroup components
export function RadioGroup({ className = '', ...props }) {
  return <div className={`grid gap-2 ${className}`} {...props} />;
}

export function RadioGroupItem({ className = '', children, ...props }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button type="button" className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...props}>
        <span className="flex h-full w-full items-center justify-center">
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        </span>
      </button>
      {children}
    </div>
  );
}

// Separator component
export function Separator({ className = '', orientation = 'horizontal', ...props }) {
  return <div className={`shrink-0 bg-border ${orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'} ${className}`} {...props} />;
}

// Badge component
export function Badge({ className = '', variant = 'default', children, ...props }) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'text-foreground border border-input',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  };
  
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className}`} {...props}>{children}</span>;
}

// Switch component
export function Switch({ className = '', ...props }) {
  return (
    <button type="button" role="switch" className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ${className}`} {...props}>
      <span className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
    </button>
  );
}

// Dialog/Modal components
export function Dialog({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function DialogTrigger({ children, className = '', ...props }) {
  return <button className={className} {...props}>{children}</button>;
}

export function DialogContent({ children, className = '', ...props }) {
  return (
    <div className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogHeader({ className = '', children, ...props }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>{children}</div>;
}

export function DialogTitle({ className = '', children, ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>;
}

export function DialogDescription({ className = '', children, ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props}>{children}</p>;
}

export function DialogFooter({ className = '', children, ...props }) {
  return <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>{children}</div>;
}

// Tooltip components
export function Tooltip({ className = '', children, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function TooltipTrigger({ className = '', children, ...props }) {
  return <span className={className} {...props}>{children}</span>;
}

export function TooltipContent({ className = '', children, ...props }) {
  return <div className={`z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 ${className}`} {...props}>{children}</div>;
}

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

// useToast hook
export function useToast() {
  return {
    toast: (options) => console.log('Toast:', options),
    dismiss: (id) => console.log('Dismiss toast:', id),
    toasts: []
  };
}

// Additional components that might be needed
export function Popover({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function PopoverTrigger({ children, className = '', ...props }) {
  return <button className={className} {...props}>{children}</button>;
}

export function PopoverContent({ children, className = '', ...props }) {
  return <div className={`z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`} {...props}>{children}</div>;
}

export function Checkbox({ className = '', ...props }) {
  return (
    <button type="button" className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className}`} {...props}>
      <span className="flex items-center justify-center text-current">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </button>
   );
}

// Google Icon component
export function GoogleIcon({ className = '', ...props }) {
  return (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 12 h8"></path>
      <path d="M12 8 v8"></path>
    </svg>
   );
}

// Add missing DropdownMenuLabel component
export function DropdownMenuLabel({ children, className = '', ...props }) {
  return <div className={`px-2 py-1.5 text-sm font-semibold text-foreground ${className}`} {...props}>{children}</div>;
}
