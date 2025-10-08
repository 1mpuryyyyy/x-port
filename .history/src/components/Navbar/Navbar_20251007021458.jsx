import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import logo from '../../assets/logo.svg'

export default function Navbar() {
    return (
        <nav className={style["nav-bar"]} id='navbar'>
            <div className={style.logo}>
                <Link to="/" >
                    <img src={logo} alt="Логотип" title='X-Port' />
                </Link>
                <p className={style.}
            </div>
            <Link to="/main">
                <img src={'/'} alt="Чат" />
            </Link>
        </nav >);
};