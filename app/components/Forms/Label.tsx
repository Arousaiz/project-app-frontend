export default function Label({children, htmlFor, ...rest} : React.PropsWithChildren<{htmlFor: string}>) {
    return(
        <label htmlFor={htmlFor} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-200" {...rest}>
            {children}
        </label>
    )
}