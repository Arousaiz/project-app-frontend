import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Login from "~/pages/Login";
import Layout from "~/components/Layouts/Layout";
import TestPage from "~/pages/Test";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <TestPage />;
}
