export default function Logo({className, children} : React.PropsWithChildren<{className?: string}> ) {
    return(
        <a href="/" className={`-m-1.5 p-1.5 ${className}`}>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=600"
              className="h-8 w-auto"
            />
            {children}
        </a>
    )
}