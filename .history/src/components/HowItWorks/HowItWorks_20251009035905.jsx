import React, { useState, useMemo } from 'react';
import styles from './HowItWorks.module.css';

const stepsData = [
    { title: 'Регистрация', description: 'Вы заходите на наш сайт и проходите простую регистрацию — это займёт всего несколько минут.' },
    { title: 'Выбор продавца', description: 'Из списка проверенных продавцов вы выбираете того, с кем хотите провести сделку.' },
    { title: 'Создание чата', description: 'Мы создаём общий чат, где будут обсуждаться все условия и сроки сделки' },
    { title: 'Создание чата', description: 'Мы создаём общий чат, где будут обсуждаться все условия и сроки сделки' },
    { title: 'Создание чата', description: 'Мы создаём общий чат, где будут обсуждаться все условия и сроки сделки' },
];

const HowItWorks = () => {
    const [sliderValue, setSliderValue] = useState(0);

    // Определяем, какой шаг сейчас активен (индекс от 0 до 4)
    const activeStepIndex = useMemo(() => {
        if (sliderValue >= 100) return 4;
        // Определяем индекс от 0 до 4 в зависимости от положения слайдера
        return Math.floor(sliderValue / 20);
    }, [sliderValue]);

    const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value));
    };

    const sliderProgressStyle = {
        background: `linear-gradient(to right, #22c55e ${sliderValue}%, #374151 ${sliderValue}%)`,
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Как это работает</h2>
                <p className={styles.subtitle}>От идеи до договора. lorem lorem lorem lorem lorem lorem lorem</p>
            </div>

            <div className={styles.stepsContainer}>
                {stepsData.map((step, index) => {
                    const isCompleted = index < activeStepIndex;
                    const isCurrent = index === activeStepIndex;
                    const isInactive = index > activeStepIndex;

                    const isFinalStep = index === 4;
                    const isFinalCompleted = isFinalStep && sliderValue >= 100;

                    // Динамически добавляем классы для управления стилем границ
                    const circleClassName = [
                        styles.circle,
                        !isInactive ? styles.activeCircle : '',
                        // Добавляем классы для каждой пройденной четверти
                        (isCompleted || isCurrent) && index >= 0 ? styles.quarter4 : '',
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
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className={styles.sliderWrapper}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className={styles.slider}
                    style={sliderProgressStyle}
                />
            </div>
        </div>
    );
};

export default HowItWorks;