/**
 * Loyiha (Project) ma'lumotlar modeli.
 * MongoDB da loyihalarni qanday saqlanishini belgilaydi.
 */

const mongoose = require('mongoose');

// Loyiha sxemasini yaratish
const projectSchema = new mongoose.Schema({
  // Loyiha nomi (majburiy)
  name: { 
    type: String, 
    required: true 
  },
  // Kategoriya (majburiy, masalan: Interyer, Exteryer)
  category: { 
    type: String, 
    required: true 
  },
  // Loyiha haqida qisqacha ma'lumot
  description: { 
    type: String 
  },
  // Loyiha rasmiga havola (URL)
  image: { 
    type: String 
  },
  // Loyiha holati (Enum: faqat belgilangan qiymatlardan biri bo'lishi kerak)
  status: { 
    type: String, 
    enum: ['Published', 'Draft'], 
    default: 'Published' 
  },
  // Yaratilgan sana (standart: hozirgi vaqt)
  dateCreated: { 
    type: Date, 
    default: Date.now 
  }
});

// Sxemani model sifatida eksport qilish
module.exports = mongoose.model('Project', projectSchema);
