import { Link } from "react-router";

export default function Logo({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Link to="/" className={`-m-1.5 p-1.5 ${className}`}>
      <img
        alt=""
        src="/app/assets/logo_temp.png"
        className="h-8 w-auto bg-transparent"
      />
      {children}
    </Link>
  );
}
