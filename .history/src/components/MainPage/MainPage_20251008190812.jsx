import style from './MainPage.module.css';

export const MainPage = () => {
    return (
        <section>
            <div className={style.header}>
                <div className={style.header__left}>
                    <div className={style.header__left__benchmark}>

                    </div>
                    <h1 className={style.header__left__title}>Ваши сделки под защитой. <span>Гарант</span>, которому доверяют</h1>
                    <p className={style.header__left__description}>XPORT Escrow фиксирует средства и переведёт их продавцу только после вашего подтверждения получения товара или услуги. Подходит для авто, криптовалют и предметов люкса</p>
                    <div className={style.header__left__buttons}>
                        <button>Начать сделку {">"} </button>
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
                    <div className={style.calculator}></div>
                </div>
            </div>
        </section>
    );
}