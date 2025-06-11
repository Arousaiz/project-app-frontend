import { useForm, type FieldValues } from "react-hook-form";
import type { z } from "zod";
import { useSubmit } from "react-router";
import SubmitButton from "../SubmitButton";
import Label from "../Label";
import Input from "../Input";
import Form from "../Form";
import { authSchema } from "~/zodScheme/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const formScheme = authSchema
  .omit({ username: true, email: true })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otpCode: "",
    },
  });
  const submit = useSubmit();

  const onSubmit = (data: z.infer<typeof formScheme>) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
      action: "/reset-pass",
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        {/* Change this to 6 fields with number */}
        <Label htmlFor="confirmPassword">Код подтверждения</Label>
        <div className="mt-2">
          <Input
            register={register}
            name="confirmPassword"
            id="confirmPassword"
            type="confirmPassword"
            errorField={errors.confirmPassword}
          ></Input>
        </div>
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
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
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <div className="mt-2">
          <Input
            register={register}
            validateOptions={{
              required: { value: true, message: "Confirm your password" },
            }}
            name="confirmPassword"
            id="confirmPassword"
            type="confirmPassword"
            errorField={errors.confirmPassword}
          ></Input>
        </div>
      </div>
      <div>
        <SubmitButton>Сбросить пароль</SubmitButton>
      </div>
    </Form>
  );
}
