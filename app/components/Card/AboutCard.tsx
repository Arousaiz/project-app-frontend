export default function AboutCard({className, children}: React.PropsWithChildren<{className: string}>) {
    return(
        <div className={`bg-neutral-100/50 dark:bg-gray-400/30 shadow-md shadow-gray-400 dark:shadow-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:-translate-y-2 transition-all ${className}`}>
            {children}
        </div>
    )
}