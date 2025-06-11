type SocialLinkProps = {
  label: string;
  link: string;
  className?: string;
  children?: React.ReactNode;
};

export default function SocialLink({
  label,
  link,
  className,
  children,
}: SocialLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      className={`hover:text-foreground/50 ${className}`}
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
}
