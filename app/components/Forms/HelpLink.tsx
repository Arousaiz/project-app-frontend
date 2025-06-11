import { Link } from "react-router";

export default function HelpLink({
  to,
  children,
}: React.PropsWithChildren<{ to: string }>) {
  return (
    <div className="text-sm pt-1">
      <Link
        to={to}
        className="font-semibold text-foreground/50 hover:text-primary/50"
      >
        {children}
      </Link>
    </div>
  );
}
