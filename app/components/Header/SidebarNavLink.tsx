import { NavLink } from "react-router";

export default function SidebarNavLink({to, children} : React.PropsWithChildren<{to: string}>){
    return(
        <NavLink
        to={to}
        className={({ isActive }) =>
            (isActive ? "text-blue-600" : "text-gray-900 dark:text-white") + " -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-blue-600"
        }>
            {children}
        </NavLink>
    )
}