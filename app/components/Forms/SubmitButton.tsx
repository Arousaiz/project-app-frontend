export default function SubmitButton({ children }: React.PropsWithChildren) {
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
    </button>
  );
}
