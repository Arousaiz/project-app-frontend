import {
  useForm,
  type FieldValues,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { useSubmit } from "react-router";
import Form from "~/components/Forms/Form";
import FormLogo from "~/components/Forms/FormLogo";
import HelpLink from "~/components/Forms/HelpLink";
import Input from "~/components/Forms/Input";
import Label from "~/components/Forms/Label";
import ResetPasswordForm from "~/components/Forms/Auth/ResetPasswordForm";
import SubmitButton from "~/components/Forms/SubmitButton";
import FormField from "~/components/Input/FormField";

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
          <HelpLink to="/register">Создать аккаунт</HelpLink>
        </p>
      </div>
    </>
  );
}
