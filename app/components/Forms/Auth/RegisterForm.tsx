import { authSchema } from "~/zodScheme/authSchema";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useSubmit } from "react-router";
import HelpLink from "../HelpLink";
import SubmitButton from "../SubmitButton";
import Label from "../Label";
import Input from "../Input";
import Form from "../Form";

const formScheme = authSchema.pick({ username: true, password: true });

export default function RegisterForm() {
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

  const onSubmit = (data: z.infer<typeof formScheme>) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="username">Имя пользователя</Label>
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
        <div className="flex">
          <Label htmlFor="password">Пароль</Label>
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
        <SubmitButton>Зарегистрироваться</SubmitButton>
      </div>
    </Form>
  );
}
