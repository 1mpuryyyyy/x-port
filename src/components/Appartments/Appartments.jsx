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
        {
            title: 'Выбор недвижимости', description: <>
                Вы можете выбрать байера из нашего каталога или <a href='https://t.me/xport_manager' className={style.highlight} target='blank'>привлечь своего, предварительно согласовав его кандидатуру</a>.
            </>
        },
        { title: 'Связь с продавцом', description: 'Клиент самостоятельно связывается с байером для обсуждения деталей сделки, осмотра товара и согласования условий.' },
        { title: 'Безопасная сделка', description: 'Проведите сделку с нашей гарантией: мы обеспечиваем безопасность платежей.' },
        { title: 'Гарантия и поддержка', description: 'После покупки клиент обращается напрямую к байеру для решения всех вопросов, связанных с оказанием услуги.' },
    ];

    const handleAnchorClick = (anchorId, e) => {
        e.preventDefault();
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                    <a className={style.greenButton} onClick={(e) => handleAnchorClick('aparts_buyers', e)} ><p>Начать сделку </p> <img className={style.arrow} src={arr} /></a>
                </div>
            </div>
            <div className={style.header__right}>
                <img src={apartments} />
            </div>
        </div>
        <HowItWorks stepsData={stepsData} subtitle={'Найдите недвижимость своей мечты с полной уверенностью в безопасности сделки.'} />
        <div className={`${style.buyers} ${style.aparts}`} id='aparts_buyers'>
            <TrustedBuyersList market={'Недвижимость'} />
        </div>
    </div>)
}