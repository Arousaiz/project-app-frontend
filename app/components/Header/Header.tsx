"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import NavigationLink from "./NavigationLink";
import SidebarNavLink from "./SidebarNavLink";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import Search from "../Search/Search";
import { AuthService } from "~/api/api.auth";
import { ModeToggle } from "../theme/toggle-mode";
import { Heart, History, Text, User } from "lucide-react";
import CitySelectModal from "../Modals/CitySelectModal";
import PrimaryButton from "../Buttons/PrimaryButton";
import CitySelectMenu from "../Menu/Menus/CitySelectMenu";
import ProfileMenu from "../Menu/Menus/ProfileMenu";
import Sidebar from "../Modals/Sidebar";
import { useAuth } from "~/providers/authContext";
import { isNullOrUndefined } from "~/utils/utils";

export const cities = [
  "Минск",
  "Гродно",
  "Витебск",
  "Брест",
  "Гомель",
  "Могилев",
];

const nav = [
  {
    to: "/profile/settings",
    title: "Профиль",
    icon: User,
  },
  {
    to: "/profile/orders",
    title: "Заказы",
    icon: History,
  },
  {
    to: "/profile/reviews",
    title: "Отзывы",
    icon: Text,
  },
  {
    to: "/profile/favorites",
    title: "Избранное",
    icon: Heart,
  },
];

const base_nav = [
  { to: "/", title: "Главная" },
  { to: "/about", title: "О нас" },
  { to: "/contact", title: "Контакты" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading, error, login, logout } = useAuth();
  const loggedIn = !isNullOrUndefined(user);
  const [city, setCity] = useState<string | null>(localStorage.getItem("city"));
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout();
    return navigate("/login");
  };

  return (
    <header className="bg-sidebar text-sidebar-foreground shadow-2xl w-full">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center justify-between lg:justify-normal h-10  w-full">
          <Logo className="p-4 hidden lg:block">
            <span className="sr-only">Доставка еды</span>
          </Logo>
          <Search />
          <div className="hidden lg:flex ">
            <CitySelectMenu
              city={city}
              setCity={(city) => setCity(city)}
            ></CitySelectMenu>
            <ModeToggle></ModeToggle>
          </div>

          <div className="flex lg:hidden">
            <PrimaryButton
              variant="ghost"
              className="w-full inline-flex"
              onClick={() => setModalOpen(true)}
            >
              {city}
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-1 my-0.5 size-5"
              />
            </PrimaryButton>
          </div>

          <div className="flex lg:hidden">
            <PrimaryButton
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className=""
            >
              <span className="sr-only">Открыть главное меню</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </PrimaryButton>
          </div>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:justify-end items-center">
          {base_nav.map((link) => (
            <NavigationLink key={link.title} to={link.to}>
              {link.title}
            </NavigationLink>
          ))}
          {loggedIn ? (
            <div className={`hidden lg:flex lg:flex-1 lg:justify-end`}>
              <ProfileMenu nav={nav} handleLogout={handleLogout}></ProfileMenu>
            </div>
          ) : (
            <div className={`${"hidden lg:flex lg:flex-1 lg:justify-end"}`}>
              <NavigationLink to="/login">
                Войти <span aria-hidden="true">&rarr;</span>
              </NavigationLink>
            </div>
          )}
        </PopoverGroup>
      </nav>
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        loggedIn={loggedIn}
        base_nav={base_nav}
        nav={nav}
      ></Sidebar>
      <CitySelectModal
        city={city}
        setCity={(city) => setCity(city)}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      ></CitySelectModal>
    </header>
  );
}
