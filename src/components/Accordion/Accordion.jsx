import { useState } from "react";
import styles from "./Accordion.module.css";
import { faqData, allQuestionsData } from "./faq.mock";
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';

function AccordionItem({ question, answer, isOpen, onClick, children }) {
    return (
        <div className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <button className={styles.header} onClick={onClick} type="button">
                <span className={styles.question}>{question}</span>
                <span className={styles.icon}>{isOpen ? <img src={minus} /> : <img src={plus} />}</span>
            </button>
            <div
                className={styles.body}
                style={{
                    maxHeight: isOpen ? (children ? "1000px" : "300px") : "0",
                    paddingTop: isOpen ? (children ? "18px" : "12px") : "0",
                    paddingBottom: isOpen ? "24px" : "0",
                }}
            >
                <div className={styles.content} style={{ opacity: isOpen ? 1 : 0 }}>
                    {answer && <div className={styles.answer}>{answer}</div>}
                    {children}
                </div>
            </div>
        </div>
    );
}

function AllQuestionsAccordion({ isOpen }) {
    const [opened, setOpened] = useState(null);
    return (
        <div className={styles.allQuestions}>
            {allQuestionsData.map((item, idx) => (
                <AccordionItem
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={opened === idx && isOpen}
                    onClick={() =>
                        setOpened(opened === idx ? null : idx)
                    }
                />
            ))}
        </div>
    );
}

export default function Accordion() {
    const [opened, setOpened] = useState(0);
    const isAllOpen = opened === faqData.length;

    return (
        <div className={styles.root}>
            {faqData.map((item, idx) => (
                <AccordionItem
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={opened === idx}
                    onClick={() => setOpened(opened === idx ? null : idx)}
                />
            ))}
            <AccordionItem
                question="Смотреть все вопросы"
                isOpen={isAllOpen}
                onClick={() => setOpened(isAllOpen ? null : faqData.length)}
            >
                <AllQuestionsAccordion isOpen={isAllOpen} />
            </AccordionItem>
        </div>
    );
}