import { cn } from "~/utils/utils";
import LoadingSpinner from "../Spinners/LoadingSpinner";

type SubmitButtonProps = {
  isLoading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  children,
  isLoading = false,
  className,
  disabled,
  ...rest
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold shadow-xs transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none",
        className
      )}
      aria-busy={isLoading}
      disabled={isLoading || disabled}
    >
      {children}
      {isLoading && <LoadingSpinner></LoadingSpinner>}
    </button>
  );
}
