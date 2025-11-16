import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.module.css';

const Slider = ({ stepsData, subtitle }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderDone, setSliderDone] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 740 : false);

    const sectionRef = useRef();
    const stepsContainerRef = useRef();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 740);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const entryPoint = windowHeight * 0.5;
            const exitPoint = rect.height > windowHeight
                ? rect.height - windowHeight * 0.5
                : windowHeight * 0.5;

            if (rect.top > entryPoint) {
                setSliderValue(0);
                setSliderDone(false);
                return;
            }

            if (rect.bottom < exitPoint) {
                setSliderValue(100);
                setSliderDone(true);
                return;
            }

            const totalScrollable = rect.height + windowHeight - entryPoint - exitPoint;
            const scrolled = windowHeight - rect.top - entryPoint;
            const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
            const value = Math.round(progress * 100);

            setSliderValue(value);
            if (value >= 100 && !sliderDone) setSliderDone(true);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sliderDone]);

    const activeStepIndex = sliderValue >= 100 ? stepsData.length - 1 : Math.floor(sliderValue / (100 / stepsData.length));
    const sliderProgressStyle = {
        background: `linear-gradient(to right, var(--green) ${sliderValue}%, #404040 ${sliderValue}%)`,
    };

    return (
        <div ref={sectionRef} className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Как это работает</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>

            <div
                ref={stepsContainerRef}
                className={`${styles.stepsContainer} ${isMobile ? styles.vertical : styles.horizontal}`}
            >
                {isMobile && (
                    <div className={styles.verticalSliderWrapper} aria-hidden>
                        <div className={styles.verticalTrack}>
                            <div
                                className={styles.verticalProgress}
                                style={{ height: `${sliderValue}%` }}
                            />
                            <div
                                className={styles.verticalThumb}
                                style={{ top: `calc(${sliderValue}% - 10px)` }}
                            />
                        </div>
                    </div>
                )}

                {stepsData.map((step, index) => {
                    const isCompleted = index < activeStepIndex;
                    const isCurrent = index === activeStepIndex;
                    const isInactive = index > activeStepIndex;
                    const isFinalStep = index === stepsData.length - 1;
                    const isFinalCompleted = isFinalStep && sliderValue >= 80;

                    const circleClassName = [
                        styles.circle,
                        !isInactive ? styles.activeCircle : '',
                        (isCompleted || isCurrent) && index >= 0 ? styles.quarter1 : '',
                        (isCompleted || isCurrent) && index >= 1 ? styles.quarter2 : '',
                        (isCompleted || isCurrent) && index >= 2 ? styles.quarter3 : '',
                        (isCompleted || isCurrent) && index >= 3 ? styles.quarter4 : '',
                        isFinalCompleted ? styles.circleFinalCompleted : '',
                    ].join(' ');

                    return (
                        <div key={index} className={`${styles.step} ${isInactive ? styles.inactive : styles.active}`}>
                            <div className={circleClassName}>
                                {index + 1}
                            </div>
                            <div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {!isMobile && (
                <div className={styles.sliderWrapper}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        readOnly
                        className={styles.slider}
                        style={sliderProgressStyle}
                        tabIndex={-1}
                    />
                </div>
            )}
        </div>
    );
};

export default Slider;
