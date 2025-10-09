import style from './MainPage.module.css';
import planet from "../../assets/planet.png";
import house from "../../assets/house.png";
import car from "../../assets/car.png";
import CardItem from "../CardItem/CardItem";
import lux 

export const MainPage = () => {
    return (
        <section>
            <div className={style.header}>
                <div className={style.header__left}>
                    <div className={style.header__left__benchmark}>
                        <span>🔒 SSL-защита</span>
                        <span>·</span>
                        <span>Юридическая оферта</span>
                        <span>·</span>
                        <span>5+ лет опыта</span>
                    </div>

                    <h1 className={style.header__left__title}>Ваши сделки под защитой. <span>Гарант</span>, которому доверяют</h1>
                    <p className={style.header__left__description}>XPORT Escrow фиксирует средства и переведёт их продавцу только после вашего подтверждения получения товара или услуги. Подходит для авто, криптовалют и предметов люкса</p>
                    <div className={style.header__left__buttons}>
                        <button className={style.greenButton}>Начать сделку {">"} </button>
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
                        <h1>Быстрый старт сделки</h1>
                        <div className={style.calculator__inputs}>
                            <div className={style.calculator__input}>
                                <label htmlFor="amount">Сумма сделки</label>
                                <input type="text" id="amount" placeholder="25 000 $" />
                            </div>
                            <div className={style.calculator__input}>
                                <label htmlFor="direction">Направление</label>
                                <input type="text" id="direction" placeholder="Недвижимость" />
                            </div>
                        </div>
                        <div>
                            <button>Рассчитать комиссию</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.planet}>
                <img
                    src={planet}
                    alt="planet background"
                    className={style.planet__bg}
                />
                <div className={style.planet__container}>
                    <h1>На любой точке планеты</h1>
                    <p>купи купи купи купи купи купи купи купи купи купи купи купи купи купи купи купи купи</p>
                    <div>
                        <button className={style.greenButton}>Начать сделку ={">"}</button>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", gap: "20px", background: "#090C0B", padding: "40px" }}>
                <CardItem
                    imageUrl={house}
                    title="Недвижимость"
                    description="lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
                    link="#"
                />
                <CardItem
                    imageUrl="/src/assets/car.svg"
                    title="Автомобили"
                    description="lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
                    link="#"
                />
            </div>

        </section>
    );
}