import type { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

type ErrorField =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

export default function ErrorMessage({
  errorField,
}: {
  errorField?: ErrorField;
}) {
  const message =
    typeof errorField === "string"
      ? errorField
      : errorField?.message?.toString();

  if (!message) return null;

  return (
    <p id="error-message" className="mt-2 text-destructive" role="alert">
      {message}
    </p>
  );
}
