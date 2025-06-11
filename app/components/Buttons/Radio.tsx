import Label from "../Forms/Label";
import { useState } from "react";

type RadioProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  label?: React.ReactNode;
  onChange?: (value: string) => void;
};

export default function Radio({
  name,
  value,
  className,
  checked,
  onChange,
  label,
}: RadioProps) {
  return (
    <label key={name} className="flex items-center gap-2 cursor-pointer">
      <input
        id={name}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={() => onChange?.(String(value))}
        className={`hidden ${className}`}
      />
      <div
        className={`w-5 h-5 rounded-full border-2 border-border flex items-center justify-center hover:ring-ring hover:ring-2
            ${checked ? "bg-primary border-primary  " : " "}`}
      >
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground"></div>
        )}
      </div>

      <span>{label ?? value}</span>
    </label>
  );
}

type RadioGroupProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  options: { label?: React.ReactNode; value: string }[];
  name: string;
  value?: string;
  onChange: (value: string) => void;
};

export function RadioGroup({
  options,
  onChange,
  value: controlledValue,
  name,
}: RadioGroupProps) {
  const selectedValue = controlledValue;

  return (
    <div className="flex flex-col gap-2 my-2">
      {options.map(({ label, value }) => (
        <Radio
          label={label}
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
        ></Radio>
      ))}
    </div>
  );
}
