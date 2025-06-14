import React from "react";
import { cn } from "~/utils/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn("block small-text pt-2 pb-1", className)} {...props}>
      {children}
    </label>
  );
}
