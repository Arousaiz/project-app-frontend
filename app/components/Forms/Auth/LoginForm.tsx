import { Controller, useForm } from "react-hook-form";
import { authSchema } from "~/zodScheme/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useNavigate } from "react-router";
import SubmitButton from "../../ui/Forms/SubmitButton";
import Label from "../../ui/Forms/Label";
import Input from "../../ui/Forms/Input";
import Form from "../../ui/Forms/Form";
import { useAuth } from "~/providers/authContext";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";
import { CheckBox } from "~/components/ui/Buttons/Checkbox";
import ErrorMessage from "../../ui/Forms/ErrorMessage";
import { toast } from "sonner";

const formScheme = authSchema.pick({
  username: true,
  password: true,
  remember: true,
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof formScheme>) => {
    try {
      await login(data);
    } catch (err) {
      toast.error("Произошла ошибка попробуйте ещё раз");
    }
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
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Пароль</Label>
          <PrimaryLink className="underline" to="/restore-pass">
            Забыли пароль?
          </PrimaryLink>
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
      <Label htmlFor="remember">
        <div className="flex items-center">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <CheckBox
                  id="remember"
                  label="Запомнить меня"
                  checked={field.value}
                  onChange={field.onChange}
                />
                <ErrorMessage errorField={errors.remember}></ErrorMessage>
              </div>
            )}
          />
        </div>
      </Label>
      <div>
        <SubmitButton>Войти</SubmitButton>
      </div>
    </Form>
  );
}
