import { useForm, type FieldValues } from "react-hook-form";
import type { z } from "zod";
import { useSubmit } from "react-router";
import SubmitButton from "../../ui/Forms/SubmitButton";
import Label from "../../ui/Forms/Label";
import Input from "../../ui/Forms/Input";
import Form from "../../ui/Forms/Form";
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
            {...register("confirmPassword")}
            name="confirmPassword"
            id="confirmPassword"
            type="confirmPassword"
            error={errors.confirmPassword?.message}
          ></Input>
        </div>
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
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
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <div className="mt-2">
          <Input
            {...register("confirmPassword")}
            name="confirmPassword"
            id="confirmPassword"
            type="confirmPassword"
            error={errors.confirmPassword?.message}
          ></Input>
        </div>
      </div>
      <div>
        <SubmitButton>Сбросить пароль</SubmitButton>
      </div>
    </Form>
  );
}
