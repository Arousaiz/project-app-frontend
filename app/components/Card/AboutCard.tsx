import { cn } from "~/utils/utils";

type AboutCardProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function AboutCard({ className, children }: AboutCardProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col border border-border rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1",
        "p-4 sm:p-6",
        "w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
