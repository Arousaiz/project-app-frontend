import {
  type RegisterOptions,
  type FieldValues,
  useForm,
  Controller,
} from "react-hook-form";
import Form from "../ui/Forms/Form";
import Input from "../ui/Forms/Input";
import Label from "../ui/Forms/Label";
import { useNavigate, useSubmit } from "react-router";
import { ComputerDesktopIcon } from "@heroicons/react/20/solid";
import SubmitButton from "../ui/Forms/SubmitButton";
import type { Addresses } from "~/types/address";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "~/zodScheme/orderSchema";
import {
  PaymentMethod,
  type CreateOrder,
  type CreateOrderItem,
} from "~/types/order";
import { useCart, type CartState } from "~/providers/cartContext";
import TextArea from "../ui/Forms/TextArea";
import { RadioGroup } from "../ui/Buttons/Radio";
import { CreditCardIcon, Wallet } from "lucide-react";
import { useState } from "react";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import { OrderService } from "~/api/api.order";
import { toast } from "sonner";

const paymentOptions = [
  {
    value: PaymentMethod.CASH,
    label: "Наличными",
    icon: <Wallet className="w-5 h-5 mr-1" />,
  },
  {
    value: PaymentMethod.CARD,
    label: "Картой при получении",
    icon: <CreditCardIcon className="w-5 h-5 mr-1" />,
  },
  {
    value: PaymentMethod.ONLINE,
    label: "Онлайн",
    icon: <ComputerDesktopIcon className="w-5 h-5 mr-1" />,
  },
];

const formSchema = OrderSchema;

export default function OrderForm({
  address,
  userId,
  totalPrice,
}: {
  address?: Addresses | null;
  userId: string;
  totalPrice: number;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        city: address?.city,
        street: address?.street,
        house: address?.house,
      },
      comment: "",
      paymentMethod: PaymentMethod.CASH,
      deliveryTime: new Date(),
    },
  });
  const { cart, clearCart } = useCart();
  const submit = useSubmit();
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: (orderData: CreateOrder) => OrderService.createOrder(orderData),
    onSuccess: () => {
      navigate("/order/success");
    },
    onError: (error: any) => {
      toast.error("Ошибка при создании заказа");
      console.error("Ошибка при создании заказа:", error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    const toOrder = createOrderFromCart(
      cart,
      userId,
      data as {
        address: Addresses;
        paymentMethod: PaymentMethod;
        deliveryTime: Date;
        comment: string;
      }
    );
    createOrderMutation.mutate(toOrder);
  };

  const [manual, setManual] = useState(false);

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex flex-col justify-between items-center w-full space-y-2">
          <div className="w-full lg:w-8/12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto">
              <div>
                <Label htmlFor="address.city">Город</Label>
                <Input
                  {...register("address.city")}
                  name={"address.city"}
                  type={"text"}
                  id={"address.city"}
                  placeholder="Гродно"
                  error={errors.address?.city?.message}
                />
              </div>
              <div>
                <Label htmlFor="address.street">Улица</Label>
                <Input
                  {...register("address.street")}
                  name={"address.street"}
                  type={"text"}
                  id={"address.street"}
                  placeholder="ул. Социалистическая"
                  error={errors.address?.street?.message}
                />
              </div>
              <div>
                <Label htmlFor="address.house">Дом</Label>
                <Input
                  {...register("address.house")}
                  name={"address.house"}
                  type={"text"}
                  id={"address.house"}
                  placeholder="12"
                  error={errors.address?.house?.message}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="paymentMethod">Способ оплаты</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    name="paymentMethod"
                    options={paymentOptions.map(({ label, value }) => ({
                      label: (
                        <div className="flex items-center">
                          {
                            paymentOptions.find((opt) => opt.value === value)
                              ?.icon
                          }
                          {label}
                        </div>
                      ),
                      value,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <TextArea
                {...register("comment")}
                name="comment"
                id="comment"
                placeholder="Ваше сообщение"
                error={errors.comment?.message}
              ></TextArea>
            </div>
          </div>
          <div className="my-4 space-y-2">
            <Label htmlFor="deliveryTime">Желаемое время доставки</Label>
            <div className="flex gap-2 flex-wrap">
              <PrimaryButton
                type="button"
                variant={manual ? "outline" : "secondary"}
                onClick={() => setManual(false)}
              >
                Как можно скорее
              </PrimaryButton>
              <PrimaryButton
                type="button"
                variant={manual ? "secondary" : "outline"}
                onClick={() => setManual(true)}
              >
                Указать вручную
              </PrimaryButton>
            </div>
            {manual && (
              <div className="mt-4">
                <Input
                  min={getLocalDateTimeString()}
                  max={getLocalDateTimeTommorowString()}
                  {...register("deliveryTime")}
                  name={"deliveryTime"}
                  type={"datetime-local"}
                  id={"deliveryTime"}
                  error={errors.deliveryTime?.message}
                ></Input>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 w-6/12 justify-self-center">
          <div className="flex justify-between items-center mt-4 text-base font-medium mb-2">
            <span>Сумма к оплате:</span>
            <span>{totalPrice} руб.</span>
          </div>
          <SubmitButton>Оформить заказ</SubmitButton>
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
  cartState: CartState,
  userId: string,
  form: {
    address: Addresses;
    paymentMethod: PaymentMethod;
    deliveryTime: Date;
    comment: string;
  }
): CreateOrder {
  const orderItems: CreateOrderItem[] = Object.values(cartState.items).map(
    (item) => ({
      menuItemId: item.id,
      price: item.price,
      count: item.count,
    })
  );

  return {
    userId,
    restaurantId: cartState.restaurantId!,
    paymentMethod: form.paymentMethod,
    deliveryDetails: {
      address: form.address,
      deliveryTime: form.deliveryTime,
    },
    orderItems,
    comment: form.comment,
  };
}
