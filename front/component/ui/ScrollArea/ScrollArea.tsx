import * as React from "react";

export const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`overflow-auto ${className}`} 
      style={{ maxHeight: "100%", ...style }} 
      {...props} 
    />
  )
);
ScrollArea.displayName = "ScrollArea";