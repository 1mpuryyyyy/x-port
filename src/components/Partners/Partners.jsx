import styles from "./Partners.module.css";
import { partnersMock } from "./Partners.mock.js";

export default function Partners() {
    const partnersArray = [...partnersMock, ...partnersMock, ...partnersMock];

    return (
        <section className={styles.root}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Партнеры</h2>
                <div className={styles.rightText}>
                    <span><span className={styles.rightText__span}>Платформа XPORT</span> —<br />официальный гарант для ваших средств</span>
                </div>
            </div>
            <div className={styles.carouselWrapper}>
                <div className={styles.carouselMaskLeft} />
                <div className={styles.carouselMaskRight} />
                <div className={styles.carousel}>
                    <div className={styles.carouselTrack}>
                        {partnersArray.map((item, idx) => (
                            <div className={styles.partnerCard} key={idx}>
                                <span className={styles.partnerName}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}