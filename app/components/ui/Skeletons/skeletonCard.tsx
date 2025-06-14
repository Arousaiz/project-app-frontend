export function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col space-y-3 bg-muted p-4 rounded-xl shadow">
      <div className="bg-border h-32 rounded-md"></div>
      <div className="bg-border h-4 w-3/4 rounded-md"></div>
      <div className="bg-border h-4 w-1/2 rounded-md"></div>
    </div>
  );
}
