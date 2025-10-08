import { Link } from 'react-router-dom'
import style from './Navbar.module.css'

export default function Navbar() {
    const logo = '../../assets/logo.svg';
    return <nav className={style["nav-bar"]} id='navbar'>
        <ul id='ul'>
            <li>
                <Link to="/main/page" >
                    <img src={logo} alt="Лендинг" />
                </Link>
            </li>
            <li>
                <Link to="/main">
                    <img src={'/'} alt="Чат" />
                </Link>
            </li>
        </ul>
    </nav>
};