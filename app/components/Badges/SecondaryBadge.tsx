type SecondaryBadgeProps = {
  children?: React.ReactNode;
};

export default function SecondaryBadge({ children }: SecondaryBadgeProps) {
  return (
    <div className="rounded-3xl bg-secondary text-secondary-foreground text-center px-1 text-sm truncate select-none mx-1 ">
      {children}
    </div>
  );
}
