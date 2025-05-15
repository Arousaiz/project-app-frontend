import { fetchUser } from "~/services/session.server";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import { getCityCookie } from "~/services/cookie.server";
import type { Route } from "../../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
  const city = await getCityCookie(request);
  const user = await fetchUser(request);
  return { user, city };
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-full">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
