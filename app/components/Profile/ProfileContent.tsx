import { Link, NavLink } from "react-router";

export default function ProfileContent({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div>
      <hr className="w-full my-1 border-gray-300 sm:mx-auto dark:border-gray-700" />
      <div className="w-full flex flex-col gap-5 px-3 md:px-6 lg:px-12 md:flex-row">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block border-r border-gray-300 dark:border-gray-700">
          <div className="flex flex-col gap-2 p-4 text-sm  top-12">
            <NavLink
              to={"/profile/settings"}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-900 dark:text-white") +
                " px-3 py-2.5 font-bold hover:border hover:rounded-full"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to={"/profile/address"}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-900 dark:text-white") +
                " px-3 py-2.5 font-bold hover:border hover:rounded-full"
              }
            >
              Address
            </NavLink>
            <NavLink
              to={"/profile/orders"}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-900 dark:text-white") +
                " px-3 py-2.5 font-bold hover:border hover:rounded-full"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to={"/profile/reviews"}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-900 dark:text-white") +
                " px-3 py-2.5 font-bold hover:border hover:rounded-full"
              }
            >
              Reviews
            </NavLink>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 sm:rounded-lg">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
