import React from 'react';
import styles from './InternetChanges.module.css';

const greenAdvantages = [
    "РАВНЫЕ ПРАВА",
    "БЫСТРЫЕ СДЕЛКИ",
    "ИНТЕГРИРОВАННОСТЬ",
    "МНОГОФУНКЦИОНАЛЬНОСТЬ",
    "НАДЕЖНОСТЬ"
];

const whiteDisadvantages = [
    "ОГРАНИЧЕННЫЙ ФУНКЦИОНАЛ",
    "НЕРАВЕНСТВО",
    "НЕНАДЕЖНОСТЬ",
    "ГАРАНТИЯ БЕЗОПАСНОСТИ",
    "СТРАХ"
];

function repeat(arr, times) {
    return Array(times).fill(arr).flat();
}

export default function InternetChanges() {
    const greenArray = repeat(greenAdvantages, 3);
    const whiteArray = repeat(whiteDisadvantages, 3);

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>Xport менят подход к международным покупкам
                Присоединяйтесь к новой культуре безопасных сделок</h2>
            <p className={styles.subtitle}>Станьте частью цифровой революции</p>
            <div className={styles.carouselWrapper}>
                <div className={styles.row}>
                    <div className={styles.carousel} aria-hidden>
                        <div className={styles.carouselTrackGreen}>
                            {greenArray.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <span className={styles.greenBadge}>{item}</span>
                                    <span className={styles.dot} />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.centerBlock}>
                    <span className={styles.logo}>Xport</span>
                    <span className={styles.centerDelim}>|</span>
                    <span className={styles.centerText}>История</span>
                </div>
                <div className={styles.row}>
                    <div className={styles.carousel} aria-hidden>
                        <div className={styles.carouselTrackWhite}>
                            {whiteArray.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <span className={styles.whiteBadge}>{item}</span>
                                    <span className={styles.dotWhite} />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}