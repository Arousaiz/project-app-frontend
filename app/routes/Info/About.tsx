import {
  EyeIcon,
  TruckIcon,
  StarIcon,
  UserIcon,
  HomeIcon,
  BriefcaseIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { Briefcase, House, MapPin, MapPinHouse, User } from "lucide-react";
import PrimaryButton from "~/components/ui/Buttons/PrimaryButton";
import AboutCard from "~/components/Card/AboutCard";

const aboutTexts = [
  "Делать вкусную еду доступной для всех.",
  "Обеспечивать высокое качество услуг.",
  "Поддерживать местные рестораны.",
  "Обеспечивать честные условия для курьеров.",
];

export default function About() {
  return (
    <div className="max-w-7xl flex flex-col items-center justify-center mx-auto">
      <h1 className="p-12 text-center">
        Мы объединяем лучшие рестораны города в одном приложении и доставляем
        еду прямо к вам домой или в офис — быстро, удобно и вкусно.
      </h1>
      <div>
        <h2 className="text-center p-12">Наша миссия</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 place-items-center p-2 sm:p-4 font-medium ">
          {aboutTexts.map((text, index) => (
            <AboutCard key={index} className="">
              <p>{text}</p>
            </AboutCard>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-center p-12">Почему стоит выбирать нас?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center p-2 sm:p-4 font-medium">
          <AboutCard className="">
            <p className="">
              <span className="font-bold text-xl">N</span> ресторанов
            </p>
            <p className="">в одном приложении.</p>
          </AboutCard>
          <AboutCard className="">
            <p>Надежная служба доставки -</p>
            <p className="font-bold text-xl">быстро и аккуратно.</p>
          </AboutCard>
          <AboutCard className="">
            <p className="">
              <span className="font-bold text-xl">N</span> пользователей
            </p>
            <p>уже пользуются нашими услугами.</p>
          </AboutCard>
          <AboutCard className="">
            <p>Поддержка</p>
            <p className="font-bold text-xl">24/7</p>
          </AboutCard>
        </div>
      </div>
      <div>
        <h2 className="text-center p-12">Наша статистика</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 place-items-center p-2 sm:p-4 font-medium">
          <AboutCard className="">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">N</h3>
              <TruckIcon className="size-6 mx-2 "></TruckIcon>
            </div>
            <p>заказов доставлено</p>
          </AboutCard>
          <AboutCard className="">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">4.5</h3>
              <StarIcon className="size-6 mx-2 text-yellow-300"></StarIcon>
            </div>
            рейтинг по отзывам
          </AboutCard>
          <AboutCard className="">
            <div className="flex items-center justify-between">
              <p>доставляем в</p>
              <MapPin className="size-6 mx-2 text-red-500"></MapPin>
            </div>
            <p className="">
              <span className="font-bold text-xl">N</span> городов
            </p>
          </AboutCard>
          <AboutCard className="">
            <div className="flex items-center justify-between">
              <p className="">
                <span className="font-bold text-xl">N</span> ресторанов
              </p>
              <Briefcase className="size-6 mx-2"></Briefcase>
            </div>
            <p>партнеров</p>
          </AboutCard>
          <AboutCard className="">
            <div className="flex items-center justify-between">
              <p className="font-bold text-xl">N</p>
              <EyeIcon className="size-6 mx-2"></EyeIcon>
            </div>
            <p>Просмотров за месяц</p>
          </AboutCard>
          <AboutCard className="">
            <div className="flex items-center justify-between">
              <p className="font-bold text-xl">N</p>
              <User className="size-6 mx-2"></User>
            </div>
            <p>Посетителей/месяц</p>
          </AboutCard>
        </div>
      </div>
      <div className="mx-auto p-6">
        <h1 className="my-2">
          Присоединяйтесь к тысячам довольных клиентов — попробуйте доставку
          сегодня.
        </h1>
        <div className="flex justify-center items-center mt-4">
          <PrimaryButton size="lg" className="text-lg">
            Заказать сейчас
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
