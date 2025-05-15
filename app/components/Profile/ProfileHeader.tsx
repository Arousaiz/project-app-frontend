import { UserIcon } from "@heroicons/react/20/solid";

export default function ProfileHeader({ username }: { username?: string }) {
  return (
    <div className="flex p-10">
      <UserIcon className="size-52"></UserIcon>
      <p className="font-bold text-3xl p-10">
        {username ? username : "Profile"}
      </p>
    </div>
  );
}
