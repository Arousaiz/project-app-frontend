import { NavLink } from "react-router";

export default function NavigationLink({to, children} : React.PropsWithChildren<{to: string}>){
    return(
        <NavLink
        to={to}
        className={({ isActive }) =>
            (isActive ? "text-blue-600" : "text-gray-900 dark:text-white") + " text-md/6 font-semibold hover:text-blue-600"
        }>
            {children}
        </NavLink>
    )
}