import styles from "./CardItem.module.css";
import { FiChevronRight } from "react-icons/fi";

const CardItem = ({ imageUrl, title, description, link }) => {
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.cardImage} />
            <p className={styles.cardDescription}>{description}</p>
            <a href={link} className={styles.cardTitleWrapper}>
                <span className={styles.cardTitle}>{title}</span>
                <FiChevronRight className={styles.cardArrow} />
            </a>
        </div>
    );
};

export default CardItem;
