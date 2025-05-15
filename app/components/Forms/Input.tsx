import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

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
        className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:focus:outline-blue-600 sm:text-sm/6"
        {...rest}
      />
      {errorField && (
        <p className="mt-2 text-red-500" role="alert">
          {errorField?.message as string}
        </p>
      )}
    </div>
  );
}
