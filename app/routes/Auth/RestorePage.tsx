import EmailForm from "~/components/Forms/Auth/EmailForm";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";
import FormLogo from "~/components/ui/Logo/FormLogo";

export async function clientAction({ request }: any) {
  const data = await request.json();
  console.log(data);
}

export default function RestorePage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FormLogo />
        <h2 className="mt-10 text-center">
          Забыли пароль? Введите вашу почту и ожидайте дальнейших инструкций
        </h2>
      </div>

      <EmailForm></EmailForm>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
