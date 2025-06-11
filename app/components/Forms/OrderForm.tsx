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
import type { Addresses } from "~/types/address";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "./Select";
import { OrderSchema } from "~/zodScheme/orderSchema";
import {
  PaymentMethod,
  type CreateOrder,
  type CreateOrderItem,
} from "~/types/order";
import { useCart, type CartMenuItem } from "~/providers/cartContext";

const formSchema = OrderSchema;

export default function OrderForm({
  address,
  userId,
  restaurantId,
}: {
  address?: Addresses | null;
  restaurantId: string;
  userId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        city: address?.city,
        street: address?.street,
        house: address?.house,
      },
      paymentMethod: PaymentMethod.CASH,
      deliveryTime: new Date(),
    },
  });
  const cart = useCart();
  const submit = useSubmit();
  const navigate = useNavigate();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    console.log(data.PaymentMethod);
    const toOrder = createOrderFromCart(
      cart.cart,
      userId,
      restaurantId,
      data as {
        address: Addresses;
        paymentMethod: PaymentMethod;
        deliveryTime: Date;
      }
    );
    submit(JSON.stringify(toOrder), {
      encType: "application/json",
      method: "POST",
      action: "",
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex flex-col justify-between items-center w-full my-2">
          <div className="w-full sm:w-6/12">
            <div>
              <Label htmlFor="address.city">Город</Label>
              <Input
                register={register}
                name={"address.city"}
                type={"text"}
                id={"address.city"}
                placeholder="Гродно"
              ></Input>
            </div>
            <div className="my-2">
              <Label htmlFor="address.street">Улица</Label>
              <Input
                register={register}
                name={"address.street"}
                type={"text"}
                id={"address.street"}
                placeholder="ул. Социалистическая"
              ></Input>
            </div>
            <div className="my-2">
              <Label htmlFor="address.house">Дом</Label>
              <Input
                register={register}
                name={"address.house"}
                type={"text"}
                id={"address.house"}
                placeholder="12"
              ></Input>
            </div>
            <div>
              <Label htmlFor="paymentMethod">Дом</Label>
              <Select name="paymentMethod" register={register}>
                <option value={PaymentMethod.CASH}>Наличными</option>
                <option value={PaymentMethod.CARD}>Картой при получении</option>
                <option value={PaymentMethod.ONLINE}>Онлайн</option>
              </Select>
            </div>
          </div>
          <div className="my-2">
            <Label htmlFor="deliveryTime">Дом</Label>
            <Input
              min={getLocalDateTimeString()}
              max={getLocalDateTimeTommorowString()}
              register={register}
              name={"deliveryTime"}
              type={"datetime-local"}
              id={"deliveryTime"}
            ></Input>
          </div>
        </div>
        <div className="mt-4 w-6/12 justify-self-center">
          <SubmitButton>Отправить</SubmitButton>
        </div>
      </Form>
    </div>
  );
}

function getLocalDateTimeString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60 * 1000);
  return localTime.toISOString().slice(0, 16);
}

function getLocalDateTimeTommorowString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return localTime.toISOString().slice(0, 16);
}

function createOrderFromCart(
  cart: CartMenuItem[],
  userId: string,
  restaurantId: string,
  form: { address: Addresses; paymentMethod: PaymentMethod; deliveryTime: Date }
): CreateOrder {
  const orderItems: CreateOrderItem[] = cart.map((item) => ({
    menuItemId: item.id,
    price: item.price,
    count: item.count,
  }));

  return {
    userId,
    restaurantId,
    paymentMethod: form.paymentMethod,
    deliveryDetails: {
      address: form.address,
      deliveryTime: form.deliveryTime,
    },
    orderItems,
  };
}
