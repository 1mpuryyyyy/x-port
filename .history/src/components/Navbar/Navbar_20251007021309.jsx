import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import logo from '../../assets/logo.svg'

export default function Navbar() {
    return (
        <nav className={style["nav-bar"]} id='navbar'>
            <div>
                
            </div>
            <Link to="/main/page" >
                <img src={logo} alt="Логотип" title='X-Port' />
            </Link>
            <Link to="/main">
                <img src={'/'} alt="Чат" />
            </Link>
        </nav>);
};