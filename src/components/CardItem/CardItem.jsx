import { useNavigate } from 'react-router-dom';
import styles from "./CardItem.module.css";
import arr from "../../assets/arr.svg";

const CardItem = ({ imageUrl, title, description, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={imageUrl} alt={title} className={styles.cardImage} />
            <p className={styles.cardDescription}>{description}</p>
            <div className={styles.cardTitleWrapper}>
                <span className={styles.cardTitle}>{title}</span>
                <img src={arr} alt="arrow" className={styles.cardArrow} />
            </div>
        </div>
    );
};

export default CardItem;