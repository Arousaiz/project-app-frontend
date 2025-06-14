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
  ...props
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
        {...props}
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
  direction?: "horizontal" | "vertical";
};

export function RadioGroup({
  options,
  onChange,
  value: controlledValue,
  name,
  direction = "vertical",
  className = "",
  ...props
}: RadioGroupProps) {
  const selectedValue = controlledValue;

  return (
    <div
      className={`
        flex gap-2 my-2 ${
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
        }
        ${className}
      `}
      role="radiogroup"
      aria-labelledby={`${name}-group`}
      {...props}
    >
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
