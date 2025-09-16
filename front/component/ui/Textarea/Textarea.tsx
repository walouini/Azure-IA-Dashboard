import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;


export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`
      w-full rounded-md border border-input bg-background px-3 py-2 text-sm
      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring
      ${className}
    `}
    {...props}
  />
));
Textarea.displayName = "Textarea";