import type { SelectHTMLAttributes } from "react";
import React from "react";
import { cn } from "~/utils/utils";
import ErrorMessage from "./ErrorMessage";

type SelectProps = React.PropsWithChildren<{
  name?: string;
  options?: string[];
  className?: string;
  error?: string;
}> &
  SelectHTMLAttributes<HTMLSelectElement>;

export function SelectBase(
  { options, name, children, className, error, ...rest }: SelectProps,
  ref: React.Ref<HTMLSelectElement>
) {
  return (
    <div className="flex flex-col gap-1">
      <select
        name={name}
        className={cn(
          "block w-full rounded-md bg-transparent text-sm/6 outline-none border transition-[color,box-shadow] shadow-xs placeholder:text-muted-foreground sm:text-base hover:ring-2 hover:ring-ring/50 hover:border-ring px-3 py-1.5",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...rest}
      >
        {options
          ? options?.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))
          : children}
      </select>

      <ErrorMessage errorField={error} />
    </div>
  );
}

const Select = React.forwardRef(SelectBase);

Select.displayName = "Select";

export default Select;
