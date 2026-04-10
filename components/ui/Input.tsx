//components/ui/Input.tsx

import { clsx } from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-semibold text-text">{label}</label>
      )}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-full border bg-white px-4 py-3 text-sm text-text outline-none placeholder:text-gray transition",
          error ? "border-expense" : "border-border focus:border-primary",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-expense">{error}</span>}
    </div>
  ),
);
Input.displayName = "Input";
export default Input;