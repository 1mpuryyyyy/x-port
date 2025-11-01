import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import burgerIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";
import { clearAuthData } from '../../store/authSlice';

export default function Navbar() {
    const [burgerOpen, setBurgerOpen] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAnchorClick = (anchorId, e) => {
        e.preventDefault();

        const currentHash = window.location.hash;

        const isOnMain = currentHash === '' || currentHash === '#' || currentHash === '#/';

        if (!isOnMain) {
            navigate(`/#${anchorId}`);
        } else {
            const element = document.getElementById(anchorId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        setBurgerOpen(false);
    };

    const handleLogout = () => {
        dispatch(clearAuthData());
    };


    return (
        <nav className={style["navbar"]} id='navbar'>
            <div className={style.navbar__section}>
                <Link to="/" className={style.navbar__logo}>
                    <img src={logo} alt="Логотип" title='XPORT' />
                </Link>
                <p className={style.logo__title}>XPORT</p>
            </div>

            <div className={`${style.navbar__section} ${style.main}`}>
                <a href="#about" onClick={(e) => handleAnchorClick('about', e)}><p>О нас</p></a>
                <a href="#directions" onClick={(e) => handleAnchorClick('directions', e)}><p>Направления</p></a>
                <a href="#how_work" onClick={(e) => handleAnchorClick('how_work', e)}><p>Как это работает</p></a>
                <a href="#partners" onClick={(e) => handleAnchorClick('partners', e)}><p>Кенты</p></a>
                <a href="#contacts" onClick={(e) => handleAnchorClick('contacts', e)}><p>Контакты</p></a>
            </div>

            <div className={style.navbar__section}>
                {isAuthenticated ? (
                    <div className={style.userSection}>
                        <p>Добро пожаловать, <Link to={'/dashboard'}><span className={style.name}>{user?.firstName}</span></Link></p>
                        <button className={style.logoutBtn} onClick={handleLogout}>Выйти</button>
                    </div>
                ) : (
                    <Link to="/login"><button className={style.login}>Войти</button></Link>
                )}
            </div>

            <button className={style.burgerBtn} onClick={() => setBurgerOpen(true)}>
                <img src={burgerIcon} alt="Меню" />
            </button>

            <div className={`${style.burgerOverlay} ${burgerOpen ? style.open : ""}`}>
                <div className={style.burgerMenu}>
                    <button className={style.closeBtn} onClick={() => setBurgerOpen(false)}>
                        <img src={closeIcon} alt="Закрыть" />
                    </button>
                    <div className={style.burgerLinks}>
                        <a href="#about" onClick={(e) => handleAnchorClick('about', e)}><p>О нас</p></a>
                        <a href="#directions" onClick={(e) => handleAnchorClick('directions', e)}><p>Направления</p></a>
                        <a href="#how_work" onClick={(e) => handleAnchorClick('how_work', e)}><p>Как это работает</p></a>
                        <a href="#partners" onClick={(e) => handleAnchorClick('partners', e)}><p>Кенты</p></a>
                        <a href="#contacts" onClick={(e) => handleAnchorClick('contacts', e)}><p>Контакты</p></a>
                        <span className={style.sep}></span>
                        <div className={style.navbar__section}>
                            {isAuthenticated ? (
                                <div className={style.userSection}>
                                    <p>Добро пожаловать, <Link to={'/dashboard'}><span className={style.name}>{user?.firstName}</span></Link></p>
                                    <button className={style.logoutBtn} onClick={handleLogout}>Выйти</button>
                                </div>
                            ) : (
                                <Link to="/login"><button className={style.login}>Войти</button></Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.menuBackdrop} onClick={() => setBurgerOpen(false)} />
            </div>
        </nav>
    );
}
