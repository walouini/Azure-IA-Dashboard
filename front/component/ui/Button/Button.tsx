import * as React from "react";

function cn(...xs: Array<string | undefined | false | null>) {
  return xs.filter(Boolean).join(" ");
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:opacity-90",
      secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
      outline: "border border-input bg-background hover:bg-accent",
      ghost: "hover:bg-accent",
      destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
    };
    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-sm rounded-md",
      md: "h-10 px-4 rounded-md",
      lg: "h-12 px-5 text-lg rounded-lg",
      icon: "h-10 w-10 rounded-md p-0",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
