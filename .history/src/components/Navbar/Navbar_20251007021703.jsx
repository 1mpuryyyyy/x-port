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
            <divclassName={style.navbar__section}></div>
            <Link to="/main">
                <img src={'/'} alt="Чат" />
            </Link>
        </nav >);
};