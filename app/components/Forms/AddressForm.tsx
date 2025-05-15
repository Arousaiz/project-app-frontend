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
import { addressSchema } from "~/zodScheme/profileSchema";
import type { Address } from "~/types/address";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = addressSchema;

export default function AddressForm({ address }: { address?: Address | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: address?.city,
      street: address?.street,
      house: address?.house,
    },
  });
  const submit = useSubmit();
  const navigate = useNavigate();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
      action: "/action/update-address",
    });
    setTimeout(() => navigate(0), 200);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex flex-col justify-between items-center w-full my-2">
          <div className="w-full sm:w-6/12">
            <div>
              <Label htmlFor="city">Город</Label>
              <Input
                register={register}
                name={"city"}
                type={"text"}
                id={"city"}
                placeholder="Гродно"
              ></Input>
            </div>
            <div className="my-2">
              <Label htmlFor="street">Улица</Label>
              <Input
                register={register}
                name={"street"}
                type={"text"}
                id={"street"}
                placeholder="ул. Социалистическая"
              ></Input>
            </div>
            <div className="my-2">
              <Label htmlFor="house">Дом</Label>
              <Input
                register={register}
                name={"house"}
                type={"text"}
                id={"house"}
                placeholder="12"
              ></Input>
            </div>
          </div>
        </div>
        <div className="mt-4 w-6/12 justify-self-center">
          <SubmitButton>Отправить</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
