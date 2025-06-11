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
