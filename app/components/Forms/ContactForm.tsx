import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useForm, type FieldValues } from "react-hook-form";
import { useSubmit } from "react-router";
import InputWithIcon from "./InputWithIcon";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import Label from "./Label";
import Form from "./Form";
import Input from "./Input";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = useSubmit();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: "application/json",
      method: "POST",
      action: "/login",
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={""}>
      <Label htmlFor="name">Name</Label>
      <div className="my-2">
        <Input
          register={register}
          validateOptions={{
            required: { value: true, message: "Name is required" },
            pattern: {
              value: /^[A-Za-z]{8,32}$/,
              message: "Name should only contain letters",
            },
          }}
          name="name"
          id="name"
          type="name"
          placeholder="Иванов Иван"
          errorField={errors.name}
        ></Input>
      </div>
      <Label htmlFor="email">Email</Label>
      <div className="my-2">
        <InputWithIcon
          register={register}
          validateOptions={{
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
          name="email"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          errorField={errors.email}
        >
          <EnvelopeIcon className="size-5 "></EnvelopeIcon>
        </InputWithIcon>
      </div>
      <Label htmlFor="phone">Phone(optional)</Label>
      <div className="my-2">
        <InputWithIcon
          register={register}
          validateOptions={{
            pattern: {
              value: /^[0-9]{13}$/,
              message: "Phone should only contain numbers",
            },
          }}
          name="phone"
          id="phone"
          type="phone"
          placeholder="+375-11-33-11-369"
          errorField={errors.phone}
        >
          <PhoneIcon className="size-5"></PhoneIcon>
        </InputWithIcon>
      </div>
      <Label htmlFor="text">Message</Label>
      <div className="my-2">
        <TextArea
          register={register}
          validateOptions={{
            required: { value: true, message: "Message is required" },
          }}
          name="text"
          id="text"
          placeholder="Ваше сообщение"
          errorField={errors.text}
        ></TextArea>
      </div>
      <div className="mt-4 w-6/12 justify-self-center">
        <SubmitButton>Отправить</SubmitButton>
      </div>
    </Form>
  );
}
