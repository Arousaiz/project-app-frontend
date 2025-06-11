import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export default function TextArea({
  register,
  validateOptions,
  name,
  id,
  errorField,
  placeholder,
  ...rest
}: {
  register: UseFormRegister<any>;
  name: string;
  id: string;
  placeholder?: string;
  validateOptions?: RegisterOptions<FieldValues, string>;
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) {
  return (
    <div>
      <textarea
        {...register(name, validateOptions)}
        rows={4}
        id={id}
        placeholder={placeholder}
        className="input input-padding"
        {...rest}
      />
      <ErrorMessage errorField={errorField}></ErrorMessage>
    </div>
  );
}
