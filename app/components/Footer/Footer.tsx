import Logo from "../ui/Logo/Logo";
import { SocialLinks } from "./SocialLinks";
import { PrimaryLink } from "../ui/Links/PrimaryLink";

type LinkGroup = {
  title: string;
  links: {
    text: string;
    to: string;
  }[];
};

const footerLinks: LinkGroup[] = [
  {
    title: "Компания",
    links: [
      { text: "О нас", to: "/about" },
      { text: "Контакты", to: "/contact" },
      { text: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Соглашения",
    links: [
      { text: "Политика приватности", to: "/privacy" },
      { text: "Условия и положения", to: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo className="flex items-center">
              <span className="self-center large-text whitespace-nowrap mx-4">
                Доставка еды
              </span>
            </Logo>
            <h3 className="mt-6">Ваш пропуск в город вкусов.</h3>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="pb-6">{group.title}</h3>
                <ul className="small-text space-y-4">
                  {group.links.map((link) => (
                    <li key={link.to} className="">
                      <PrimaryLink to={link.to}>{link.text}</PrimaryLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-border sm:mx-auto border lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © 2025{" "}
            <a href="" className="hover:underline">
              Food delivery
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
