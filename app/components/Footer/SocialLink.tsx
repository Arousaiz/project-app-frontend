export default function SocialLink({label, link, className, children} : React.PropsWithChildren<{label: string, link: string, className?: string}>) {
    return(
        <a target="_blank" rel='noopener noreferrer' href={link} className={`text-gray-500 hover:text-gray-900 dark:hover:text-white ${className}`}>
            {children}
            <span className="sr-only">{label}</span>
        </a>
    )
}