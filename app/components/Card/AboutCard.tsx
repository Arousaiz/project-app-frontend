export default function AboutCard({
  className,
  children,
}: React.PropsWithChildren<{ className: string }>) {
  return (
    <div
      className={`bg-accent shadow-2xl border border-border rounded-lg hover:-translate-y-2 transition-all ${className}`}
    >
      {children}
    </div>
  );
}
