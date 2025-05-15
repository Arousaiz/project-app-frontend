import type {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export default function Select({
  register,
  validateOptions,
  options,
  name,
  children,
  ...rest
}: React.PropsWithChildren<{
  register: UseFormRegister<any>;
  validateOptions?: RegisterOptions<FieldValues, string>;
  name: string;
  options?: string[];
}>) {
  return (
    <select {...register(name, validateOptions)} {...rest}>
      {options?.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
      {children}
    </select>
  );
}
