import React, { useState, useMemo } from 'react';
import styles from './HowItWorks.module.css';

const stepsData = [
    {
        title: 'Регистрация',
        description: 'Вы заходите на наш сайт и проходите простую регистрацию — это займёт всего несколько минут.',
    },
    {
        title: 'Выбор продавца',
        description: 'Из списка проверенных продавцов вы выбираете того, с кем хотите провести сделку.',
    },
    {
        title: 'Создание чата',
        description: 'Мы создаём общий чат, где будут обсуждаться все условия и сроки сделки',
    },
    {
        title: 'Создание чата',
        description: 'Мы создаём общий чат, где будут обсуждаться все условия и сроки сделки',
    },
    {
        title: 'Создание чата',
        description: 'Мы создаём общий чат, где будут обсуждаться все условия и сроки сделки',
    },
];

const HowItWorks = () => {
    const [sliderValue, setSliderValue] = useState(0);

    // Определяем, какой шаг сейчас активен для анимации
    const currentStepIndex = useMemo(() => {
        // Если слайдер на 100, ни один шаг не является "текущим" в плане анимации
        if (sliderValue >= 100) {
            return stepsData.length - 1;
        }
        // `Math.floor(sliderValue / 20)` дает индекс от 0 до 4
        return Math.min(Math.floor(sliderValue / 20), stepsData.length - 1);
    }, [sliderValue]);


    const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value));
    };

    const sliderProgressStyle = {
        background: `linear-gradient(to right, #22c55e ${sliderValue}%, #374151 ${sliderValue}%)`,
    };

    return (
        // Убедитесь, что у родительского элемента есть темный фон, например, в .wrapper
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Как это работает</h2>
                <p className={styles.subtitle}>От идеи до договора. lorem lorem lorem lorem lorem lorem lorem</p>
            </div>

            <div className={styles.stepsContainer}>
                {stepsData.map((step, index) => {
                    // Определяем состояние каждого шага
                    const isCompleted = index < currentStepIndex; // Шаг пройден
                    const isCurrent = index === currentStepIndex; // Шаг в процессе анимации
                    const isFinalStep = index === stepsData.length - 1;
                    const isFinalCompleted = isFinalStep && sliderValue >= 100;

                    // Определяем классы для управления прозрачностью и цветом
                    const stepClassName = isCompleted || isCurrent ? styles.active : styles.inactive;

                    // Рассчитываем угол для анимации границы только для текущего шага
                    const circleStyle = isCurrent && !isFinalCompleted
                        ? { '--progress-angle': `${(sliderValue % 20) * 18}deg` }
                        : {};

                    // Собираем классы для круга
                    const circleClassName = [
                        styles.circle,
                        isCompleted && !isCurrent ? styles.circleCompleted : '',
                        isCurrent ? styles.circleCurrent : '',
                        isFinalCompleted ? styles.circleFinalCompleted : '',
                    ].join(' ');

                    return (
                        <div key={index} className={`${styles.step} ${stepClassName}`}>
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