import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export default function InputWithIcon({
  register,
  validateOptions,
  name,
  id,
  type,
  errorField,
  placeholder,
  children,
  ...rest
}: React.PropsWithChildren<{
  register: UseFormRegister<any>;
  name: string;
  type: string;
  id: string;
  placeholder?: string;
  validateOptions?: RegisterOptions<FieldValues, string>;
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}>) {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {children}
        </div>
        <input
          {...register(name, validateOptions)}
          id={id}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md input input-padding-icon"
          {...rest}
        />
      </div>
      <ErrorMessage errorField={errorField}></ErrorMessage>
    </div>
  );
}
