// import man1 from "../../assets/man_1.jpg";
// import woman1 from "../../assets/women_1.jpeg";
// import man2 from "../../assets/man_2.jpg";
// import woman2 from "../../assets/women_2.jpeg";
// import man3 from "../../assets/man_3.jpeg";
// import woman3 from "../../assets/women_3.jpeg";
// import man4 from "../../assets/man_4.jpeg";
// import woman4 from "../../assets/women_4.jpeg";
// import man5 from "../../assets/man_5.jpeg";
// import woman5 from "../../assets/women_5.jpeg";
import no_photo from "../../assets/no-photo.svg";

export const rawtrustedFaces = [
    {
        id: 1,
        name: "Ильшат",
        market: "Автомобили",
        photo: '',
        link: "#cars"
    },
    {
        id: 2,
        name: "Екатерина",
        market: "Недвижимость",
        photo: '',
        link: "#apart"
    },
    {
        id: 3,
        name: "Алексей",
        market: "P2P",
        photo: '',
        link: "#p2p"
    },
    {
        id: 4,
        name: "Ольга",
        market: "Люксовые товары",
        photo: '',
        link: "#lux"
    },
    {
        id: 5,
        name: "Максим",
        market: "",
        photo: '',
        link: "#b2b"
    },
    {
        id: 6,
        name: "Дарья",
        market: "Автомобили",
        photo: '',
        link: "#cars"
    },
    {
        id: 7,
        name: "Владимир",
        market: "P2P",
        photo: '',
        link: "#p2p"
    },
    {
        id: 8,
        name: "Анастасия",
        market: "Недвижимость",
        photo: '',
        link: "#apart"
    },
    {
        id: 9,
        name: "Сергей",
        market: "Автомобили",
        photo: '',
        link: "#cars"
    },
    {
        id: 10,
        name: "Мария",
        market: "Люксовые товары",
        photo: '',
        link: "#lux"
    }
];

export const trustedFaces = rawtrustedFaces.map(buyer => ({
    ...buyer,
    photo: buyer.photo || no_photo,
    gallery: buyer.gallery && buyer.gallery.length
        ? buyer.gallery.map(img => img || no_photo)
        : [no_photo],
}));