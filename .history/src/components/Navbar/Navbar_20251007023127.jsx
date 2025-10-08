import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import logo from '../../assets/logo.svg'

export default function Navbar() {
    return (
        <nav className={style["navbar"]} id='navbar'>
            <div className={style.navbar__section}>
                <Link to="/" >
                    <img src={logo} alt="Логотип" title='XPORT' />
                </Link>
                <p className={style.logo__title}>
                    XPORT
                </p>
            </div>
            <div className={style.navbar__section.}>
                <Link to="/">
                    <p>О нас</p>
                </Link>
                <Link to="/">
                    <p>Направления</p>
                </Link>
                <Link to="/">
                    <p>Как это работает</p>
                </Link>
                <Link to="/">
                    <p>Кенты</p>
                </Link>
                <Link to="/">
                    <p>Контакты</p>
                </Link>
            </div>
            <div className={style.navbar__section}>
                <Link>
                    <button>Войти</button>
                </Link>
                <Link>
                    <button>Начать сделку =)</button>
                </Link>
            </div>
        </nav >);
};