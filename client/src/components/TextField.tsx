import { type InputHTMLAttributes, forwardRef } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-[11px] font-bold tracking-wider text-gray-800 uppercase"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-4 py-3 bg-[#f3f4f6] text-gray-900 placeholder-gray-400 text-sm rounded-xl border border-gray-300 transition-colors duration-200 focus:outline-none focus:bg-white focus:border-indigo-600 ${error ? "border-red-500 focus:border-red-500 bg-red-50" : ""} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
      </div>
    );
  },
);

TextField.displayName = "TextField";
