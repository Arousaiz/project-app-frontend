import {
  useForm,
  type FieldValues,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { useSubmit } from "react-router";
import EmailForm from "~/components/Forms/Auth/EmailForm";
import Form from "~/components/Forms/Form";
import FormLogo from "~/components/Forms/FormLogo";
import HelpLink from "~/components/Forms/HelpLink";
import Input from "~/components/Forms/Input";
import Label from "~/components/Forms/Label";
import SubmitButton from "~/components/Forms/SubmitButton";
import FormField from "~/components/Input/FormField";

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
          <HelpLink to="/register">Создать аккаунт</HelpLink>
        </p>
      </div>
    </>
  );
}
