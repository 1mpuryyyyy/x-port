import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import logo 

export default function Navbar() {
    return <nav className={style["nav-bar"]} id='navbar'>
        <ul id='ul'>
            <li>
                <Link to="/main/page" >
                    <img src={'/'} alt="Лендинг" />
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