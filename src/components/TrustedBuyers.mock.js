// import man1 from "../assets/man_1.jpg";
// import woman1 from "../assets/women_1.jpeg";
// import man2 from "../assets/man_2.jpg";
// import woman2 from "../assets/women_2.jpeg";
// import man3 from "../assets/man_3.jpeg";
// import woman3 from "../assets/women_3.jpeg";
// import man4 from "../assets/man_4.jpeg";
// import woman4 from "../assets/women_4.jpeg";
// import man5 from "../assets/man_5.jpeg";
// import woman5 from "../assets/women_5.jpeg";
import no_photo from "../assets/no-photo.svg";

const telegramLink = "https://t.me/metrofriend";

export const rawBaseBuyers = [
    {
        id: 1,
        name: "Ильшат",
        market: "Автомобили",
        photo: '',
        rating: 4.9,
        reviewsCount: 103,
        dealsCount: 43,
        price: 1500,
        badges: ["Надёжный байер", "Продажи с доставкой", "Работает по договору"],
        telegram: telegramLink,
        description:
            "Опытный байер в сфере автомобилей. Помогает с покупкой машин в России и за рубежом, занимается подбором, проверкой и перегоном. Репутация проверена временем.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "10 000 ₽",
            "Регион работы": "Россия, Европа",
            "Форма оплаты": "Карта / СБП / Криптовалюта",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 2,
        name: "Екатерина",
        market: "Недвижимость",
        photo: '',
        rating: 4.7,
        reviewsCount: 58,
        dealsCount: 21,
        price: 2000,
        badges: ["Проверенный профиль", "Индивидуальный подход"],
        telegram: telegramLink,
        description:
            "Профессиональный байер в сфере недвижимости. Помогает с арендой и покупкой квартир, апартаментов и коммерческой недвижимости. Всегда на связи с клиентами.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "5 000 ₽",
            "Регион работы": "Москва и МО",
            "Форма оплаты": "Карта / Безнал",
        },
        gallery: ['', '', '', '',  ''],
    },
    {
        id: 3,
        name: "Алексей",
        market: "P2P",
        photo: '',
        rating: 4.8,
        reviewsCount: 76,
        dealsCount: 31,
        price: 1000,
        badges: ["Надёжный байер", "Работает по договору"],
        telegram: telegramLink,
        description:
            "Специалист по P2P операциям. Гарантирует безопасность сделок, быструю проверку и прозрачность всех этапов перевода средств.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "3 000 ₽",
            "Регион работы": "Онлайн, международно",
            "Форма оплаты": "Криптовалюта / СБП",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 4,
        name: "Ольга",
        market: "Люксовые товары",
        photo: '',
        rating: 4.6,
        reviewsCount: 42,
        dealsCount: 18,
        price: 2500,
        badges: ["Проверенный профиль", "Гарантия качества"],
        telegram: telegramLink,
        description:
            "Занимается заказом и выкупом люксовых брендов из Европы и США. Предлагает лучшие цены и полную проверку оригинальности.",
        details: {
            "Берёте ли срочные заказы": "Нет",
            "Минимальная сумма заказа": "7 000 ₽",
            "Регион работы": "Европа / США",
            "Форма оплаты": "PayPal / Карта",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 5,
        name: "Максим",
        market: "B2B",
        photo: '',
        rating: 4.95,
        reviewsCount: 210,
        dealsCount: 120,
        price: 3000,
        badges: ["Топ-партнёр", "Оптовые поставки", "Работает по договору"],
        telegram: telegramLink,
        description:
            "Специализируется на крупных оптовых закупках и поставках для бизнеса. Гарантирует честные условия и логистику под ключ.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "50 000 ₽",
            "Регион работы": "Россия, СНГ",
            "Форма оплаты": "Безнал / Карта",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 6,
        name: "Дарья",
        market: "Автомобили",
        photo: '',
        rating: 4.4,
        reviewsCount: 30,
        dealsCount: 12,
        price: 1200,
        badges: ["Быстрая оплата", "Доставка по России"],
        telegram: telegramLink,
        description:
            "Занимается поиском и выкупом запчастей и аксессуаров для автомобилей. Работает быстро и с гарантией подлинности.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "2 000 ₽",
            "Регион работы": "Россия",
            "Форма оплаты": "Карта / СБП",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 7,
        name: "Владимир",
        market: "P2P",
        photo: '',
        rating: 4.2,
        reviewsCount: 12,
        dealsCount: 5,
        price: 800,
        badges: ["Молодой продавец"],
        telegram: telegramLink,
        description:
            "Новый участник в P2P-сегменте, быстро набирающий рейтинг. Отличается пунктуальностью и вниманием к деталям.",
        details: {
            "Берёте ли срочные заказы": "Нет",
            "Минимальная сумма заказа": "1 000 ₽",
            "Регион работы": "Онлайн",
            "Форма оплаты": "СБП / Карта",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 8,
        name: "Анастасия",
        market: "Недвижимость",
        photo: '',
        rating: 4.85,
        reviewsCount: 96,
        dealsCount: 40,
        price: 2500,
        badges: ["Специалист по элитным объектам"],
        telegram: telegramLink,
        description:
            "Помогает с покупкой и арендой элитной недвижимости. Работает с премиум-сегментом, ведёт сделки конфиденциально и безопасно.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "20 000 ₽",
            "Регион работы": "Москва, Санкт-Петербург",
            "Форма оплаты": "Безнал / Карта",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 9,
        name: "Сергей",
        market: "Автомобили",
        photo: '',
        rating: 4.1,
        reviewsCount: 9,
        dealsCount: 2,
        price: 600,
        badges: ["Низкая комиссия"],
        telegram: telegramLink,
        description:
            "Помогает с подбором бюджетных автомобилей и комплектующих. Отличный вариант для экономных покупателей.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "1 000 ₽",
            "Регион работы": "Россия",
            "Форма оплаты": "СБП / Карта",
        },
        gallery: ['', '', '', '', ''],
    },
    {
        id: 10,
        name: "Мария",
        market: "Люксовые товары",
        photo: '',
        rating: 4.75,
        reviewsCount: 61,
        dealsCount: 29,
        price: 1800,
        badges: ["Опытный байер", "Гарантия оригинальности"],
        telegram: telegramLink,
        description:
            "Профессионально занимается заказом брендовых сумок, обуви и аксессуаров. Гарантирует 100% оригинальность.",
        details: {
            "Берёте ли срочные заказы": "Да",
            "Минимальная сумма заказа": "6 000 ₽",
            "Регион работы": "Европа, США",
            "Форма оплаты": "PayPal / Карта",
        },
        gallery: ['', '', '', '', ''],
    }
];


export const baseBuyers = rawBaseBuyers.map(buyer => ({
    ...buyer,
    photo: buyer.photo || no_photo,
    gallery: buyer.gallery && buyer.gallery.length
        ? buyer.gallery.map(img => img || no_photo)
        : [no_photo],
}));

const duplicatedBuyers = Array.from({ length: 10 }).map((_, i) => {
    const base = baseBuyers[i % 10];
    return {
        ...base,
        id: 11 + i,
        name: `${base.name}`,
    };
});

export const trustedBuyers = [...baseBuyers, ...duplicatedBuyers];