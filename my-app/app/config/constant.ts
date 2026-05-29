import axios from "axios";

const url: string = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const navItems = [
    {routes : url + '/',label : 'Home',},
    {routes : url + '/projects',label : 'Projects',},
    {routes : url + '/about',label : 'About Dev',},
    {routes : url + '/contact',label : 'Contact',},
];

export const corusel = [
    {name : "xonadon", description:"zamonaviy xonadoningizni biz bilan quring", path : "/sideBor/uy.jpeg"} ,
    {name : "ofis", description:"zamonaviy ofisingizni biz bilan quring", path : "/sideBor/ofis.jpeg"} ,
    {name : "restaran", description:"zamonaviy restaraningizni biz bilan quring", path : "/sideBor/toyxona.jpg"} ,
    {name : 'kop xonali uylar', description:'kop xonali uylarni biz bilan quring', path: "/sideBor/dom.png"} ,
    {name : 'villa', description:'dam olish uchun villalar slgbdjkxnbcs', path: '/sideBor/galati.jpg'},
    {name : "sam moyka", descreption: "shaxsiy biznes uchun dizayn", path: "/sideBor/sammoyka.jpg"}
] 

export const projects = [
    { id: 1, name: "Premium Xonadon", category: "Xonadon", tags: ["Interyer", "Classic", "Zal"], description: "Zamonaviy va qulay xonadon dizayni.", path: "/sideBor/uy.jpeg" },
    { id: 2, name: "Smart Ofis", category: "Ofis", tags: ["Interyer", "HiTec", "Zal"], description: "Ish samaradorligini oshiruvchi ofis muhiti.", path: "/sideBor/ofis.jpeg" },
    { id: 3, name: "Milliy Restaran", category: "Restaran", tags: ["Exterer", "Classic", "Zal"], description: "An'anaviy va zamonaviy uslub uyg'unligi.", path: "/sideBor/toyxona.jpg" },
    { id: 4, name: "Ko'p Qavatli Uy", category: "Ko'p xonali", tags: ["Exterer", "Minimalizm"], description: "Katta oilalar uchun ideal tanlov.", path: "/sideBor/dom.png" },
    { id: 5, name: "Dengiz Bo'yi Villa", category: "Villa", tags: ["Exterer", "NeoTec", "Zal"], description: "Haqiqiy dam olish maskani.", path: "/sideBor/galati.jpg" },
    { id: 6, name: "Modern Penthouse", category: "Xonadon", tags: ["Interyer", "Minimalizm", "Oshxona"], description: "Shahar tepasidagi hashamatli hayot.", path: "/sideBor/uy.jpeg" },
    { id: 7, name: "IT Center", category: "Ofis", tags: ["Interyer", "HiTec"], description: "Texnologik rivojlangan ish joyi.", path: "/sideBor/ofis.jpeg" },
    { id: 8, name: "Luxury Villa", category: "Villa", tags: ["Exterer", "NeoTec", "Dush"], description: "Premium darajadagi dam olish maskani.", path: "/sideBor/galati.jpg" },
];

export const sidebarCategories = [
    { title: "Asosiy", items: ["Interyer", "Exterer"] },
    { title: "Uslublar", items: ["NeoTec", "HiTec", "Classic", "Minimalizm"] },
    { title: "Xonalar", items: ["Dush", "Xojatxona", "Oshxona", "Zal"] }
];
export const homePageAbout = {
    title : "Biz haqimizda",
    description : "biz barch xizmatlar mavjud. Biz sizga eng zo'r dizaynlarni taqdim etamiz. biz 6 yildan beri bu sohada faoliyat yuritib kelmoqdamiz. Tajribali dizaynerlar va arxitektorlar jamoasiga egamiz. Biz sizga eng zo'r dizaynlarni taqdim etamiz kichik xonadonlardan tortib, katta villalarigacha bo'lgan barcha xizmatlarni biz bilan quring.",
    image : "/sideBor/uy.jpeg",
}

const axiosIns = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json",
    }
})

export default axiosIns