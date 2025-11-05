import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './MainPage.module.css';
import planet from "../../assets/planet.png";
import house from "../../assets/house.png";
import car from "../../assets/car.png";
import CardItem from "../CardItem/CardItem";
import lux from "../../assets/lux.png";
import b2b from "../../assets/b2b.png";
import blueArr from "../../assets/blue-arr.svg";
import InternetChanges from '../InternetChanges/InternetChanges';
import TrustedFaces from '../TrustedFaces/TrustedFaces';
import ReviewsSection from '../ReviewSection/ReviewsSection';
import Partners from '../Partners/Partners';
import Accordion from '../Accordion/Accordion';
import lock from "../../assets/lock.svg";
import garant from "../../assets/garant.png";
import Slider from '../Slider/Slider';

export const MainPage = () => {
    const { hash } = useLocation();

    useEffect(() => {
        const id = hash.replace(/^#\/?/, '');
        if (id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    useEffect(() => {
        const onHashChange = () => {
            const id = window.location.hash.replace(/^#\/?/, '');
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const handleStartDeal = () => {
        const element = document.getElementById('directions');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [amount, setAmount] = useState('');
    const inputRef = useRef();

    const handleAmountChange = (e) => {
        let input = e.target.value;

        if (amount.endsWith(' $') && !input.endsWith(' $') && input !== '') {
            const numbersOnly = input.replace(/[^\d]/g, '');
            const formatted = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            const result = formatted + ' $';
            setAmount(result);
            return;
        }

        const numbersOnly = input.replace(/[^\d]/g, '');
        const formatted = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        const result = formatted + (formatted ? ' $' : '');
        setAmount(result);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            const currentValue = e.target.value;
            const cursorPosition = e.target.selectionStart;

            if (currentValue.endsWith(' $') && cursorPosition >= currentValue.length - 2) {
                e.preventDefault();

                const withoutSymbol = currentValue.slice(0, -2).trim();
                const numbersOnly = withoutSymbol.replace(/[^\d]/g, '');
                const newNumbers = numbersOnly.slice(0, -1);

                const formatted = newNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                const result = formatted + (formatted ? ' $' : '');

                setAmount(result);
            }
        }

        else if (![8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode) &&
            !(e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) &&
            (e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    const stepsData = [
        { title: 'Регистрация', description: 'Вы заходите на наш сайт и проходите простую регистрацию — это займёт всего несколько минут.' },
        { title: 'Выбор продавца', description: 'Из списка проверенных продавцов вы выбираете того, с кем хотите провести сделку.' },
        { title: 'Оформление сделки', description: 'Обсуждение деталей с личным менеджером: условия, сроки сделки, сумма' },
        { title: 'Подтверждение', description: 'Стороны договорились — подтверждаем условия и переводим средства.' },
        { title: 'Завершение', description: 'Сделка завершена, вы получаете товар, продавец - средства.' },
    ];
    return (
        <section className={style.container}>
            <div className={style.header} id="about">
                <div className={style.header__left}>
                    <div className={style.header__left__benchmark}>
                        <span className={style.lock}><img src={lock} />SSL-защита</span>
                        <span>·</span>
                        <span>Юридическая оферта</span>
                        <span>·</span>
                        <span>5+ лет опыта</span>
                    </div>

                    <h1 className={style.header__left__title}>Ваши сделки под защитой. <span>Гарант</span>, которому доверяют</h1>
                    <p className={style.header__left__description}>XPORT - проводим любые международные сделки. Получаем, фиксируем и переводим средства
                        продавцу только после подтверждения получения товара.</p>
                    <div className={style.header__left__buttons}>
                        <button className={style.greenButton} onClick={handleStartDeal}><p>Подробнее </p> <img className={style.arrow} src={blueArr} /></button>
                        <button>Как это работает </button>
                    </div>
                </div>
                <div className={style.header__right}>
                    <div className={style.digits}>
                        <div className={style.digits__item}>
                            <p className={style.digits__item__title}>Проведено сделок</p>
                            <h1>1 250+</h1>
                        </div>
                        <div className={style.digits__item}>
                            <p className={style.digits__item__title}>Средний чек</p>
                            <h1>$18 400</h1>
                        </div>
                        <div className={style.digits__item}>
                            <p className={style.digits__item__title}>Споры решены</p>
                            <h1>100%</h1>
                        </div>
                        <div className={style.digits__item}>
                            <p className={style.digits__item__title}>Поддержка</p>
                            <h1>24/7</h1>
                        </div>
                    </div>
                    <div className={style.calculator}>
                        <div className={style.garant}>
                            <img src={garant} />
                            <h1> Быстрый старт сделки</h1>
                        </div>
                        <div className={style.calculator__inputs}>
                            <div className={style.calculator__input}>
                                <label htmlFor="amount">Сумма сделки</label>
                                <input type="text" id="amount" placeholder="25 000 $" className={style.calculator__input__number}
                                    value={amount}
                                    onChange={handleAmountChange}
                                    onKeyDown={handleKeyDown}
                                    ref={inputRef}
                                />
                            </div>
                            <div className={style.calculator__input}>
                                <label htmlFor="direction">Направление</label>
                                <select id="direction" className={style.select}>
                                    <option value="automobiles">Автомобили</option>
                                    <option value="apartments">Недвижимость</option>
                                    <option value="luxury">Люксовые товары</option>
                                    <option value="b2b">B2B сделки</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className={`${style.calc__button}`}>Рассчитать комиссию</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.planet}>
                <div className={style.planet__ring}></div>
                <img
                    src={planet}
                    alt="planet background"
                    className={style.planet__bg}
                />
                <div className={style.planet__container}>
                    <h1>На любой точке планеты — ваша сделка под надежным контролем.</h1>
                    <p>XPORT убирает тревогу, делая глобальные покупки и продажи безопасными. Будьте
                        свободны - покупайте что угодно и где угодно, зная, что ваши средства в надёжных руках</p>
                    <div>
                        <button className={style.greenButton} onClick={handleStartDeal}>Подробнее</button>
                    </div>
                </div>
            </div>

            <div className={style.cards} id="directions">
                <div className={style.cards__wrapper}>
                    <CardItem
                        imageUrl={house}
                        title="Недвижимость"
                        description="Покупка дома, квартиры или коммерческой недвижимости"
                        link="apartments"
                    />
                    <CardItem
                        imageUrl={car}
                        title="Автомобили"
                        description="Новые и подержанные авто любого класса"
                        link="cars"
                    />
                </div>
                <div className={style.cards__wrapper}>
                    <CardItem
                        imageUrl={lux}
                        title="Люксовые товары"
                        description="Аутентичные товары любой ценности - сумки, часы, ювелирные изделия и др"
                        link="lux-items"
                    />
                    <CardItem
                        imageUrl={b2b}
                        title="B2B сделки"
                        description="Коммерческие партии оборудования и товаров"
                        link="b2b"
                    />
                </div>
            </div>
            <Slider stepsData={stepsData} subtitle={"От идеи до договора. Все прозрачно"} />

            <InternetChanges />

            <TrustedFaces />

            <ReviewsSection />

            <div id="partners">
                <Partners />
            </div>

            <Accordion />
        </section>
    );
}