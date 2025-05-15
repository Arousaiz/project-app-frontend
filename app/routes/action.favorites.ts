import { requireAuthCookie } from "~/services/session.server";
import type { Route } from "../+types/root";
import { FavoritesService } from "~/api/api.favorites";

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);

  const res: {
    menuItemId: string;
    restaurantId: string;
    _intent: string;
  } = await request.json();

  if (res._intent === "add") {
    await FavoritesService.createFavorite({
      menuItemId: res.menuItemId,
      restaurantId: res.restaurantId,
      token: token,
    });
  } else if (res._intent === "remove") {
    await FavoritesService.deleteFavorite(res.menuItemId, token);
  }

  return { success: true };
}
