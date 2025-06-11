import type { Route } from "../+types/root";

export async function clientAction({ request }: Route.ActionArgs) {
  return null;
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  return null;
}
