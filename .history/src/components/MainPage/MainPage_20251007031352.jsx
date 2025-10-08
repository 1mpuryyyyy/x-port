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
                <div className={style.header__right}></div>
            </div>
        </section>
    );
}