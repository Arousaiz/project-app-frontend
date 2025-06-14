import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useForm, type FieldValues } from "react-hook-form";
import { useSubmit } from "react-router";
import SubmitButton from "../ui/Forms/SubmitButton";
import TextArea from "../ui/Forms/TextArea";
import Label from "../ui/Forms/Label";
import Form from "../ui/Forms/Form";
import Input from "../ui/Forms/Input";
import { contactFormSchema } from "~/zodScheme/contactSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = contactFormSchema;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });
  const submit = useSubmit();

  const onSubmit = (data: FieldValues) => {};

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={""}>
      <Label htmlFor="name">Name</Label>
      <div className="my-2">
        <Input
          {...register("name")}
          name="name"
          id="name"
          type="name"
          placeholder="Иванов Иван"
          error={errors.name?.message?.toString()}
        ></Input>
      </div>
      <Label htmlFor="email">Email</Label>
      <div className="my-2">
        <Input
          {...register("email")}
          name="email"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          error={errors.email?.message?.toString()}
          icon={<EnvelopeIcon className="size-5 "></EnvelopeIcon>}
        ></Input>
      </div>
      <Label htmlFor="phone">Phone(optional)</Label>
      <div className="my-2">
        <Input
          {...register("email")}
          name="phone"
          id="phone"
          type="phone"
          placeholder="+375-11-33-11-369"
          error={errors.phone?.message?.toString()}
          icon={<PhoneIcon className="size-5"></PhoneIcon>}
        ></Input>
      </div>
      <Label htmlFor="text">Message</Label>
      <div className="my-2">
        <TextArea
          {...register("text")}
          name="text"
          id="text"
          placeholder="Ваше сообщение"
          error={errors.text?.message?.toString()}
        ></TextArea>
      </div>
      <div className="mt-4 w-6/12 justify-self-center">
        <SubmitButton>Отправить</SubmitButton>
      </div>
    </Form>
  );
}
