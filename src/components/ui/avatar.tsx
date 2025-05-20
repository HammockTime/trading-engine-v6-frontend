import React from 'react';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  fallback?: string;
}

export function Avatar({ className = '', src, alt = '', fallback }: AvatarProps) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {src ? (
        <img className="aspect-square h-full w-full" src={src} alt={alt} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {fallback && <span className="text-sm font-medium">{fallback}</span>}
        </div>
      )}
    </div>
  );
}

export function AvatarImage({ className = '', src, alt = '' }: { className?: string; src?: string; alt?: string }) {
  return src ? <img className={`aspect-square h-full w-full ${className}`} src={src} alt={alt} /> : null;
}

export function AvatarFallback({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}>
      {children}
    </div>
  );
}
