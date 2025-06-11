export default function LoadingSpinner({ size = 5 }: { size?: number }) {
  return (
    <div
      className={`w-${size} h-${size} border-2 border-t-transparent border-primary rounded-full animate-spin`}
    />
  );
}
