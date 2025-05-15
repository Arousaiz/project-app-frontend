import { ProfileService } from "~/api/api.profile";
import type { Route } from "../+types/root";
import { requireAuthCookie } from "~/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuthCookie(request);
  const data = await request.json();
  let errorMsg = "Something went wrong";
  const response = await ProfileService.editInfo(data, token).catch((error) => {
    console.log(error);
    errorMsg = error?.response?.data?.message;
  });

  if (response === null || response === undefined) {
    return { message: errorMsg.toString() };
  }

  return response;
}
