import * as React from "react";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={["text-sm font-medium leading-none", className].filter(Boolean).join(" ")}
      {...props}
    />
  )
);
Label.displayName = "Label";
