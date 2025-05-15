import { EyeIcon, TruckIcon, StarIcon, UserIcon, HomeIcon, BriefcaseIcon, HomeModernIcon } from "@heroicons/react/24/outline";
import AboutCard from "~/components/Card/AboutCard";

export default function About() {
    return(
        <div className="max-w-7xl flex flex-col items-center justify-center mx-auto">
            <p className="font-bold p-12 text-3xl text-center">Мы объединяем лучшие рестораны города в одном приложении и доставляем еду прямо к вам домой или в офис — быстро, удобно и вкусно.</p>
            <div>
                <h2 className="font-semibold text-center text-2xl p-12">Наша миссия</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:min-w-3xl text-center font-medium">
                    <AboutCard className="md:w-96 w-80 p-4 m-2 h-20">
                        <p>Делать вкусную еду доступной для всех.</p>
                    </AboutCard>
                    <AboutCard className="md:w-96 w-80 p-4 m-2 mt-4 sm:mt-2 h-20">
                        <p>Обеспечивать высокое качество услуг </p>
                    </AboutCard>
                    <AboutCard className="md:w-96 w-80 p-4 m-2 mt-4 sm:mt-2 h-20">
                        <p>Поддерживать местные рестораны.</p>
                    </AboutCard>
                    <AboutCard className="md:w-96 w-80 p-4 m-2 mt-4 sm:mt-2 h-20">
                        <p>Обеспечивать честные условия для курьеров.</p>
                    </AboutCard>
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-center text-2xl p-12">Почему стоит выбирать нас?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:min-w-3xl font-medium text-center justify-items-center">
                    <AboutCard className="md:w-96 w-80 p-4 m-2 h-20">
                        <p className="font-bold text-xl">N ресторанов</p>
                        <p className="">в одном приложении.</p>
                    </AboutCard>
                    <AboutCard className="md:w-96 w-80 p-4 m-2 mt-4 sm:mt-2 h-20">
                        <p>Надежная служба доставки -</p>
                        <p className="font-bold text-xl">быстро и аккуратно.</p>
                    </AboutCard>
                    <AboutCard className="md:w-96 w-80 p-4 m-2 mt-4 sm:mt-2 h-20">
                        <p className="font-bold text-xl">N пользователей</p>
                        <p>уже пользуются нашими услугами.</p>
                    </AboutCard>
                    <AboutCard className="md:w-96 w-80 p-4 m-2 mt-4 sm:mt-2 h-20">
                        <p>Поддержка</p>
                        <p className="font-bold text-xl">24/7</p>
                    </AboutCard>
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-center text-2xl p-12">Наша статистика</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 max-w-3xl md:min-w-3xl font-medium justify-items-center">
                    <AboutCard className="p-4 m-2 mt-4 md:mt-0 md:w-60 w-60 h-20">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-xl">N</h2> 
                            <TruckIcon className="size-6 mx-2"></TruckIcon>
                        </div>
                        <p>заказов доставлено</p>
                    </AboutCard>
                    <AboutCard className="p-4 m-2 mt-4 md:mt-0 md:w-60 w-60 h-20">
                        <div className="flex items-center">
                            <h2 className="font-bold text-xl">4.5</h2> 
                            <StarIcon className="size-6 mx-2"></StarIcon>
                        </div>
                        рейтинг по отзывам
                    </AboutCard>
                    <AboutCard className="p-4 m-2 mt-4 md:mt-0 md:w-60 w-60 h-20">
                        <div className="flex items-center justify-between">
                            <p>доставляем в</p>
                            <HomeModernIcon className="size-6 mx-2"></HomeModernIcon>
                        </div>
                        <h2 className="font-bold text-xl">N городов</h2> 
                    </AboutCard>
                    <AboutCard className="p-4 m-2 mt-4 md:w-60 w-60 h-20">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-xl">N ресторанов</h2> 
                            <BriefcaseIcon className="size-6 mx-2"></BriefcaseIcon>
                        </div>
                        <p>партнеров</p>
                    </AboutCard>
                    <AboutCard className="p-4 m-2 mt-4 md:w-60 w-60 h-20">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-xl">N</h2> 
                            <EyeIcon className="size-6 mx-2"></EyeIcon>
                        </div>
                        <p>Просмотров за месяц</p>
                    </AboutCard>
                    <AboutCard className="p-4 m-2 mt-4 md:w-60 w-60 h-20">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-xl">N</h2> 
                            <UserIcon className="size-6 mx-2"></UserIcon>
                        </div>
                        <p>Уникальных посетителей</p>
                    </AboutCard>
                </div>
            </div>
            <div className="mx-auto p-6">
                <p className="text-3xl font-bold">Присоединяйтесь к тысячам довольных клиентов — попробуйте доставку сегодня.</p>
            </div>
        </div>
    )
}