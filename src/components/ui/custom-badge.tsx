import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type StatusVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default"
  | "admin"
  | "active"
  | "pending"
  | "rejected"
  | "inactive"
  | "seller"
  | "buyer";

interface CustomBadgeProps {
  variant: StatusVariant;
  children: ReactNode;
  className?: string;
}

const statusColorMap: Record<StatusVariant, string> = {
  success: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100",
  warning: "bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  error: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-100",
  info: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  default: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  admin: "bg-[#5A3A31] text-white",
  active: "bg-[#AA8F66] text-white",
  pending: "bg-[#AA8F66] text-[#110407]",
  rejected: "bg-[#110407] text-white",
  inactive: "bg-[#110407] text-white",
  seller: "bg-[#AA8F66] text-white",
  buyer: "bg-[#AA8F66] text-white",
};

export const StatusBadge = ({
  variant,
  children,
  className,
}: CustomBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 font-normal border",
        statusColorMap[variant],
        className
      )}
    >
      {children}
    </Badge>
  );
};
