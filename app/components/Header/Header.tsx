"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Select,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  DocumentArrowUpIcon,
  PhoneIcon,
  PlayCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import SearchBar from "../Search/SearchBar/SearchBar";
import NavigationLink from "./NavigationLink";
import SidebarNavLink from "./SidebarNavLink";
import Logo from "./Logo";
import HelpLink from "../Forms/HelpLink";
import SimpleLink from "../Footer/SimpleLink";
import {
  Link,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router";
import type {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";
import { useAuth } from "~/providers/authContext";
import type { loader } from "~/pages/HomePage";
import Search from "../Search/Search";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedIn(!!data?.user);
  }, [data?.user]);

  useEffect(() => {
    if (data.city.city.length) {
      setCity(data?.city.city);
    }
  });

  return (
    <header className="bg-blue-50 dark:bg-gray-900 shadow-md shadow-gray-200 dark:shadow-gray-900">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center h-10">
          <Logo className="mx-4">
            <span className="sr-only">Food delivery</span>
          </Logo>
          <Search />
          <Select
            className={
              "hidden sm:block max-w-sm mx-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            value={city?.length ? city : ""}
            onChange={(e) => {
              const formData = new FormData();
              formData.append("city", e.target.value);
              submit(formData, {
                method: "POST",
                action: "/action/set-city",
              });
              setTimeout(() => navigate(0), 200);
            }}
          >
            <option>Минск</option>
            <option value={"Hrodna"}>Гродно</option>
            <option>Витебск</option>
            <option>Брест</option>
            <option>Гомель</option>
            <option>Могилев</option>
          </Select>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:justify-end items-center">
          <NavigationLink to="/">Home</NavigationLink>
          <NavigationLink to="/about">About</NavigationLink>
          <NavigationLink to="/contact">Contact</NavigationLink>
          <div
            className={`${
              loggedIn ? "hidden" : "hidden lg:flex lg:flex-1 lg:justify-end"
            }`}
          >
            <NavigationLink to="/login">
              Log in <span aria-hidden="true">&rarr;</span>
            </NavigationLink>
          </div>
          <div className={`${loggedIn ? "flex" : "hidden"}`}>
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton>
                <UserCircleIcon className="size-8 hover:scale-115"></UserCircleIcon>
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-gray-300 bg-white dark:border-gray-900 dark:bg-gray-600 text-sm/6 dark:text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
              >
                <div className="flex flex-col">
                  <MenuItem>
                    <Link
                      to={"/profile/settings"}
                      className="font-bold dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden group"
                    >
                      <div className="block px-4 py-2 text-black dark:text-white group-hover:text-gray-500">
                        Profile
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to={"/profile/orders"}
                      className="font-bold dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden group"
                    >
                      <div className="block px-4 py-2 text-black dark:text-white group-hover:text-gray-500">
                        Orders
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to={"/profile/reviews"}
                      className="font-bold dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden group"
                    >
                      <div className="block px-4 py-2 text-black dark:text-white group-hover:text-gray-500">
                        Reviews
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to={"/profile/favorites"}
                      className="font-bold dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden group"
                    >
                      <div className="block px-4 py-2 text-black dark:text-white group-hover:text-gray-500">
                        Favorites
                      </div>
                    </Link>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <form
                      className="font-bold dark:data-focus:bg-gray-100 dark:data-focus:text-gray-900 data-focus:bg-gray-200 data-focus:outline-hidden group"
                      method="POST"
                      action={"/logout"}
                    >
                      <button
                        className="flex items-center px-4 py-2 text-black dark:text-white group-hover:text-gray-500"
                        type="submit"
                      >
                        <p>Logout</p>
                      </button>
                    </form>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </PopoverGroup>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Logo>
              <span className="sr-only">Food delivery</span>
            </Logo>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <SidebarNavLink to="/">Home</SidebarNavLink>
                <SidebarNavLink to="/about">About</SidebarNavLink>
                <SidebarNavLink to="/contact">Contact</SidebarNavLink>
              </div>
              <div className="py-6">
                <SidebarNavLink to="/login">Log in</SidebarNavLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
