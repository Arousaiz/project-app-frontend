import ScrollToTopButton from "../ui/Buttons/BringToTopButton";
import CartSummaryBar from "../Card/CartSummaryBar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import CartModal from "../Modals/CartModal";
import { useState } from "react";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-full">
      <ScrollToTopButton></ScrollToTopButton>
      <Header></Header>
      <Outlet />
      <CartSummaryBar onClick={() => setIsCartOpen(true)} />
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer></Footer>
    </div>
  );
}
