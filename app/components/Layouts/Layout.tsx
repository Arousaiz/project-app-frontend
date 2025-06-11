import ScrollToTopButton from "../Buttons/BringToTopButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-full">
      <ScrollToTopButton></ScrollToTopButton>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
