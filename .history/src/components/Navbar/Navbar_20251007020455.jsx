export default function Navbar() {
    return <nav className={style["nav-bar"]} id='navbar'>
        <ul id='ul'>
            <li>
                <Link to="/main/page" >
                    <img src={chat} alt="Лендинг" />
                </Link>
            </li>
            <li className={activePath === "/main" ? style.active : ""}>
                <Link to="/main">
                    <img src={home} alt="Чат" />
                </Link>
            </li>
        </ul>
    </nav>
};