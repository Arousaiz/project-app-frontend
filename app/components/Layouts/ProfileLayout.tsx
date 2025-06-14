import ProfileContent from "../Profile/ProfileContent";

type ProfileLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};

export function ProfileLayout({ children, header }: ProfileLayoutProps) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-[70dvh] mt-10">
      {header}
      <ProfileContent>
        <div className="w-6/12 justify-self-center">{children}</div>
      </ProfileContent>
    </div>
  );
}
