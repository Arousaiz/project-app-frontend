import type { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

export default function ErrorMessage({
  errorField,
}: {
  errorField?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) {
  return (
    <>
      {" "}
      {errorField && (
        <p className="mt-2 text-destructive" role="alert">
          {errorField?.message as string}
        </p>
      )}
    </>
  );
}
