import { CalendarDateRangeIcon, CalendarDaysIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useForm, type FieldValues } from "react-hook-form";
import { useSubmit } from "react-router";
import SimpleLink from "~/components/Footer/SimpleLink";
import Form from "~/components/Forms/Form";
import Input from "~/components/Forms/Input";
import InputWithIcon from "~/components/Forms/InputWithIcon";
import Label from "~/components/Forms/Label";
import SubmitButton from "~/components/Forms/SubmitButton";
import TextArea from "~/components/Forms/TextArea";

export default function Contact() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const submit = useSubmit();
    
      // usefetcher mb!!!
    const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: 'application/json',
      method: 'POST',
      action: '/login'
    })
    }
    

    return(
        <div className="flex flex-col lg:flex-row max-w-7xl justify-between mx-auto min-h-[70dvh]">
            <div className="flex flex-col py-12 dark:text-gray-200 ms-10">
                <h2 className="text-3xl font-bold dark:text-gray-300 p-4">Связаться с нами</h2>
                <p className="font-light line-clamp-3 mt-2">Используйте форму обратной связи справа или контакты представленные ниже</p>
                <p className="font-light mt-2 line-clamp-3"> Также перед обращением можете рассмотреть список часто задаваемых вопросов: <SimpleLink to={"/faq"}>FAQ</SimpleLink> </p>
                <div className="font-light mt-2">
                    <p>Мы на связи:</p>
                    <p className="mx-4">Пн-Вс: 8:00-0:00</p>
                </div>
                <div className="flex mt-2">
                    <PhoneIcon className="size-6 p-1"></PhoneIcon>
                    <p className="mx-4 font-light">+375 33-32-11-369</p>
                </div>
                <div className="flex mt-2">
                    <EnvelopeIcon className="size-6 p-1"></EnvelopeIcon>
                    <p className="mx-4 font-light">cvmaksim@gmail.com</p>
                </div>
                <div className="flex mt-2">
                    <MapPinIcon className="size-6 p-1"></MapPinIcon>
                    <p className="mx-4 font-light">ООО «Еда» г. Гродно, ул. Примерная, д. 5, офис 12</p>
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-6/12 px-6 py-12">
                <p className="text-3xl font-bold dark:text-gray-300 p-4">Форма обратной связи</p>
                <Form onSubmit={handleSubmit(onSubmit)} className={""}>
                    <Label htmlFor="name">Name</Label>
                    <div className="my-2">
                        <Input register={register} validateOptions={{
                            required: {value: true, message: "Name is required"}, 
                            pattern: { value: /^[A-Za-z]{8,32}$/, message: "Name should only contain letters"}
                        }} name="name" id="name" type="name" placeholder="Иванов Иван" errorField={errors.name}></Input>
                    </div>
                    <Label htmlFor="email">Email</Label>
                    <div className='my-2'>
                        <InputWithIcon register={register} validateOptions={{
                            required: {value: true, message: "Email is required"}, 
                            pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                            }}} name="email" id="email" type="email" placeholder="example@gmail.com" errorField={errors.email}>
                                <EnvelopeIcon className="size-5 "></EnvelopeIcon>
                        </InputWithIcon>
                    </div>
                    <Label htmlFor="phone">Phone(optional)</Label>
                    <div className="my-2">
                        <InputWithIcon register={register} validateOptions={{
                            pattern: { value: /^[0-9]{13}$/, message: "Phone should only contain numbers"}
                        }} name="phone" id="phone" type="phone" placeholder="+375-11-33-11-369" errorField={errors.phone}>
                            <PhoneIcon className="size-5"></PhoneIcon>
                        </InputWithIcon>
                    </div>
                    <Label htmlFor="text">Message</Label>
                    <div className="my-2">
                        <TextArea register={register} validateOptions={{
                            required: {value: true, message: "Message is required"}, 
                        }} name="text" id="text" placeholder="Ваше сообщение" errorField={errors.text}></TextArea>
                    </div>
                    <div className="mt-4 w-6/12 justify-self-center">
                        <SubmitButton>
                            Отправить
                        </SubmitButton>
                    </div>
                </Form>
            </div>
        </div>
    )
}