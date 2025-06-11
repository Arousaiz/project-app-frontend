import type { ChangeEvent } from "react";
import type {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export default function Select({
  options,
  name,
  children,
  className,
  value,
  defaultValue,
  onChange,
  ...rest
}: React.PropsWithChildren<{
  name: string;
  options?: string[];
  className?: string;
  value?: string; // For controlled component
  defaultValue?: string; // For uncontrolled component
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}>) {
  return (
    <select
      name={name}
      className={`input input-padding ${className}`} // Merge custom classes
      value={value} // Controlled
      defaultValue={defaultValue} // Uncontrolled
      onChange={onChange} // Handle changes
      {...rest}
    >
      {options?.map((value) => (
        <option
          className="bg-popover text-popover-foreground overflow-x-hidden overflow-y-auto rounded-md border shadow-md hover:bg-accent"
          key={value}
          value={value}
        >
          {value}
        </option>
      ))}
      {children}
    </select>
  );
}
