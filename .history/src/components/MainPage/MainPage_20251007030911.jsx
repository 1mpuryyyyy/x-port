import style from './MainPage.module.css';

export const MainPage = () =>  {
    return (
        <section>
            <div className={style.header}>
                <div className={style.header__left}>
                    <div className={style.benchmark}></div>
                    <h1 className={style.header__title}></h1>
                </div>
                <div className={style.header__right}></div>
            </div>
        </section>
    );
}