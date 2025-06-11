import { Outlet } from "react-router";

export default function authLayout() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="w-full bg-background/70 rounded-lg shadow-md border border-border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
