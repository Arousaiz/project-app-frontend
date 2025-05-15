import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

export default function FormField({labelText, type, id, autoComplete, useFormRegister, errorMessage} : {useFormRegister: UseFormRegisterReturn<string>, labelText: string, type: string, id: string, autoComplete: string, errorMessage: FieldError}){
    return(
        <div>
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200">
                {labelText}
            </label>
            <div className="mt-2">
                <input
                  id={id}
                  type={type}
                  {...useFormRegister}
                  autoComplete={autoComplete}
                  className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-blue-600 sm:text-sm/6"
                />
                {errorMessage && <p className="mt-2 text-red-500" role="alert">{errorMessage.message}</p>}
          </div>
        </div>
    )
}