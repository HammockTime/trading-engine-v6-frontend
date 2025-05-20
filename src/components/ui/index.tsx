// This file exports simplified versions of all UI components
// to resolve the build errors without creating dozens of individual files

import React from 'react';

// Button
export function Button({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center rounded-md ${className}`} {...props}>{children}</button>;
}

// Card and related components
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

// Input
export function Input({ className = '', ...props }) {
  return <input className={`flex h-10 w-full rounded-md border ${className}`} {...props} />;
}

// Label
export function Label({ className = '', children, ...props }) {
  return <label className={`text-sm font-medium leading-none ${className}`} {...props}>{children}</label>;
}

// Tabs and related components
export function Tabs({ className = '', children, ...props }) {
  return <div className={`w-full ${className}`} {...props}>{children}</div>;
}
export function TabsList({ className = '', children, ...props }) {
  return <div className={`inline-flex h-10 items-center justify-center rounded-md ${className}`} {...props}>{children}</div>;
}
export function TabsTrigger({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center px-3 py-1.5 ${className}`} {...props}>{children}</button>;
}
export function TabsContent({ className = '', children, ...props }) {
  return <div className={`mt-2 ${className}`} {...props}>{children}</div>;
}

// Avatar and related components
export function Avatar({ className = '', children, ...props }) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>{children}</div>;
}
export function AvatarImage({ className = '', ...props }) {
  return <img className={`aspect-square h-full w-full ${className}`} {...props} />;
}
export function AvatarFallback({ className = '', children, ...props }) {
  return <div className={`flex h-full w-full items-center justify-center rounded-full ${className}`} {...props}>{children}</div>;
}

// Skeleton
export function Skeleton({ className = '', ...props }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} {...props} />;
}

// Separator
export function Separator({ className = '', ...props }) {
  return <div className={`shrink-0 bg-border h-[1px] w-full ${className}`} {...props} />;
}

// DropdownMenu and related components
export function DropdownMenu({ className = '', children, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}
export function DropdownMenuTrigger({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center ${className}`} {...props}>{children}</button>;
}
export function DropdownMenuContent({ className = '', children, ...props }) {
  return <div className={`z-50 min-w-[8rem] overflow-hidden rounded-md border ${className}`} {...props}>{children}</div>;
}
export function DropdownMenuItem({ className = '', children, ...props }) {
  return <button className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm ${className}`} {...props}>{children}</button>;
}
export function DropdownMenuSeparator({ className = '', ...props }) {
  return <div className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />;
}
export function DropdownMenuLabel({ className = '', children, ...props }) {
  return <div className={`px-2 py-1.5 text-sm font-semibold ${className}`} {...props}>{children}</div>;
}

// Sheet and related components
export function Sheet({ className = '', children, ...props }) {
  return <div className={className} {...props}>{children}</div>;
}
export function SheetTrigger({ className = '', children, ...props }) {
  return <button className={className} {...props}>{children}</button>;
}
export function SheetClose({ className = '', children, ...props }) {
  return <button className={className} {...props}>{children}</button>;
}
export function SheetContent({ className = '', children, ...props }) {
  return <div className={`fixed z-50 gap-4 bg-background p-6 shadow-lg ${className}`} {...props}>{children}</div>;
}
export function SheetHeader({ className = '', children, ...props }) {
  return <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`} {...props}>{children}</div>;
}
export function SheetFooter({ className = '', children, ...props }) {
  return <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>{children}</div>;
}
export function SheetTitle({ className = '', children, ...props }) {
  return <h3 className={`text-lg font-semibold text-foreground ${className}`} {...props}>{children}</h3>;
}
export function SheetDescription({ className = '', children, ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props}>{children}</p>;
}

// Add any other components that might be needed
// This approach creates simplified versions of all UI components in one file

// Toast related components and hooks
export function Toast({ className = '', children, ...props }) {
  return <div className={`bg-white rounded-md shadow-lg p-4 ${className}`} {...props}>{children}</div>;
}

export function ToastAction({ className = '', children, ...props }) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ${className}`} {...props}>{children}</button>;
}

export function ToastProvider({ children }) {
  return <>{children}</>;
}

export function ToastViewport({ className = '', ...props }) {
  return <div className={`fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-full max-w-sm z-50 ${className}`} {...props} />;
}

export function useToast() {
  return {
    toast: (options) => console.log('Toast:', options),
    dismiss: (id) => console.log('Dismiss toast:', id),
    toasts: []
  };
}
