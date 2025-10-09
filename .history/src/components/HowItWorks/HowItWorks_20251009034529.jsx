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
    // Состояние для хранения текущего значения слайдера (от 0 до 100)
    const [sliderValue, setSliderValue] = useState(0);

    // Определяем активный шаг на основе положения слайдера
    const activeStepIndex = useMemo(() => {
        // Порог для активации шага. 20 = 100 / 5 шагов.
        // `Math.min` и `Math.max` гарантируют, что индекс будет в диапазоне от 0 до 4.
        const index = Math.min(Math.floor(sliderValue / 20), stepsData.length - 1);
        return Math.max(0, index);
    }, [sliderValue]);

    const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value));
    };

    // Вычисляем стиль для трека слайдера, чтобы закрашивать его до ползунка
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
                    const isActive = index <= activeStepIndex;
                    const isCurrent = index === activeStepIndex;
                    const isFinalStep = index === stepsData.length - 1;
                    const isCompletedFinal = isFinalStep && sliderValue >= 80;

                    // Динамический стиль для круга с номером
                    const circleStyle = isCurrent && !isFinalStep
                        ? { '--progress-angle': `${(sliderValue % 20) * 18}deg` }
                        : {};

                    return (
                        <div key={index} className={`${styles.step} ${isActive ? styles.active : ''}`}>
                            <div
                                className={`
                  ${styles.circle}
                  ${isCompletedFinal ? styles.circleFinalCompleted : ''}
                  ${isCurrent && !isFinalStep ? styles.circleCurrent : ''}
                `}
                                style={circleStyle}
                            >
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