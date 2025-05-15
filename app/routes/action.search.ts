import { getCityCookie } from "~/services/cookie.server";
import type { Route } from "../+types/root";
import { RestaurantService } from "~/api/api.restaurant";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.json();
  const city = await getCityCookie(request);
  const query = formData;
  const res = await RestaurantService.searchRestaurants(city.city, query);

  return { res };
}
