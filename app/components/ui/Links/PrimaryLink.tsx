import { Link, NavLink } from "react-router";
import { cn } from "~/utils/utils";

type PrimaryLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  size?: "sm" | "md" | "lg";
  nav?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function PrimaryLink({
  to,
  children,
  className,
  external,
  size = "md",
  nav = false,
  ...props
}: PrimaryLinkProps) {
  const sizeMap = {
    sm: "text-xs gap-1 [&>svg]:size-4",
    md: "text-sm gap-1.5 [&>svg]:size-5",
    lg: "text-base gap-2 [&>svg]:size-6",
  };

  const common = cn(
    "inline-flex items-center font-medium hover:text-primary transition-colors",
    sizeMap[size],
    className
  );
  if (external)
    return (
      <a
        href={to}
        className={common}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  return nav ? (
    <NavLink
      to={to}
      className={({ isActive }) => cn(common, isActive && "text-primary")}
      {...props}
    >
      {children}
    </NavLink>
  ) : (
    <Link to={to} className={common} {...props}>
      {children}
    </Link>
  );
}
