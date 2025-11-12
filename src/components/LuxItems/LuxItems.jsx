import style from '../../static/direction.module.css';
import luxItems from "../../assets/lux.svg";
import lock from "../../assets/lock.svg";
import boldLock from "../../assets/bold-lock.svg";
import arr from "../../assets/blue-arr.svg";
import HowItWorks from '../HowItWorks/HowItWorks';
import TrustedBuyersList from '../TrustedBuyers/TrustedBuyers';

export const LuxItems = () => {
    const stepsData = [
        { title: 'Регистрация', description: 'Вы заходите на наш сайт и проходите простую регистрацию — это займёт всего несколько минут.' },
        { title: 'Выбор товара', description: 'Просмотрите каталог байеров и выберите подходящий вариант.' },
        { title: 'Связь с продавцом', description: 'Мы создаём безопасный чат для обсуждения деталей сделки, осмотра товара и согласования условий.' },
        { title: 'Безопасная сделка', description: 'Проведите сделку с нашей гарантией: мы обеспечиваем безопасность платежей и юридическое сопровождение' },
        { title: 'Гарантия и поддержка', description: 'После покупки вы получаете гарантийную поддержку и помощь в решении любых вопросов.' },
    ];
    return (<div className={style.container}>
        <div className={style.header} id="about">
            <div className={style.header__left}>
                <div className={style.header__left__benchmark}>
                    <span className={style.lock}><img src={lock} />Безопасные сделки по товарам класса люкс</span>
                    <span>·</span>
                    <span>Гарантия XPORT Escrow </span>
                </div>

                <h1 className={style.header__left__title}>Ваш <span>персональный байер</span> по покупке/продаже люксовых товаров</h1>
                <p className={style.header__left__description}>Товары под защитой. Покупка и продажа без рисков и переплат. Мы гарантируем безопасную сделку через XPORT Escrow</p>
                <p className={style.header__left__span}> <img src={boldLock} />Гарант, которому доверяют более 1000 клиентов</p>
                <div className={style.header__left__buttons}>
                    <button className={style.greenButton} ><p>Начать сделку </p> <img className={style.arrow} src={arr} /></button>
                </div>
            </div>
            <div className={style.header__right}>
                <img src={luxItems} />
            </div>
        </div>
        <HowItWorks stepsData={stepsData} subtitle={'Найдите вещь своей мечты с полной уверенностью в безопасности сделки.'} />
        <div className={`${style.buyers} ${style.lux}`}>
            <TrustedBuyersList market={'Люксовые товары'} />
        </div>
    </div>)
}