import React, { useRef, useEffect, useState } from 'react';
import styles from './HowItWorks.module.css';
import arrow from '../../assets/arrow.svg';

const HowItWorks = ({ stepsData, subtitle }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '-50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
            ref={sectionRef}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>Как это работает</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>

            <div className={styles.stepsContainer}>
                {stepsData.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.step}>
                            <div className={styles.stepHeader}>
                                <div className={`${styles.circle} ${styles[`circle_${index + 1}`]}`}>
                                    {index + 1}
                                </div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                            </div>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>

                        {index < stepsData.length - 1 && (
                            <div className={styles.arrow}>
                                <img src={arrow} alt="arrow" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;