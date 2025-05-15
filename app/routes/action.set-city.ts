import { redirect } from "react-router";
import type { Route } from "../+types/root";
import { cityCookie } from "~/services/cookie.server";

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await cityCookie.parse(cookieHeader)) || {};
  const req = await request.formData();
  const city = req.get("city");

  cookie.city = city;

  return redirect("/", {
    headers: {
      "Set-Cookie": await cityCookie.serialize(cookie),
    },
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  return redirect("/");
}
