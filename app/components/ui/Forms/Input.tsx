import React from "react";
import ErrorMessage from "./ErrorMessage";
import { cn } from "~/utils/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  icon?: React.ReactNode;
};

const InputBase = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, id, name, icon, ...rest }, ref) => {
    const inputId = id ?? name;

    return (
      <div>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "block rounded-md bg-transparent text-sm/6 outline-none border transition-[color,box-shadow] shadow-xs placeholder:text-muted-foreground sm:text-base hover:ring-2 hover:ring-ring/50 hover:border-ring px-3 py-1.5 w-full",
              icon && "ps-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...rest}
          />
        </div>
        <ErrorMessage errorField={error} />
      </div>
    );
  }
);

InputBase.displayName = "Input";

export default InputBase;
