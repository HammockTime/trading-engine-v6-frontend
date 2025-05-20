import React from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenu({ children, className = '' }: DropdownMenuProps) {
  return <div className={className}>{children}</div>;
}

export function DropdownMenuTrigger({ children, className = '' }: DropdownMenuProps) {
  return <button className={`inline-flex items-center justify-center ${className}`}>{children}</button>;
}

export function DropdownMenuContent({ children, className = '' }: DropdownMenuProps) {
  return (
    <div className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, className = '' }: DropdownMenuProps) {
  return (
    <button className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground ${className}`}>
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className = '' }: { className?: string }) {
  return <div className={`-mx-1 my-1 h-px bg-muted ${className}`} />;
}

export function DropdownMenuLabel({ children, className = '' }: DropdownMenuProps) {
  return <div className={`px-2 py-1.5 text-sm font-semibold ${className}`}>{children}</div>;
}
