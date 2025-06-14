import { SocialIcon } from "../ui/Icons/SocialIcons";
import { PrimaryLink } from "../ui/Links/PrimaryLink";

type SocialLinkItem = {
  label: string;
  link: string;
  icon: "instagram" | "github" | "telegram" | "vk";
  className?: string;
};

const socialLinks: SocialLinkItem[] = [
  {
    label: "Instagram link",
    link: "/instagram",
    icon: "instagram",
  },
  {
    label: "Github link",
    link: "/github",
    icon: "github",
  },
  {
    label: "Telegram link",
    link: "/telegram",
    icon: "telegram",
  },
  {
    label: "VK link",
    link: "/vk",
    icon: "vk",
  },
];

export function SocialLinks() {
  return (
    <div className="flex gap-x-2">
      {socialLinks.map(({ label, link, icon, className }) => (
        <PrimaryLink
          external={true}
          key={icon}
          to={link}
          size="lg"
          className={`${className}`}
        >
          <SocialIcon icon={icon} />
        </PrimaryLink>
      ))}
    </div>
  );
}
