import { Link } from "react-router";

export default function HelpLink({to, children} : React.PropsWithChildren<{to: string}>) {
    return(
        <div className="text-sm">
            <Link
            to={to}
            className="font-semibold text-blue-600 dark:text-sky-700 hover:text-blue-500 dark:hover:text-sky-500">
                {children}
            </Link>
        </div>
    )
}