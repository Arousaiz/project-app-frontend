import { Link } from "react-router";

export default function SimpleLink({to, children} : React.PropsWithChildren<{to: string}>){
    return(
        <Link
        to={to}
        className={"text-gray-500 dark:text-gray-400 text-md/6 font-semibold hover:text-blue-600"
        }>
            {children}
        </Link>
    )
}