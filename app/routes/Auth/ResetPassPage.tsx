import FormLogo from "~/components/ui/Logo/FormLogo";
import ResetPasswordForm from "~/components/Forms/Auth/ResetPasswordForm";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";

export async function clientAction({ request }: any) {
  const data = await request.json();
  if (data.password == data.confirmPassword) {
    console.log(data);
  }
  console.log("wrong data");
}

export default function ResetPassPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FormLogo />
        <h2 className="mt-10 text-center">Сбросьте ваш пароль.</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm></ResetPasswordForm>
        <p className="mt-10 text-center small-text">
          Ещё не зарегистрированы?{" "}
          <PrimaryLink className="underline" to="/register">
            Создать аккаунт
          </PrimaryLink>
        </p>
      </div>
    </>
  );
}
