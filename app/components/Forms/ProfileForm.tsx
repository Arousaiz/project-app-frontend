import {
  type RegisterOptions,
  type FieldValues,
  useForm,
} from "react-hook-form";
import Form from "../ui/Forms/Form";
import Input from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";
import { useFetcher, useNavigate, useSubmit } from "react-router";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import SubmitButton from "../ui/Forms/SubmitButton";
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
  const fetcher = useFetcher();

  const onSubmit = (data: FieldValues) => {
    fetcher.submit(data, {
      encType: "application/json",
      method: "POST",
    });
  };

  return (
    <div>
      <fetcher.Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex justify-between w-full my-2">
          <div className="flex flex-col w-full sm:w-6/12">
            <Label htmlFor="firstName">Имя</Label>
            <Input
              {...register("firstName")}
              name={"firstName"}
              type={"firstName"}
              id={"firstName"}
              placeholder="Alexandro"
              error={errors.firstName?.message}
            ></Input>
          </div>
          <div className="flex flex-col w-5/12">
            <Label htmlFor="lastName">Фамилия</Label>
            <Input
              {...register("lastName")}
              name={"lastName"}
              type={"lastName"}
              id={"lastName"}
              placeholder="Rodrigez"
              error={errors.lastName?.message}
            ></Input>
          </div>
        </div>
        <div>
          <Label htmlFor="email">Почта</Label>
          <div className="my-2">
            <Input
              {...register("email")}
              name="email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              error={errors.email?.message}
              icon={<EnvelopeIcon className="size-5 "></EnvelopeIcon>}
            ></Input>
          </div>
        </div>
        <div>
          <Label htmlFor="contactNumber">Телефон</Label>
          <div className="my-2">
            <Input
              {...register("contactNumber")}
              name="contactNumber"
              id="contactNumber"
              type="contactNumber"
              placeholder="+375-11-33-11-369"
              error={errors.contactNumber?.message}
              icon={<PhoneIcon className="size-5"></PhoneIcon>}
            ></Input>
          </div>
        </div>
        <div className="mt-4 w-6/12 justify-self-center">
          <SubmitButton>Отправить</SubmitButton>
        </div>
      </fetcher.Form>
    </div>
  );
}
