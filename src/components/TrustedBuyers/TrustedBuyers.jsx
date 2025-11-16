import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./TrustedBuyers.module.css";
import { trustedBuyers } from "../TrustedBuyers.mock";

function Stars({ value, size = 14 }) {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    return (
        <span className={styles.stars} aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => {
                const idx = i + 1;
                const filled = idx <= full || (hasHalf && idx === full + 1);
                return (
                    <svg
                        key={i}
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        className={filled ? styles.starFilled : styles.starEmpty}
                        aria-hidden
                    >
                        <polygon
                            points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
                            fill="currentColor"
                        />
                    </svg>
                );
            })}
        </span>
    );
}

function BuyerCard({ buyer, onContact }) {
    return (
        <article className={styles.card}>
            <div className={styles.photoWrap}>
                <img src={buyer.photo} alt={buyer.name} className={styles.photo} />
            </div>

            <div className={styles.info}>
                <div className={styles.topRow}>
                    <h3 className={styles.name}>{buyer.name}</h3>
                    <div className={styles.ratingRow}>
                        <div className={styles.ratingStars}>
                            <span className={styles.ratingValue}>{buyer.rating.toFixed(1)}</span>
                            <Stars value={buyer.rating} />
                        </div>
                        <span className={styles.reviewsCount}>{buyer.reviewsCount} отзывов</span>
                    </div>
                </div>

                <ul className={styles.badges}>
                    {buyer.badges.map((b, i) => (
                        <li key={i} className={styles.badge}>
                            {b}
                        </li>
                    ))}
                </ul>

                <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Сделки</span>
                        <span className={styles.metaValue}>{buyer.dealsCount}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Рынок</span>
                        <span className={styles.metaValue}>{buyer.market}</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.contactBtn} onClick={() => onContact(buyer.id)}>
                        Связаться
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function TrustedBuyersList({ market }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState("rating");
    const [selectedMarkets, setSelectedMarkets] = useState(new Set());
    const [query, setQuery] = useState("");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (market) {
            setSelectedMarkets(new Set([market]));
        }
    }, [market]);

    function resetFilters() {
        setQuery("");
        setSortBy("rating");
    }

    const filtered = useMemo(() => {
        let list = trustedBuyers.slice();

        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter(
                (b) =>
                    b.name.toLowerCase().includes(q) ||
                    b.market.toLowerCase().includes(q) ||
                    b.badges.join(" ").toLowerCase().includes(q)
            );
        }

        if (selectedMarkets.size > 0) {
            list = list.filter((b) => selectedMarkets.has(b.market));
        }


        list.sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
            if (sortBy === "deals") return b.dealsCount - a.dealsCount;
            if (sortBy === "name") return a.name.localeCompare(b.name, "ru");
            return 0;
        });

        return list;
    }, [query, selectedMarkets, sortBy]);

    function handleContact(id) {
        navigate("/deal", { state: { buyerId: id } });
        window.scrollTo(0, 0);
    }

    function handleShowMore() {
        if (isAuthenticated) {
            setShowAll(true);
        } else {
            navigate("/login");
            window.scrollTo(0, 0);
        }
    }

    const visibleBuyers = showAll ? filtered : filtered.slice(0, 2);

    return (
        <section className={styles.root}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Байеры</h2>
                <div className={styles.controls}>
                    <div className={styles.searchWrap}>
                        <input
                            className={styles.search}
                            placeholder="Поиск по имени, рынку или тегам"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <button
                        className={styles.filterToggle}
                        onClick={() => setIsFiltersOpen((s) => !s)}
                        aria-expanded={isFiltersOpen}
                        aria-controls="filtersPanel"
                        title="Фильтры поиска"
                    >
                        фильтры поиска
                        <svg width="20" height="20" viewBox="0 0 24 24" className={styles.filterIcon}>
                            <path fill="currentColor" d="M3 5h18v2L14 13v5l-4 2v-7L3 7z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div id="filtersPanel" className={`${styles.filtersPanel} ${isFiltersOpen ? styles.open : ""}`}>
                <div className={styles.filtersCol}>
                    <div className={styles.filterLabel}>Сортировка</div>
                    <div className={styles.sortOptions}>
                        <button className={sortBy === "rating" ? styles.activeSort : ""} onClick={() => setSortBy("rating")}>
                            Рейтинг
                        </button>
                        <button className={sortBy === "reviews" ? styles.activeSort : ""} onClick={() => setSortBy("reviews")}>
                            Отзывы
                        </button>
                        <button className={sortBy === "deals" ? styles.activeSort : ""} onClick={() => setSortBy("deals")}>
                            Сделки
                        </button>
                        <button className={sortBy === "name" ? styles.activeSort : ""} onClick={() => setSortBy("name")}>
                            Имя
                        </button>
                    </div>
                </div>


                <div className={styles.filtersColRight}>
                    <div className={styles.filterActions}>
                        <button className={styles.resetBtn} onClick={resetFilters}>Сбросить</button>
                        <button className={styles.applyBtn} onClick={() => setIsFiltersOpen(false)}>Применить</button>
                    </div>
                </div>
            </div>

            <div className={styles.grid}>
                {visibleBuyers.map((b) => (
                    <BuyerCard key={b.id} buyer={b} onContact={handleContact} />
                ))}
            </div>


            <div className={styles.loadMoreWrap}>
                <a href='https://t.me' className={styles.loadMoreBtn} target="blank">Приведите своего байера</a>
                {filtered.length > 2 && !showAll && (
                    <button className={styles.loadMoreBtn} onClick={handleShowMore}>
                        Загрузить ещё
                    </button>
                )}
            </div>
        </section>
    );
}
