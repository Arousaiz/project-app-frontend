import { z } from "zod";

export const ReviewSchema = z.object({
  text: z.string({}),
  rating: z.coerce.number({}).min(1, "Поставьте хотя бы 1 звезду"),
});
