import { authSchema } from "~/zodScheme/authSchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useSubmit } from "react-router";
import SubmitButton from "../../ui/Forms/SubmitButton";
import Label from "../../ui/Forms/Label";
import Input from "../../ui/Forms/Input";
import Form from "../../ui/Forms/Form";

const formScheme = authSchema.pick({ email: true });

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formScheme>>();
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
        <Label htmlFor="email">Email</Label>
        <div className="mt-2">
          <Input
            register={register}
            name="email"
            id="email"
            type="email"
            errorField={errors.email}
          ></Input>
        </div>
      </div>
      <div>
        <SubmitButton>Продолжить</SubmitButton>
      </div>
    </Form>
  );
}
