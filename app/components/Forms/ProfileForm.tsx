import {
  type RegisterOptions,
  type FieldValues,
  type UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";
import { useNavigate, useSubmit } from "react-router";
import InputWithIcon from "./InputWithIcon";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import SubmitButton from "./SubmitButton";
import { profileSchema } from "~/zodScheme/profileSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserProfile } from "~/api/api.profile";

const formScheme = profileSchema;

export default function ProfileForm({
  person,
}: {
  person?: UserProfile | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      id: person?.id,
      firstName: person?.firstName,
      lastName: person?.lastName,
      email: person?.email,
      contactNumber: person?.contactNumber,
    },
  });
  const submit = useSubmit();
  const navigate = useNavigate();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
      action: "/action/update-info",
    });
    setTimeout(() => navigate(0), 200);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex justify-between w-full my-2">
          <div className="flex flex-col w-full sm:w-6/12">
            <Label htmlFor="firstName">Имя</Label>
            <Input
              register={register}
              name={"firstName"}
              type={"firstName"}
              id={"firstName"}
              placeholder="Alexandro"
            ></Input>
          </div>
          <div className="flex flex-col w-5/12">
            <Label htmlFor="lastName">Фамилия</Label>
            <Input
              register={register}
              name={"lastName"}
              type={"lastName"}
              id={"lastName"}
              placeholder="Rodrigez"
            ></Input>
          </div>
        </div>
        <div>
          <Label htmlFor="email">Почта</Label>
          <div className="my-2">
            <InputWithIcon
              register={register}
              name="email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              errorField={errors.email}
            >
              <EnvelopeIcon className="size-5 "></EnvelopeIcon>
            </InputWithIcon>
          </div>
        </div>
        <div>
          <Label htmlFor="contactNumber">Телефон</Label>
          <div className="my-2">
            <InputWithIcon
              register={register}
              name="contactNumber"
              id="contactNumber"
              type="contactNumber"
              placeholder="+375-11-33-11-369"
              errorField={errors.contactNumber}
            >
              <PhoneIcon className="size-5"></PhoneIcon>
            </InputWithIcon>
          </div>
        </div>
        <div className="mt-4 w-6/12 justify-self-center">
          <SubmitButton>Отправить</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
