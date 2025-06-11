import { NavLink } from "react-router";

export default function NavigationLink({
  to,
  children,
  className,
}: React.PropsWithChildren<{ to: string; className?: string }>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "text-primary " : " ") +
        " text-md/6 font-semibold hover:text-primary " +
        className
      }
    >
      {children}
    </NavLink>
  );
}
