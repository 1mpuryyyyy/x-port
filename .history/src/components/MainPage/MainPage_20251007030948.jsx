import style from './MainPage.module.css';

export const MainPage = () =>  {
    return (
        <section>
            <div className={style.header}>
                <div className={style.header__left}>
                    <div className={style.header__benchmark}></div>
                    <h1 className={style.header__title}>Ваши сделки под защитой. <span>Гарант</span>, которому доверяют</h1>
                </div>
                <div className={style.header__right}></div>
            </div>
        </section>
    );
}