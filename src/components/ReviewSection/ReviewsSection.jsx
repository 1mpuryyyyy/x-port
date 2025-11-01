import { useMemo } from "react";
import styles from "./ReviewsSection.module.css";
import { reviewsMock } from "./Reviews.mock.js";
import arrow from "../../assets/arrow.svg"

function Stars({ value, size = 28 }) {
    return (
        <span className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
                <svg
                    key={i}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    className={value >= i ? styles.starActive : styles.starInactive}
                >
                    <polygon
                        points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
                        fill="currentColor"
                    />
                </svg>
            ))}
        </span>
    );
}

function ReviewCard({ review }) {
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewText}>{review.text}</div>
            <div className={styles.reviewMeta}>
                <span className={styles.reviewName}>{review.name}</span>
                <Stars value={review.rating} size={21} />
            </div>
        </div>
    );
}

function InfiniteColumn({ reviews, delay = 0, idx }) {
    const fullList = useMemo(() => [...reviews, ...reviews], [reviews]);
    return (
        <div
            className={`${styles.infiniteColumn} ${styles[idx]}`}
            style={{
                animationDelay: `${delay}s`
            }}
        >
            {fullList.map((rev, idx) => (
                <ReviewCard review={rev} key={idx + rev.name + rev.text.slice(0, 8)} />
            ))}
        </div>
    );
}

export default function ReviewsSection() {
    const left = reviewsMock.filter((_, i) => i % 2 === 0);
    const right = reviewsMock.filter((_, i) => i % 2 === 1);
    const avg =
        reviewsMock.reduce((acc, r) => acc + r.rating, 0) / reviewsMock.length;

    const redirect = () => {
        const element = document.getElementById("directions");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.root}>
            <div className={styles.leftBlock}>
                <h2 className={styles.title}>Люди, которые нам доверились</h2>
                <h3 className={styles.subtitle}>Более 200+ отзывов настоящих людей</h3>
                <div className={styles.avgRow}>
                    <Stars value={Math.round(avg)} />
                    <span className={styles.avgValue}>{avg.toFixed(2)}</span>
                </div>
                <p className={styles.desc}>
                    с различных площадок, выполненных <br /> в едином стиле
                </p>
                <button className={styles.button} onClick={() => redirect()}>
                    Стать клиентом <img className={styles.buttonArrow} src={arrow} />
                </button>
            </div>
            <div className={styles.carouselBlock}>
                <div className={styles.carouselGrid}>

                    <InfiniteColumn reviews={left} delay={0} idx={"left"} />
                    <InfiniteColumn reviews={right} delay={0} idx={"right"} />
                </div>
            </div>
        </section>
    );
}