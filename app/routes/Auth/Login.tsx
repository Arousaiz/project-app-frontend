import { redirect, useNavigate } from "react-router";
import FormLogo from "~/components/ui/Logo/FormLogo";
import { AuthService } from "~/api/api.auth";
import type { Route } from "../../+types/root";
import LoginForm from "~/components/Forms/Auth/LoginForm";
import { isNullOrUndefined } from "~/utils/utils";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";
import { useAuth } from "~/providers/authContext";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login page" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const res = await AuthService.checkAuth();
  if (!isNullOrUndefined(res)) {
    return redirect("/");
  }
}

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

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
          <PrimaryLink className="underline" to="/register">
            Создайте новый аккаунт
          </PrimaryLink>
        </p>
      </div>
    </>
  );
}
