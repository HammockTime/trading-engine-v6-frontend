import React from 'react';

interface SheetProps {
  children: React.ReactNode;
  className?: string;
}

export function Sheet({ children, className = '' }: SheetProps) {
  return <div className={className}>{children}</div>;
}

export function SheetTrigger({ children, className = '' }: SheetProps) {
  return <button className={className}>{children}</button>;
}

export function SheetClose({ children, className = '' }: SheetProps) {
  return <button className={className}>{children}</button>;
}

export function SheetContent({ children, className = '', side = 'right' }: SheetProps & { side?: 'top' | 'right' | 'bottom' | 'left' }) {
  const sideClasses = {
    top: 'inset-x-0 top-0 border-b',
    right: 'inset-y-0 right-0 border-l',
    bottom: 'inset-x-0 bottom-0 border-t',
    left: 'inset-y-0 left-0 border-r',
  };
  
  return (
    <div className={`fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out ${sideClasses[side]} ${className}`}>
      {children}
    </div>
  );
}

export function SheetHeader({ children, className = '' }: SheetProps) {
  return <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}>{children}</div>;
}

export function SheetFooter({ children, className = '' }: SheetProps) {
  return <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>{children}</div>;
}

export function SheetTitle({ children, className = '' }: SheetProps) {
  return <h3 className={`text-lg font-semibold text-foreground ${className}`}>{children}</h3>;
}

export function SheetDescription({ children, className = '' }: SheetProps) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
}
