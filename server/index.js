/**
 * Asosiy server fayli. Express serverini sozlaydi va MongoDB ga ulanadi.
 */

const express = require("express"); // Express freymvorkini yuklash
const mongoose = require("mongoose"); // MongoDB bilan ishlash uchun Mongoose kutubxonasi
const cors = require("cors"); // Frontend bilan backendni bog'lash uchun CORS
const dotenv = require("dotenv"); // .env faylidan o'zgaruvchilarni o'qish uchun

// Maqola va Loyiha yo'nalishlarini (route) yuklash
const projectRoutes = require("./routes/projectRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

// .env faylidagi konfiguratsiyalarni yuklash
dotenv.config();

// Express ilovasini yaratish
const app = express();

/**
 * Middleware sozlamalari
 */
app.use(cors()); // CORS ni ruxsat berish (hamma domenlar uchun)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json({ limit: '50mb' })); // JSON formatidagi so'rovlarni o'qish imkoniyati (katta rasmlar uchun 50mb)
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/**
 * MongoDB ma'lumotlar bazasiga ulanish
 */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // Muvaffaqiyatli ulanish xabari
    console.log("MongoDB muvaffaqiyatli ulandi");
  })
  .catch((err) => {
    // Ulanishda xato bo'lsa konsolga chiqarish
    console.log("MongoDB ulanishida xatolik:", err);
  });

/**
 * API Yo'nalishlarini (Routes) ulash
 */
app.use("/api/projects", projectRoutes); // Loyihalar uchun API manzillari
app.use("/api/posts", postRoutes); // Maqolalar uchun API manzillari
app.use("/api/auth", authRoutes); // Login/Logout uchun API manzillari

/**
 * Asosiy test yo'nalishi
 */
app.get("/", (req, res) => {
    res.send("Blog API ishlamoqda...");
});

// Portni sozlash (port .env dan yoki standart 5000)
const PORT = process.env.PORT || 5000;

/**
 * Serverni ishga tushirish
 */
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
});