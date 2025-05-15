import { createCookie } from "react-router";

export const cityCookie = createCookie("city", {
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 дней
});

export async function getCityCookie(
  request: Request
): Promise<{ city: string }> {
  const cookieHeader = request.headers.get("Cookie");
  const city = (await cityCookie.parse(cookieHeader)) || "Гродно";
  return city;
}
