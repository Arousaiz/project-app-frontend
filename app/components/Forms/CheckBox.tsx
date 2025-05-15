import { CheckIcon } from "@heroicons/react/20/solid";
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export default function CheckBoxInput({
  register,
  validateOptions,
  name,
  id,
  errorField,
  ...rest
}: {
  register: UseFormRegister<any>;
  name: string;
  id: string;
  validateOptions?: RegisterOptions<FieldValues, string>;
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) {
  return (
    <div className="me-2 mt-1 relative">
      <div className="">
        <input
          {...register(name, validateOptions)}
          id={id}
          type="checkbox"
          value=""
          className="w-4 h-4 peer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
          {...rest}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-0 left-0 transform ">
          <CheckIcon className="size-4" />
        </span>
        {errorField && (
          <p className="mt-2 text-red-500" role="alert">
            {errorField?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
