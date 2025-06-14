import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateOrderReviewSchema,
  ReviewSchema,
} from "~/zodScheme/reviewSchema";
import Form from "../ui/Forms/Form";
import Label from "../ui/Forms/Label";
import TextArea from "../ui/Forms/TextArea";
import SubmitButton from "../ui/Forms/SubmitButton";
import type { z } from "zod";
import { useFetcher } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { ReviewService } from "~/api/api.review";
import { toast } from "sonner";

type Props = {
  order: {
    id: string;
    restaurant: { id: string; name: string };
    orderItems: { id: string; name: string }[];
  };
  onClose: () => void;
};

type FormData = z.infer<typeof CreateOrderReviewSchema>;

export default function OrderReviewForm({ order, onClose }: Props) {
  const fetcher = useFetcher();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(CreateOrderReviewSchema),
    defaultValues: {
      orderId: order.id,
      restaurantReview: {
        restaurantId: order.restaurant.id,
        rating: 0,
        text: "",
      },
      dishReviews: order.orderItems.map((item) => ({
        menuItemId: item.id,
        rating: 0,
        text: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "dishReviews",
  });

  const reviewMutation = useMutation({
    mutationFn: ReviewService.writeReview,
    onSuccess: () => {
      toast.info("Отзыв успешно отправлен!");
      console.log("Отзыв успешно отправлен!");
    },
    onError: (error) => {
      toast.info("Произошла ошибка");
      console.error("Ошибка при отправке отзыва:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    reviewMutation.mutate(data);
    onClose();
  };

  // Получаем рейтинги для отображения звезд у каждого отзыва
  const restaurantRating = watch("restaurantReview.rating");
  const dishRatings = watch("dishReviews");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={""}>
      <div className="mb-6 border-b pb-4">
        <h2 className="text-lg font-semibold mb-2">
          Отзыв о ресторане {order.restaurant.name}
        </h2>
        <Label htmlFor="restaurant-text">Текст отзыва</Label>
        <TextArea
          id="restaurant-text"
          {...register("restaurantReview.text")}
          placeholder="Ваш отзыв о ресторане"
          error={errors.restaurantReview?.message}
        />
        {errors.restaurantReview?.text && (
          <p className="text-red-500 text-sm">
            {errors.restaurantReview.text.message}
          </p>
        )}

        <Label htmlFor="restaurant-rating">Оценка</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("restaurantReview.rating", star)}
              className={`text-2xl ${
                restaurantRating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {errors.restaurantReview?.rating && (
          <p className="text-red-500 text-sm">
            {errors.restaurantReview.rating.message}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Отзывы о блюдах</h2>
        {fields.map((field, index) => {
          const dishRating = dishRatings?.[index]?.rating || 0;
          return (
            <div key={field.menuItemId} className="mb-6 border-b pb-4">
              <h3 className="font-medium mb-1">
                {order.orderItems[index].name}
              </h3>
              <Label htmlFor={`dishReviews.${index}.text`}>Текст отзыва</Label>
              <TextArea
                id={`dishReviews.${index}.text`}
                {...register(`dishReviews.${index}.text` as const)}
                placeholder="Ваш отзыв о блюде"
              />
              {errors.dishReviews?.[index]?.text && (
                <p className="text-red-500 text-sm">
                  {errors.dishReviews[index]?.text?.message}
                </p>
              )}

              <Label htmlFor={`dishReviews.${index}.rating`}>Оценка</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setValue(`dishReviews.${index}.rating` as const, star)
                    }
                    className={`text-2xl ${
                      dishRating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {errors.dishReviews?.[index]?.rating && (
                <p className="text-red-500 text-sm">
                  {errors.dishReviews[index]?.rating?.message}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 w-6/12 mx-auto">
        <SubmitButton>Отправить отзывы</SubmitButton>
      </div>
    </Form>
  );
}
