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

    // Определяем, какой шаг сейчас активен для анимации (индекс от 0 до 4)
    const currentStepIndex = useMemo(() => {
        if (sliderValue >= 100) return 4;
        return Math.floor(sliderValue / 25); // Теперь у нас 4 анимируемых шага, каждый по 25%
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
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isInactive = index > currentStepIndex;

                    const isFinalStep = index === 4;
                    const isFinalCompleted = isFinalStep && sliderValue >= 100;

                    // Угол для плавной анимации ТЕКУЩЕЙ четверти
                    const animationAngle = isCurrent && !isFinalStep
                        ? (sliderValue % 25) * 3.6 // (value % 25) дает 0-25, * 3.6 -> 0-90 градусов
                        : 0;

                    // Собираем классы для круга
                    const circleClassName = [
                        styles.circle,
                        !isInactive ? styles.activeCircle : '', // Делаем границу зеленой
                        isCompleted ? styles.circleCompleted : '',
                        isCurrent ? styles.circleCurrent : '',
                        isFinalCompleted ? styles.circleFinalCompleted : '',
                    ].join(' ');

                    // Передаем в CSS переменные для статических и анимированных сегментов
                    const circleStyle = {
                        '--completed-quarters': index,
                        '--animation-angle': `${animationAngle}deg`,
                    };

                    return (
                        <div key={index} className={`${styles.step} ${isInactive ? styles.inactive : styles.active}`}>
                            <div className={circleClassName} style={circleStyle}>
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