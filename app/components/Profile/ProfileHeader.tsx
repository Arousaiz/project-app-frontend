import { UserIcon } from "@heroicons/react/20/solid";
import SimpleLink from "../Footer/SimpleLink";

export default function ProfileHeader({
  username,
  bonusPoints = "0",
}: {
  username?: string;
  bonusPoints?: string;
}) {
  return (
    <div className="flex p-10">
      <UserIcon className="size-52"></UserIcon>
      <div className="flex flex-col p-10">
        <p className="font-bold text-3xl">{username ? username : "Profile"}</p>
        <div className="flex flex-col items-center">
          <div className="bg-primary text-primary-foreground font-bold rounded-lg flex w-fit items-center justify-center p-4 mt-2">
            {bonusPoints} очков
          </div>
          <SimpleLink to="/bonus-shop">Магазин бонусов</SimpleLink>
        </div>
      </div>
    </div>
  );
}
