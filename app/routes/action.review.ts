import { requireAuthCookie } from "~/services/session.server";
import type { Route } from "../+types/root";
import { ReviewService } from "~/api/api.review";

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);

  console.log(token);

  const res: {
    menuItemId: string;
    rating: number;
    text: string;
  } = await request.json();

  const response = ReviewService.writeReview(res, token).catch((error) =>
    console.log(error)
  );

  return { response };
}
