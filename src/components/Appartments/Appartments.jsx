import style from '../../static/direction.module.css';
import apartments from "../../assets/apartments.svg";
import lock from "../../assets/lock.svg";
import boldLock from "../../assets/bold-lock.svg";
import arr from "../../assets/blue-arr.svg";
import HowItWorks from '../HowItWorks/HowItWorks';
import TrustedBuyersList from '../TrustedBuyers/TrustedBuyers';

export const Appartments = () => {
    const stepsData = [
        { title: 'Регистрация', description: 'Вы заходите на наш сайт и проходите простую регистрацию — это займёт всего несколько минут.' },
        { title: 'Выбор недвижимости', description: 'Просмотрите каталог байеров и выберите подходящий вариант.' },
        { title: 'Связь с продавцом', description: 'Мы создаём безопасный чат для обсуждения деталей сделки, осмотра автомобиля и согласования условий.' },
        { title: 'Безопасная сделка', description: 'Проведите сделку с нашей гарантией: мы обеспечиваем безопасность платежей и юридическое сопровождение' },
        { title: 'Гарантия и поддержка', description: 'После покупки вы получаете гарантийную поддержку и помощь в решении любых вопросов.' },
    ];
    return (<div className={style.container}>
        <div className={style.header} id="about">
            <div className={style.header__left}>
                <div className={style.header__left__benchmark}>
                    <span className={style.lock}><img src={lock} />Безопасные сделки по недвижимости</span>
                    <span>·</span>
                    <span>Гарантия XPORT Escrow </span>
                </div>

                <h1 className={style.header__left__title}>Ваш <span>персональный байер</span> по покупке/продаже недвижимости</h1>
                <p className={style.header__left__description}>Недвижимость под защитой. Покупка и продажа без рисков и переплат. Мы гарантируем безопасную сделку через XPORT Escrow</p>
                <p className={style.header__left__span}> <img src={boldLock} />Гарант, которому доверяют более 1000 клиентов</p>
                <div className={style.header__left__buttons}>
                    <button className={style.greenButton} ><p>Начать сделку </p> <img className={style.arrow} src={arr} /></button>
                </div>
            </div>
            <div className={style.header__right}>
                <img src={apartments} />
            </div>
        </div>
        <HowItWorks stepsData={stepsData} subtitle={'Найдите недвижимость своей мечты с полной уверенностью в безопасности сделки.'} />
        <div className={`${style.buyers} ${style.aparts}`}>
            <TrustedBuyersList market={'Недвижимость'} />
        </div>
    </div>)
}