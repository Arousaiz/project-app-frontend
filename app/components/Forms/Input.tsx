import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export default function Input({
  register,
  validateOptions,
  name,
  id,
  type,
  errorField,
  placeholder,
  min,
  max,
  ...rest
}: {
  register: UseFormRegister<any>;
  name: string;
  type: string;
  id: string;
  placeholder?: string;
  validateOptions?: RegisterOptions<FieldValues, string>;
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  min?: string;
  max?: string;
}) {
  return (
    <div>
      <input
        {...register(name, validateOptions)}
        id={id}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        className="input input-padding"
        {...rest}
      />
      <ErrorMessage errorField={errorField}></ErrorMessage>
    </div>
  );
}
