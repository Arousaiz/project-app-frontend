import { z } from "zod";
import { addressSchema } from "./profileSchema";
import { PaymentMethod } from "~/types/order";

export const OrderSchema = z.object({
  address: addressSchema,
  paymentMethod: z.enum([
    PaymentMethod.CARD,
    PaymentMethod.CASH,
    PaymentMethod.ONLINE,
  ]),
  deliveryTime: z.coerce.date(),
});
