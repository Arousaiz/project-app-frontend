import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "~/components/Forms/ContactForm";
import { PrimaryLink } from "~/components/ui/Links/PrimaryLink";

const contacts = [
  {
    icon: Phone,
    text: "+375 33-32-11-369",
  },
  {
    icon: Mail,
    text: "cvmaksim@gmail.com",
  },
  {
    icon: MapPin,
    text: "ООО «Еда», г. Гродно, ул. Примерная, д. 5, офис 12",
  },
];

export default function Contact() {
  return (
    <div className="flex flex-col lg:flex-row justify-between min-h-[70dvh]">
      <div className="flex flex-col py-12 px-4 lg:px-10 space-y-4">
        <h2>Связаться с нами</h2>
        <div>
          <p className="">
            Используйте форму обратной связи справа или контакты представленные
            ниже
          </p>
          <p className="">
            Также перед обращением можете рассмотреть список часто задаваемых
            вопросов:{" "}
            <PrimaryLink className="underline" to={"/faq"}>
              FAQ
            </PrimaryLink>{" "}
          </p>
        </div>
        <div className="">
          <p>Мы на связи:</p>
          <p className="">Пн-Вс: 8:00-23:00</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">Контакты</h3>
          {contacts.map(({ icon: Icon, text }, idx) => (
            <div key={idx} className="flex items-center gap-2 mt-2">
              <Icon className="size-5 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-6/12 px-6 py-12">
        <h2>Форма обратной связи</h2>
        <ContactForm></ContactForm>
      </div>
    </div>
  );
}
