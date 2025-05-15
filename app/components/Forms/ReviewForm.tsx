import {
  type RegisterOptions,
  type FieldValues,
  type UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";
import { useFetcher, useNavigate, useSubmit } from "react-router";
import InputWithIcon from "./InputWithIcon";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import SubmitButton from "./SubmitButton";
import { addressSchema } from "~/zodScheme/profileSchema";
import type { Address } from "~/types/address";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewSchema } from "~/zodScheme/reviewSchema";
import TextArea from "./TextArea";

const formSchema = ReviewSchema;

export default function ReviewForm({ id }: { id: string }) {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      rating: 0,
    },
  });
  const rating = watch("rating");
  const fetcher = useFetcher();
  const navigate = useNavigate();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    fetcher.submit(
      { menuItemId: id, ...data },
      {
        encType: "application/json",
        method: "POST",
        action: "/action/reviews",
      }
    );
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className="flex flex-col justify-between items-center w-full my-2">
          <div className="w-full">
            <div>
              <Label htmlFor="text">Текст отзыва</Label>
              <TextArea
                register={register}
                name={"text"}
                id={"text"}
                placeholder="Ваш отзыв"
              ></TextArea>
            </div>
            <div className="my-2 flex flex-col justify-center items-center">
              <Label htmlFor="rating">Оценка</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setValue("rating", star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
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
