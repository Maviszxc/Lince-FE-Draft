import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-input",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        admin:
          "border-transparent bg-[#5A3A31] text-white hover:bg-[#5A3A31]/90",
        active:
          "border-transparent bg-[#AA8F66] text-white hover:bg-[#AA8F66]/90",
        pending:
          "border-transparent bg-[#AA8F66] text-[#110407] hover:bg-[#AA8F66]/90",
        rejected:
          "border-transparent bg-[#110407] text-white hover:bg-[#110407]/90",
        inactive:
          "border-transparent bg-[#110407] text-white hover:bg-[#110407]/90",
        seller:
          "border-transparent bg-[#AA8F66] text-white hover:bg-[#AA8F66]/90",
        buyer:
          "border-transparent bg-[#AA8F66] text-white hover:bg-[#AA8F66]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
