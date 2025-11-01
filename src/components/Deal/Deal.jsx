import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { trustedBuyers } from "..//TrustedBuyers.mock";
import styles from "./Deal.module.css";
import { Star } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Deal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const buyerId = location.state?.buyerId;
    const buyer = trustedBuyers.find((b) => b.id === buyerId);

    if (!buyer) {
        return (
            <motion.div
                className={styles.notFound}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <p>Байер не найден</p>
                <button onClick={() => navigate(-1)} className={styles.backBtn}>
                    Назад
                </button>
            </motion.div>
        );
    }

    const {
        name,
        market,
        rating,
        reviewsCount,
        price,
        description,
        details,
        telegram,
        gallery,
        photo,
    } = buyer;

    return (
        <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={styles.header}>
                <div className={styles.profile}>
                    <img src={photo} alt={name} className={styles.avatar} />
                    <div className={styles.info}>
                        <h2>{name}</h2>
                        <p className={styles.market}>{market}</p>
                        <div className={styles.rating}>
                            <Star className={styles.star} />
                            <span>{rating}</span>
                            <span className={styles.reviews}>({reviewsCount} отзывов)</span>
                        </div>
                    </div>
                </div>

                <div className={styles.priceBlock}>
                    <p className={styles.priceLabel}>Стоимость услуг</p>
                    <p className={styles.price}>{price.toLocaleString()} ₽</p>
                    <a
                        href={telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactBtn}
                    >
                        Написать сообщение
                    </a>
                </div>
            </div>

            <motion.div
                className={styles.gallery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {gallery.map((img, index) => (
                    <motion.img
                        key={index}
                        src={img}
                        alt={`Фото ${index + 1}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                    />
                ))}
            </motion.div>

            <motion.div
                className={styles.section}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h3>Описание</h3>
                <p className={styles.description}>{description}</p>
            </motion.div>

            <motion.div
                className={styles.section}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <h3>Сведения</h3>
                <div className={styles.detailsGrid}>
                    {Object.entries(details).map(([key, value], i) => (
                        <div key={i} className={styles.detailItem}>
                            <span className={styles.detailKey}>{key}</span>
                            <span className={styles.detailValue}>{value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.button
                onClick={() => navigate(-1)}
                className={styles.backBtn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                ← Назад
            </motion.button>
        </motion.div>
    );
};

export default Deal;
