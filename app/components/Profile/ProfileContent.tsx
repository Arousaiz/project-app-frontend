import { Heart, History, Text, User } from "lucide-react";
import NavigationLink from "../Header/NavigationLink";

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

export default function ProfileContent({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div>
      <hr className="w-full my-1 border-border sm:mx-auto" />
      <div className="w-full flex flex-col gap-5 px-3 md:px-6 lg:px-12 md:flex-row">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block border-r border-border">
          <div className="flex flex-col gap-2 p-4 text-sm top-12">
            {nav?.length ? (
              nav.map((link) => (
                <NavigationLink
                  to={link.to}
                  className="flex justify-between border-2 hover:border-primary rounded-xl p-4 hover:-translate-y-1 transition-all text-base"
                >
                  {link.title}
                  {link.icon && <link.icon />}
                </NavigationLink>
              ))
            ) : (
              <div></div>
            )}
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
