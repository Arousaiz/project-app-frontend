"use client";

import { useState } from "react";
import { PopoverGroup } from "@headlessui/react";
import Logo from "../ui/Logo/Logo";
import Search from "../Search/Search";
import { ModeToggle } from "../theme/toggle-mode";
import {
  AlignJustify,
  ChevronDown,
  Heart,
  History,
  Map,
  Text,
  User,
} from "lucide-react";
import CitySelectModal from "../Modals/CitySelectModal";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import CitySelectMenu from "../Menus/CitySelectMenu";
import ProfileMenu from "../Menus/ProfileMenu";
import Sidebar from "../Modals/Sidebar";
import { useAuth } from "~/providers/authContext";
import { isNullOrUndefined } from "~/utils/utils";
import { PrimaryLink } from "../ui/Links/PrimaryLink";
import { useNavigate } from "react-router";

export const cities = [
  "Минск",
  "Гродно",
  "Витебск",
  "Брест",
  "Гомель",
  "Могилев",
];

export const nav = [
  {
    to: "/profile/settings",
    title: "Профиль",
    icon: User,
  },
  {
    to: "/profile/address",
    title: "Адрес",
    icon: Map,
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
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
              setCity={(city) => {
                setCity(city);
                localStorage.setItem("city", city);
                window.location.reload();
              }}
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
              <ChevronDown aria-hidden="true" className="ml-1 my-0.5 size-5" />
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
              <AlignJustify aria-hidden="true" className="size-6" />
            </PrimaryButton>
          </div>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:justify-end items-center">
          {base_nav.map((link) => (
            <PrimaryLink nav={true} key={link.title} to={link.to}>
              {link.title}
            </PrimaryLink>
          ))}
          {loggedIn ? (
            <div className={`hidden lg:flex lg:flex-1 lg:justify-end`}>
              <ProfileMenu nav={nav} handleLogout={handleLogout}></ProfileMenu>
            </div>
          ) : (
            <div className={`${"hidden lg:flex lg:flex-1 lg:justify-end"}`}>
              <PrimaryLink nav={true} to="/login">
                Войти <span aria-hidden="true">&rarr;</span>
              </PrimaryLink>
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
        setCity={(city) => {
          setCity(city);
          localStorage.setItem("city", city);
          window.location.reload();
        }}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      ></CitySelectModal>
    </header>
  );
}
