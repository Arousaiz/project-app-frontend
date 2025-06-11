import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Dialog, DialogPanel } from "@headlessui/react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Logo from "../Header/Logo";
import SidebarNavLink from "../Header/SidebarNavLink";

export default function Sidebar({
  mobileMenuOpen,
  setMobileMenuOpen,
  loggedIn,
  base_nav,
  nav,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  loggedIn: boolean;
  base_nav: { to: string; title: string }[];
  nav?: { to: string; title: string; icon?: React.ElementType }[];
}) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <DialogPanel className="fixed inset-y-0 right-0 z-[1000] w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-ring/10 bg-sidebar text-sidebar-foreground">
        <div className="flex items-center justify-between">
          <Logo>
            <span className="sr-only">Доставка еды</span>
          </Logo>
          <PrimaryButton
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5"
          >
            <span className="sr-only">Закрыть меню</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </PrimaryButton>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-sidebar/10">
            <div className="space-y-2 py-6">
              {base_nav.map((link) => (
                <SidebarNavLink key={link.to} to={link.to}>
                  {link.title}
                </SidebarNavLink>
              ))}
            </div>

            {loggedIn ? (
              <div className="">
                <button
                  onClick={() => setSubMenuOpen((prev) => !prev)}
                  className="flex items-center w-full text-left font-semibold hover:bg-accent rounded"
                >
                  <span>Пользователь</span>
                  {subMenuOpen ? (
                    <ChevronUpIcon className="size-4" />
                  ) : (
                    <ChevronDownIcon className="size-4" />
                  )}
                </button>

                {subMenuOpen && (
                  <div className="mt-2 space-y-1 pl-6">
                    {nav?.map((link) => (
                      <SidebarNavLink
                        key={link.to}
                        to={link.to}
                        className="flex gap-x-4 items-center"
                      >
                        {link.icon && <link.icon />}
                        {link.title}
                      </SidebarNavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6">
                <SidebarNavLink to="/login">Войти</SidebarNavLink>
              </div>
            )}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
