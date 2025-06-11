import { NavLink } from "react-router";

export default function SidebarNavLink({
  to,
  children,
  className,
}: React.PropsWithChildren<{ to: string; className?: string }>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "text-primary " : " ") +
        ` -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary ${className}`
      }
    >
      {children}
    </NavLink>
  );
}
