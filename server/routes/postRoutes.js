/**
 * Maqolalar (Posts) bilan ishlovchi API yo'nalishlari.
 */

const express = require('express');
const router = express.Router(); // Express routerni yuklash
const Post = require('../models/Post'); // Maqola modelini yuklash

/**
 * @route   GET /api/posts
 * @desc    Barcha maqolalarni chop etilgan sanasi bo'yicha olish
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Bazadan barcha maqolalarni eng yangisidan boshlab olish
    const posts = await Post.find().sort({ publishDate: -1 });
    res.json(posts); // Ma'lumotlarni qaytarish
  } catch (err) {
    // Tizimda xatolik bo'lsa
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/posts/:id
 * @desc    Bitta maqolani ID si bo'yicha olish
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Maqola topilmadi' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/posts
 * @desc    Yangi maqola yaratish
 * @access  Private
 */
router.post('/', async (req, res) => {
  // Yangi maqola obyekti (req.body orqali kelgan ma'lumotlar bilan)
  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    image: req.body.image
  });

  try {
    // Maqolani bazaga saqlashga urinish
    const newPost = await post.save();
    res.status(201).json(newPost); // Muvaffaqiyatli yaratilgan maqolani qaytarish
  } catch (err) {
    // Agar validatsiya yoki saqlashda xato bo'lsa
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Maqolani ID bo'yicha bazadan o'chirish
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    // Ko'rsatilgan ID bilan maqolani topish
    const post = await Post.findById(req.params.id);
    
    // Agar maqola topilmasa
    if (!post) {
      return res.status(404).json({ message: 'Maqola topilmadi' });
    }

    // Maqolani o'chirish buyrug'i
    await post.deleteOne();
    res.json({ message: 'Maqola muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    // O'chirishda xatolik yuz bersa
    res.status(500).json({ message: err.message });
  }
});

// Routerni eksport qilish
module.exports = router;
