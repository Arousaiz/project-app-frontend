export default function PrivacyPolicy(){
    return(
        <div className="flex flex-col justify-center mx-auto max-w-4xl my-10">
            <h1 className="font-bold text-center text-2xl">Политика конфиденциальности</h1>
            <p className="font-medium mx-4 indent-4">Настоящая Политика конфиденциальности описывает, как сервис «Доставка еды» (далее — «мы», «наш сайт») собирает, использует и защищает персональные данные пользователей.</p>
            <div className="mx-4">
                <h2 className="indent-8 font-bold">1. Какие данные мы собираем</h2>
                <ul className="list-decimal list-inside">
                    <li>Имя и контактные данные (телефон, email)</li>
                    <li>Адрес доставки</li>
                    <li>Данные об устройствах и IP-адрес</li>
                    <li>История заказов и предпочтения</li>
                    <li>Файлы cookie и данные о действиях на сайте</li>
                </ul>
            </div>
            
            <div className="mx-4">
                <h2 className="indent-8 font-bold">2. Зачем мы используем эти данные</h2>
                <ul className="list-decimal list-inside">
                    <li>Для обработки и доставки заказов</li>
                    <li>Для связи с вами по вопросам заказов</li>
                    <li>Для улучшения качества сервиса и персонализации</li>
                    <li>Для отправки акций и новостей (если вы дали согласие)</li>
                    <li>Для соблюдения законов и требований</li>
                </ul>
            </div>
            
            <div className="mx-4">
                <h2 className="indent-8 font-bold">3. Передача данных третьим лицам</h2>
                <p>Мы можем передавать данные только в следующих случаях:</p>
                <ul className="list-decimal list-inside">
                    <li>Ресторанам — для выполнения вашего заказа</li>
                    <li>Курьерам — для доставки</li>
                    <li>Партнёрам — для аналитики и рекламы (только обезличенные данные)</li>
                    <li>Госорганам — по требованию закона</li>
                </ul>
            </div>
            
            <div className="mx-4">
                <h2 className="indent-8 font-bold">4. Хранение и защита данных</h2>
                <p>Мы используем современные методы защиты информации и не храним персональные данные дольше, чем это необходимо.</p>
            </div>

            <div className="mx-4">
                <h2 className="indent-8 font-bold">5. Ваши права</h2>
                <ul className="list-decimal list-inside">
                    <li>Получить доступ к своим данным</li>
                    <li>Изменить или удалить свои данные</li>
                    <li>Отозвать согласие на обработку</li>
                    <li>Отключить cookies в браузере</li>
                </ul>
            </div>
            <div className="mx-4">
                <h2 className="indent-8 font-bold">6. Использование файлов cookie</h2>
                <p>Файлы cookie используются для работы сайта, аналитики и персонализации контента. Вы можете изменить настройки в браузере.</p>
            </div>
            <div className="mx-4 my-4">
                <h2 className="indent-8 font-bold">Контакты</h2>
                <p>Если у вас есть вопросы по поводу вашей конфиденциальности, свяжитесь с нами:</p>
                <p>Email: privacyemail@email.com<br/>
                    Телефон: +375 33 11 33 369</p>
            </div>


            <p><strong>Дата обновления:</strong> 1 мая 2025 года</p>
        </div>
    )
}