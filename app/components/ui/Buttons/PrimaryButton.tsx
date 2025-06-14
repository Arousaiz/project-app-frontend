import { cn } from "~/utils/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "text";

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export default function PrimaryButton<T extends React.ElementType = "button">({
  onClick,
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  as,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:border-ring focus:ring-ring/50 focus:ring-[3px]`,
        {
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus:ring-primary/50":
            variant === "primary",
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus:ring-destructive/20 dark:focus:ring-destructive/40 dark:bg-destructive/60":
            variant === "destructive",
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus:ring-accent/75 dark:focus:ring-input":
            variant === "outline",
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 focus:ring-secondary/75":
            variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:ring-accent/75":
            variant === "ghost",

          "h-9 px-4 py-2 has-[>svg]:px-3": size === "md",
          "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5": size === "sm",
          "h-10 rounded-md px-6 has-[>svg]:px-4": size === "lg",
          "size-9 rounded-full": size === "icon",

          "pointer-events-none opacity-70": isLoading,
        },
        className
      )}
      onClick={onClick}
      {...(Component === "button" ? { type: "button" } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}
