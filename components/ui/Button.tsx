//components/ui/Button.tsx)

import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        variant === "primary" && "bg-primary text-white hover:bg-primary/90",
        variant === "outline" &&
          "border border-primary text-primary hover:bg-primary-10",
        variant === "ghost" && "bg-gray-200 text-text hover:bg-gray-300",
        variant === "danger" && "text-expense hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}