type PrimaryBadgeProps = {
  children?: React.ReactNode;
};

export default function PrimaryBadge({ children }: PrimaryBadgeProps) {
  return (
    <div className="rounded-3xl bg-primary text-primary-foreground text-center px-1 text-sm truncate select-none mx-1">
      {children}
    </div>
  );
}
