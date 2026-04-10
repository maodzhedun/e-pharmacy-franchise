//components/ui/Textarea.tsx

import { clsx } from "clsx";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-semibold text-text">{label}</label>
      )}
      <textarea
        ref={ref}
        className={clsx(
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-text outline-none placeholder:text-gray transition resize-none",
          error ? "border-expense" : "border-border focus:border-primary",
          className,
        )}
        rows={4}
        {...props}
      />
      {error && <span className="text-xs text-expense">{error}</span>}
    </div>
  ),
);
Textarea.displayName = "Textarea";
export default Textarea;
