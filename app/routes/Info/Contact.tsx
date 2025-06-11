import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import SimpleLink from "~/components/Footer/SimpleLink";
import ContactForm from "~/components/Forms/ContactForm";

export default function Contact() {
  return (
    <div className="flex flex-col lg:flex-row justify-between min-h-[70dvh]">
      <div className="flex flex-col py-12 ms-10">
        <h2>Связаться с нами</h2>
        <p className="line-clamp-3 mt-2 ">
          Используйте форму обратной связи справа или контакты представленные
          ниже
        </p>
        <p className="line-clamp-3">
          Также перед обращением можете рассмотреть список часто задаваемых
          вопросов: <SimpleLink to={"/faq"}>FAQ</SimpleLink>{" "}
        </p>
        <div className="mt-2">
          <p>Мы на связи:</p>
          <p className="mx-4 mt-2">Пн-Вс: 8:00-23:00</p>
        </div>
        <h2 className="mt-2">Контакты</h2>
        <div className="flex large-text mt-2">
          <PhoneIcon className="size-6"></PhoneIcon>
          <p className="mx-4">+375 33-32-11-369</p>
        </div>
        <div className="flex large-text mt-2">
          <EnvelopeIcon className="size-6"></EnvelopeIcon>
          <p className="mx-4">cvmaksim@gmail.com</p>
        </div>
        <div className="flex large-text mt-2">
          <MapPinIcon className="size-6"></MapPinIcon>
          <p className="mx-4">
            ООО «Еда» г. Гродно, ул. Примерная, д. 5, офис 12
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-6/12 px-6 py-12">
        <h2>Форма обратной связи</h2>
        <ContactForm></ContactForm>
      </div>
    </div>
  );
}
