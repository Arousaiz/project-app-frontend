import { CheckIcon } from "lucide-react";
import React from "react";

type CheckBoxProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
};

export function CheckBox({
  id,
  checked = false,
  onChange,
  label,
  className,
  ...props
}: CheckBoxProps) {
  return (
    <label
      htmlFor={id}
      className="relative flex items-center gap-2 cursor-pointer"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className={`w-4 h-4 cursor-pointer peer appearance-none rounded shadow border border-border 
        hover:shadow-md checked:bg-primary/75 focus:ring-2 focus:ring-ring transition-all ${className}`}
        {...props}
      />
      <span className="absolute start-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 text-primary-foreground">
        <CheckIcon className="size-4" />
      </span>
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}

type CheckBoxGroupProps = {
  options: { label?: React.ReactNode; value: string }[];
  values: string[];
  name: string;
  onChange: (values: string[]) => void;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function CheckBoxGroup({
  options,
  values,
  onChange,
  name,
  direction = "vertical",
  className = "",
}: CheckBoxGroupProps) {
  const toggle = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    onChange(newValues);
  };

  return (
    <div
      className={`flex ${
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
      } gap-2 my-2 ${className}`}
      role="checkboxgroup"
      aria-labelledby={`${name}-group`}
    >
      {options.map(({ label, value }) => (
        <CheckBox
          key={value}
          name={name}
          id={value}
          label={label}
          checked={values.includes(value)}
          onChange={() => toggle(value)}
        />
      ))}
    </div>
  );
}
