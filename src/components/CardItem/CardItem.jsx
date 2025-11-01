import { Link } from "react-router-dom";
import styles from "./CardItem.module.css";
import arr from "../../assets/arr.svg";

const CardItem = ({ imageUrl, title, description, link }) => {
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={title} className={styles.cardImage} />
            <p className={styles.cardDescription}>{description}</p>
            <Link to={link} className={styles.cardTitleWrapper}>
                <span className={styles.cardTitle}>{title}</span>
                <img src={arr} alt="arrow" className={styles.cardArrow} />
            </Link>
        </div>
    );
};

export default CardItem;
