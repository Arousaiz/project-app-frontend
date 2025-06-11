import { CheckIcon } from "@heroicons/react/20/solid";
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

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
    <div className="">
      <div className="me-2 mt-1 relative flex items-center">
        <input
          {...register(name, validateOptions)}
          id={id}
          type="checkbox"
          value=""
          className="w-4 h-4 cursor-pointer peer transition-all appearance-none rounded shadow hover:shadow-md border border-border checked:bg-primary/75 focus:ring-ring focus:ring-2"
          {...rest}
        />
        <span className="absolute text-primary-foreground opacity-0 peer-checked:opacity-100 top-0 left-0 transform pointer-events-none">
          <CheckIcon className="size-4" />
        </span>
      </div>
      <ErrorMessage errorField={errorField}></ErrorMessage>
    </div>
  );
}
