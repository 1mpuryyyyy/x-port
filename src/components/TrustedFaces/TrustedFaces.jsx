import { useState, useEffect } from "react";
import styles from "./TrustedFaces.module.css";
import { trustedFaces } from "./trustedFaces.mock";
import arrow from "../../assets/arrow.svg";

function getVisibleCards() {
    const width = window.innerWidth;
    if (width >= 1600) return 5;
    if (width >= 1200) return 4;
    if (width >= 860) return 3;
    return 2;
}

export default function TrustedFaces() {
    const [startIdx, setStartIdx] = useState(0);
    const [visibleCards, setVisibleCards] = useState(getVisibleCards());

    useEffect(() => {
        function onResize() {
            setVisibleCards(getVisibleCards());
            setStartIdx(0);
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);


    const canScrollLeft = startIdx > 0;
    const canScrollRight = startIdx + visibleCards < trustedFaces.length;

    function scrollLeft() {
        if (canScrollLeft) setStartIdx((idx) => idx - 1);
    }
    function scrollRight() {
        if (canScrollRight) setStartIdx((idx) => idx + 1);
    }

    const progress =
        trustedFaces.length <= visibleCards
            ? 1
            : (startIdx + visibleCards) / trustedFaces.length;

    return (
        <div className={styles.root}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Доверенные лица проекта</h2>
                <div className={styles.arrows}>
                    <button
                        className={`${styles.arrowBtn} ${canScrollLeft ? styles.arrowActive : ""} ${styles.arrowLeft}`}
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        aria-label="Листать влево"
                        type="button"
                    >
                        <span className={styles.arrowIcon}><img src={arrow} /></span>
                    </button>
                    <button
                        className={`${styles.arrowBtn} ${canScrollRight ? styles.arrowActive : ""} ${styles.arrowRight}`}
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        aria-label="Листать вправо"
                        type="button"
                    >
                        <span className={styles.arrowIcon}><img src={arrow} /></span>
                    </button>
                </div>
            </div>
            <div className={styles.carousel}>
                {trustedFaces
                    .slice(startIdx, startIdx + visibleCards)
                    .map((profile) => (
                        <div
                            className={styles.card}
                            key={profile.id}
                            tabIndex={0}
                            onClick={() => window.open(profile.link, "_blank")}
                        >
                            <img
                                src={`${profile.photo}`}
                                alt={profile.name}
                                className={styles.cardImg}
                                draggable={false}
                                loading="lazy"
                            />
                            <div className={styles.cardInfo}>
                                <div className={styles.cardName}>{profile.name}</div>
                                <div className={styles.cardMarket}>{profile.market}</div>
                            </div>
                            <div className={styles.cardArrow}><img src={arrow} alt="" /></div>
                        </div>
                    ))}
            </div>
            <div className={styles.sliderLine}>
                <div
                    className={styles.sliderFill}
                    style={{ width: `${Math.min(progress, 1) * 100}%` }}
                />
            </div>
        </div>
    );
}