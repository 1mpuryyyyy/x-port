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
        {
            title: 'Выбор товара', description: <>
                Вы можете выбрать байера из нашего каталога или <a href='https://t.me/' className={style.highlight} target='blank'>привлечь своего, предварительно согласовав его кандидатуру</a>.
            </>
        },
        { title: 'Связь с продавцом', description: 'Клиент самостоятельно связывается с байером для обсуждения деталей сделки, осмотра товара и согласования условий.' },
        { title: 'Безопасная сделка', description: 'Проведите сделку с нашей гарантией: мы обеспечиваем безопасность платежей.' },
        { title: 'Гарантия и поддержка', description: 'После покупки клиент обращается напрямую к байеру для решения всех вопросов, связанных с оказанием услуги.' },
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