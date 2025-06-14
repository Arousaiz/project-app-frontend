import {
  type RegisterOptions,
  type FieldValues,
  useForm,
} from "react-hook-form";
import Form from "../ui/Forms/Form";
import Input from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";
import { useFetcher, useNavigate, useSubmit } from "react-router";
import SubmitButton from "../ui/Forms/SubmitButton";
import { addressSchema } from "~/zodScheme/profileSchema";
import type { Addresses } from "~/types/address";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = addressSchema;

export default function AddressForm({
  address,
}: {
  address?: Addresses | null;
}) {
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
  const fetcher = useFetcher();

  const onSubmit = (data: FieldValues) => {
    fetcher.submit(data, {
      encType: "application/json",
      method: "POST",
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex flex-col justify-between items-center w-full my-2">
          <div className="w-full sm:w-6/12">
            <div>
              <Label htmlFor="city">Город</Label>
              <Input
                {...register("city")}
                name={"city"}
                type={"text"}
                id={"city"}
                placeholder="Гродно"
                error={errors.city?.message}
              ></Input>
            </div>
            <div className="my-2">
              <Label htmlFor="street">Улица</Label>
              <Input
                {...register("street")}
                name={"street"}
                type={"text"}
                id={"street"}
                placeholder="ул. Социалистическая"
                error={errors.street?.message}
              ></Input>
            </div>
            <div className="my-2">
              <Label htmlFor="house">Дом</Label>
              <Input
                {...register("house")}
                name={"house"}
                type={"text"}
                id={"house"}
                placeholder="12"
                error={errors.house?.message}
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
