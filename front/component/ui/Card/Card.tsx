import React from "react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`
      rounded-xl border bg-card text-card-foreground 
      shadow-md hover:shadow-md transition-shadow
      ${className}
    `}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`
      p-4 border-b 
      ${className}
    `}>
      {children}
    </div>
  )
}

export function CardContent({
  className,
  children,
}: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={[
        "p-4 sm:p-6 min-w-0", 
        className ?? ""
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}