function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm ${className}`}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`px-4 ${className}`} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`flex items-center px-6 ${className}`} {...props} />;
}

export { Card, CardContent, CardFooter };
