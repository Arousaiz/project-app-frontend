import Label from "~/components/Forms/Label";
import Input from "~/components/Forms/Input";
import { useForm, type FieldValues } from "react-hook-form";
import { Form, redirect, useLoaderData, useSubmit } from "react-router";
import CheckBoxInput from "~/components/Forms/CheckBox";
import FormLogo from "~/components/Forms/FormLogo";
import HelpLink from "~/components/Forms/HelpLink";
import SubmitButton from "~/components/Forms/SubmitButton";
import { authSchema } from "~/zodScheme/authSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "../+types/root";
import {
  commitSession,
  getSession,
  redirectFromAuth,
} from "~/services/session.server";
import { AuthService } from "~/api/api.auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const formScheme = authSchema.pick({ username: true, password: true });

export async function loader({ request }: Route.LoaderArgs) {
  return await redirectFromAuth(request);
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let error = "Something went wrong. Try again later.";
  const data = await request.json();

  const message = await AuthService.register(data).catch((error) => {
    console.log(error);
    error = error?.response?.data?.message;
  });

  if (!message) {
    session.flash("error", error);

    return redirect("/register", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return redirect("/login");
}

export default function Register() {
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
  const submit = useSubmit();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
      action: "/register",
    });
  };
  const { error } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center  px-6 py-12 lg:px-8">
        <div className="w-full bg-white rounded shadow-blue-500 dark:shadow-sky-700 shadow-md border border-blue-300 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-sky-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <FormLogo />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Create new account
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
                <div>
                  <SubmitButton>Sign Up</SubmitButton>
                </div>
              </Form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account? <HelpLink to="/login">Login</HelpLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
