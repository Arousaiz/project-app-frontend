import { useSubmit } from "react-router";
import Form from "../ui/Forms/Form";
import Input from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";
import SubmitButton from "../ui/Forms/SubmitButton";
import { useForm, type FieldValues } from "react-hook-form";

export default function CredentialsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="username">New username</Label>
        <div className="mt-2">
          <Input
            {...register("username")}
            name="username"
            id="username"
            type="username"
            error={errors.username?.message?.toString()}
          ></Input>
        </div>
      </div>
      <div>
        <Label htmlFor="oldPassword">Old password</Label>
        <div className="mt-2">
          <Input
            {...register("oldPassword")}
            name="oldPassword"
            id="oldPassword"
            type="oldPassword"
            error={errors.oldPassword?.message?.toString()}
          ></Input>
        </div>
      </div>
      <div>
        <Label htmlFor="password">New password</Label>
        <div className="mt-2">
          <Input
            {...register("password")}
            name="password"
            id="password"
            type="password"
            error={errors.password?.message?.toString()}
          ></Input>
        </div>
      </div>
      <div>
        <SubmitButton>Change credentials</SubmitButton>
      </div>
    </Form>
  );
}
