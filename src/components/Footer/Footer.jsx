
import styles from "./Footer.module.css";
import logo from "../../assets/logo.svg";
import facebook from "../../assets/f.svg";
import youtube from "../../assets/youtube.png";
import telegram from "../../assets/telegram.svg";
import vk from "../../assets/vk.svg";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.colLogo}>
                    <div className={styles.logoRow}>
                        <img src={logo} alt="XPORT" className={styles.logoImg} />
                        <span className={styles.logoText}>XPORT</span>
                    </div>
                    <div className={styles.copyright}>© 2025 XPORT</div>
                </div>
                <div className={styles.colSocials}>
                    <div className={styles.socialsTitle}>Социальные сети</div>
                    <div className={styles.socialsList}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="YouTube" />
                        </a>
                        <a href="https://t.me/xport" target="_blank" rel="noopener noreferrer" className={styles.tgIcon}>
                            <img src={telegram} alt="Telegram" />
                        </a>
                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                            <img src={vk} alt="VK" />
                        </a>
                    </div>
                    <div className={styles.email}>info@xport.app</div>
                </div>
                <div className={styles.colDocs}>
                    <div className={styles.sectionTitle}>Документы</div>
                    <ul className={styles.docsList}>
                        <li><a href="#">Пользовательское соглашение</a></li>
                        <li><a href="#">Политика конфиденциальности</a></li>
                        <li><a href="#">Реферальное соглашение</a></li>
                    </ul>
                    <div className={styles.sectionTitle} style={{ marginTop: 32 }}>Новости и рассылка</div>
                </div>
                <div className={styles.colCats}>
                    <div className={styles.sectionTitle}>Категории</div>
                    <ul className={styles.catsList}>
                        <li><a href="#">Автомобили</a></li>
                        <li><a href="#">Люксовые товары</a></li>
                        <li><a href="#">Недвижимость</a></li>
                        <li><a href="#">Маркетплейсы</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}