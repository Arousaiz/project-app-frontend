import {
  useForm,
  type FieldValues,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { redirect, useLoaderData, useSubmit } from "react-router";
import type { z } from "zod";
import CheckBoxInput from "~/components/Forms/CheckBox";
import Form from "~/components/Forms/Form";
import FormLogo from "~/components/Forms/FormLogo";
import HelpLink from "~/components/Forms/HelpLink";
import Input from "~/components/Forms/Input";
import Label from "~/components/Forms/Label";
import SubmitButton from "~/components/Forms/SubmitButton";
import FormField from "~/components/Input/FormField";
import { authSchema } from "~/zodScheme/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "~/providers/authContext";
import { AuthService } from "~/api/api.auth";
import type { Route } from "../+types/root";
import {
  commitSession,
  getSession,
  redirectFromAuth,
} from "~/services/session.server";
import { useEffect } from "react";
import { toast } from "react-toastify";

const formScheme = authSchema.pick({
  username: true,
  password: true,
  remember: true,
});

export async function loader({ request }: Route.LoaderArgs) {
  return await redirectFromAuth(request);
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const data = await request.json();
  let error1 = "Invalid credentials";
  console.log(data);

  const token = await AuthService.login(data).catch((error) => {
    error1 = error?.response?.data?.message;
  });

  if (token === null || token === undefined) {
    session.flash("error", error1);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("token", token);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { error } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);
  const submit = useSubmit();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
      action: "/login",
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full bg-white rounded-lg shadow-blue-500 dark:shadow-sky-700 shadow-md border border-blue-300 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-sky-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <FormLogo />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="mt-2">
                    <Input
                      register={register}
                      name="username"
                      id="username"
                      type="username"
                      errorField={errors.username}
                    ></Input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <HelpLink to="/restore-pass">Forgot Password?</HelpLink>
                  </div>
                  <div className="mt-2">
                    <Input
                      register={register}
                      name="password"
                      id="password"
                      type="password"
                      errorField={errors.password}
                    ></Input>
                  </div>
                </div>
                <Label htmlFor="remember">
                  <div className="flex items-center">
                    <CheckBoxInput
                      register={register}
                      name={"remember"}
                      id={"remember"}
                    ></CheckBoxInput>
                    Remember me
                  </div>
                </Label>
                <div>
                  <SubmitButton>Sign In</SubmitButton>
                </div>
              </Form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{" "}
                <HelpLink to="/register">Create a new account</HelpLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
