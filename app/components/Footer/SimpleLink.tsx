import { Link } from "react-router";

type SimpleLinkProps = {
  children?: React.ReactNode;
  to: string;
  className?: string;
};

export default function SimpleLink({
  to,
  children,
  className,
}: SimpleLinkProps) {
  return (
    <Link to={to} className={`small-text hover:text-primary ${className}`}>
      {children}
    </Link>
  );
}
