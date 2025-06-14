import { authSchema } from "~/zodScheme/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useSubmit } from "react-router";
import SubmitButton from "../../ui/Forms/SubmitButton";
import Label from "../../ui/Forms/Label";
import Input from "../../ui/Forms/Input";
import Form from "../../ui/Forms/Form";

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
            {...register("username")}
            name="username"
            id="username"
            type="username"
            error={errors.username?.message}
          ></Input>
        </div>
      </div>
      <div>
        <div className="flex">
          <Label htmlFor="password">Пароль</Label>
        </div>
        <div className="mt-2">
          <Input
            {...register("password")}
            name="password"
            id="password"
            type="password"
            error={errors.password?.message}
          ></Input>
        </div>
      </div>
      <div>
        <SubmitButton>Зарегистрироваться</SubmitButton>
      </div>
    </Form>
  );
}
