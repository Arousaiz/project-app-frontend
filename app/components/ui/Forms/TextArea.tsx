import ErrorMessage from "./ErrorMessage";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "~/utils/utils";
import React from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const TextAreaBase = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, id, error, rows = 4, className, ...rest }, ref) => {
    const textAreaId = id ?? name;

    return (
      <div className="flex flex-col gap-1">
        <textarea
          id={textAreaId}
          name={name}
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${textAreaId}-error` : undefined}
          className={cn(
            "block w-full rounded-md bg-transparent text-sm/6 outline-none border transition-[color,box-shadow] shadow-xs placeholder:text-muted-foreground sm:text-base hover:ring-2 hover:ring-ring/50 hover:border-ring px-3 py-1.5",
            error &&
              "border-destructive text-destructive focus-visible:ring-destructive",
            className
          )}
          {...rest}
        />

        <ErrorMessage errorField={error} />
      </div>
    );
  }
);

TextAreaBase.displayName = "TextArea";

export default TextAreaBase;
