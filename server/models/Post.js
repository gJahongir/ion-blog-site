/**
 * Maqola (Post) ma'lumotlar modeli.
 * Blog postlarini bazada saqlash formatini belgilaydi.
 */

const mongoose = require('mongoose');

// Maqola sxemasini yaratish
const postSchema = new mongoose.Schema({
  // Maqola sarlavhasi (majburiy)
  title: { 
    type: String, 
    required: true 
  },
  // Maqola kategoriyasi (masalan: Design, Tech)
  category: { 
    type: String, 
    required: true 
  },
  // Maqola to'liq matni (majburiy)
  content: { 
    type: String, 
    required: true 
  },
  // Asosiy rasmga havola
  image: { 
    type: String 
  },
  // Ko'rilganlar soni (standart: 0)
  views: { 
    type: Number, 
    default: 0 
  },
  // Chop etilgan sana (standart: hozirgi vaqt)
  publishDate: { 
    type: Date, 
    default: Date.now 
  }
});

// Sxemani model sifatida eksport qilish
module.exports = mongoose.model('Post', postSchema);
