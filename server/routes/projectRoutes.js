/**
 * Loyihalar bilan ishlovchi API yo'nalishlari (Routes).
 */

const express = require('express');
const router = express.Router(); // Router obyektini yaratish
const Project = require('../models/Project'); // Project modelini yuklash

/**
 * @route   GET /api/projects
 * @desc    Barcha loyihalarni bazadan olish
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Bazadan hamma loyihalarni sana bo'yicha kamayish tartibida olish
    const projects = await Project.find().sort({ dateCreated: -1 });
    res.json(projects); // Topilgan loyihalarni JSON formatda qaytarish
  } catch (err) {
    // Xatolik bo'lsa 500 status kodi bilan qaytarish
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Bitta loyihani ID si bo'yicha olish
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Loyiha topilmadi' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/projects
 * @desc    Yangi loyiha yaratish
 * @access  Private (Dashboard uchun)
 */
router.post('/', async (req, res) => {
  // So'rov tanasidan kelgan ma'lumotlar asosida yangi loyiha obyekti
  const project = new Project({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    status: req.body.status
  });

  try {
    // Loyihani bazaga saqlash
    const newProject = await project.save();
    res.status(201).json(newProject); // Yangi loyihani 201 (Created) kodi bilan qaytarish
  } catch (err) {
    // Ma'lumot noto'g'ri bo'lsa 400 (Bad Request) kodi bilan qaytarish
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Loyihani ID si bo'yicha o'chirish
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    // ID bo'yicha loyihani qidirish
    const project = await Project.findById(req.params.id);
    
    // Agar loyiha topilmasa 404 xabarini qaytarish
    if (!project) {
      return res.status(404).json({ message: 'Loyiha topilmadi' });
    }

    // Loyihani o'chirish
    await project.deleteOne();
    res.json({ message: 'Loyiha o\'chirildi' });
  } catch (err) {
    // Xatolik yuz bersa xabarni qaytarish
    res.status(500).json({ message: err.message });
  }
});

// Routerni eksport qilish
module.exports = router;
