export default function TermsOfService() {
    return(
        <main className="flex flex-col justify-center mx-auto max-w-4xl my-10">   
            <h1 className="font-bold text-center text-2xl">Пользовательское соглашение</h1>
            <p className="font-medium mx-4 indent-4">Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует условия использования сервиса доставки еды «ЕдаСейчас» (далее — «Сервис»).</p>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">1. Общие положения</h2>
                <ul className="list-decimal list-inside">
                    <li>Используя Сервис, вы соглашаетесь с условиями данного Соглашения.</li>
                    <li>Сервис предназначен для ??? пользователей (??+).</li>
                    <li>Администрация вправе в любое время изменять условия Соглашения. Актуальная версия всегда доступна на сайте.</li>
                </ul>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">2. Регистрация и аккаунт</h2>
                <ul className="list-decimal list-inside">
                    <li>Для оформления заказов вы можете зарегистрироваться или использовать сервис как гость.</li>
                    <li>Вы обязуетесь предоставлять достоверные данные.</li>
                    <li>Вы несёте ответственность за сохранность логина и пароля.</li>
                </ul>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">3. Оформление и оплата заказов</h2>
                <ul className="list-decimal list-inside">
                    <li>Выбирая ресторан и блюда, вы формируете заказ через Сервис.</li>
                    <li>Оплата осуществляется онлайн или при получении — в зависимости от доступных опций.</li>
                    <li>После оформления заказ нельзя отменить, если ресторан уже начал его готовить.</li>
                </ul>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">4. Доставка</h2>
                <ul className="list-decimal list-inside">
                    <li>Время доставки является ориентировочным и может варьироваться.</li>
                    <li>Мы не несем ответственности за задержки, вызванные погодой, трафиком или сторонними факторами.</li>
                </ul>
            </div>
            
            <div className="mx-4">
                <h2 className="indent-8 font-bold">5. Возврат и жалобы</h2>
                <ul className="list-decimal list-inside">
                    <li>Если вы получили неверный или некачественный заказ, свяжитесь с поддержкой в течение 2 часов.</li>
                    <li>Возможен частичный или полный возврат денежных средств — по усмотрению администрации.</li>
                </ul>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">6. Ограничение ответственности</h2>
                <ul className="list-decimal list-inside">
                    <li>Сервис является агрегатором и не отвечает за качество блюд, приготовленных ресторанами.</li>
                    <li>Мы не гарантируем бесперебойную работу сайта и приложений, но прилагаем усилия для стабильности.</li>
                </ul>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">7. Интеллектуальная собственность</h2>
                <ul className="list-decimal list-inside">
                    <li>Все материалы сайта (логотипы, тексты, дизайн) являются нашей собственностью и защищены законом.</li>
                    <li>Запрещено копировать, распространять или использовать контент без разрешения.</li>
                </ul>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">8. Персональные данные</h2>
                <p>Обработка ваших данных осуществляется в соответствии с <a href="/policy">Политикой конфиденциальности</a>.</p>
            </div>

            <div className="mx-4 mb-4">
                <h2 className="indent-8 font-bold">9. Заключительные положения</h2>
                <ul className="list-decimal list-inside">
                    <li>Все споры решаются в соответствии с законодательством Российской Федерации.</li>
                    <li>Обращения можно направлять на email: support@edaseychas.ru</li>
                </ul>
            </div>

            <p><strong>Дата обновления:</strong> 1 мая 2025 года</p>

        </main>
    )
}