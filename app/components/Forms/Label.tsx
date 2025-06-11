export default function Label({
  children,
  htmlFor,
  ...rest
}: React.PropsWithChildren<{ htmlFor: string }>) {
  return (
    <label htmlFor={htmlFor} className="block small-text pt-2" {...rest}>
      {children}
    </label>
  );
}
