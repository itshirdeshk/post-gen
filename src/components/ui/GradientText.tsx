import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent";
}

const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          variant === "primary" ? "gradient-text" : "gradient-text-accent",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = "GradientText";

export { GradientText };
