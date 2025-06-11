import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/Layouts/authLayout.tsx", [
    route("/login", "./routes/Auth/Login.tsx"),
    route("/register", "./routes/Auth/Register.tsx"),
    route("/restore-pass", "./routes/Auth/RestorePage.tsx"),
    route("/reset-pass", "./routes/Auth/ResetPassPage.tsx"),
  ]),
  route("/logout", "routes/logout.tsx"),
  layout("./components/Layouts/Layout.tsx", [
    index("./routes/HomePage.tsx"),
    route("/about", "./routes/Info/About.tsx"),
    route("/contact", "./routes/Info/Contact.tsx"),
    route("/faq", "./routes/Info/FAQ.tsx"),
    route("/privacy", "./routes/Info/PrivacyPolicy.tsx"),
    route("/terms", "./routes/Info/TermsOfService.tsx"),
    route("/profile/settings", "./routes/Profile/Profile.tsx"),
    route("/profile/address", "./routes/Profile/profile-address.tsx"),
    route("/profile/reviews", "./routes/Profile/profile-reviews.tsx"),
    route("/profile/orders", "./routes/Profile/profile-orders.tsx"),
    route("/profile/favorites", "./routes/Profile/profile-favorites.tsx"),
    route("/test", "./routes/Test.tsx"),
    route("/restaurant/:id", "./routes/RestaurantPage.tsx"),
    route("/order", "./routes/place-order.tsx"),
  ]),
  route("/.well-known/appspecific/:path", "./routes/action.stfuplz.ts"),
] satisfies RouteConfig;
