import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Dialog, DialogPanel } from "@headlessui/react";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import Logo from "../ui/Logo/Logo";
import { PrimaryLink } from "../ui/Links/PrimaryLink";

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
      <DialogPanel className="fixed inset-y-0 right-0 z-[1000] w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:border-border sm:border-l bg-sidebar text-sidebar-foreground">
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
                <PrimaryLink
                  nav={true}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary"
                  key={link.to}
                  to={link.to}
                >
                  {link.title}
                </PrimaryLink>
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
                      <PrimaryLink
                        nav={true}
                        key={link.to}
                        to={link.to}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary gap-x-4 items-center"
                      >
                        {link.icon && <link.icon />}
                        {link.title}
                      </PrimaryLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6">
                <PrimaryLink
                  nav={true}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:text-primary"
                  to="/login"
                >
                  Войти
                </PrimaryLink>
              </div>
            )}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
