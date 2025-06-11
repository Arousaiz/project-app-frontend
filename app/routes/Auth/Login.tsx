import { redirect } from "react-router";
import FormLogo from "~/components/Forms/FormLogo";
import HelpLink from "~/components/Forms/HelpLink";
import { AuthService } from "~/api/api.auth";
import type { Route } from "../../+types/root";
import LoginForm from "~/components/Forms/Auth/LoginForm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth();
  if (res !== undefined) {
    return redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();

  const res = await AuthService.login(data);

  if (res !== undefined) {
    return redirect("/");
  }

  return null;
}

export default function Login() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FormLogo />
        <h2 className="mt-10 text-center">Войдите в ваш аккаунт</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm></LoginForm>
        <p className="mt-10 text-center small-text">
          Ещё не зарегистрированы?{" "}
          <HelpLink to="/register">Создайте новый аккаунт</HelpLink>
        </p>
      </div>
    </>
  );
}
