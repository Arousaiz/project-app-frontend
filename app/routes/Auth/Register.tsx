import { redirect } from "react-router";
import FormLogo from "~/components/Forms/FormLogo";
import HelpLink from "~/components/Forms/HelpLink";
import type { Route } from "../../+types/root";
import { AuthService } from "~/api/api.auth";
import RegisterForm from "~/components/Forms/Auth/RegisterForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Register page" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth().catch((error) => {});
  if (res !== undefined) {
    return redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.json();

  const res = await AuthService.register(data);

  if (res !== undefined) {
    return redirect("/login");
  }

  return null;
}

export default function Register() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FormLogo />
        <h2 className="mt-10 text-center">Создайте новый аккаунт</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm></RegisterForm>
        <p className="mt-10 text-center small-text">
          Уже есть аккаунт? <HelpLink to="/login">Войти</HelpLink>
        </p>
      </div>
    </>
  );
}
