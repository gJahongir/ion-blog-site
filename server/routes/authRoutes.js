const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

/**
 * @route   POST /api/auth/login
 * @desc    Admin username va kodini tekshirish
 */
router.post('/login', async (req, res) => {
  const { username, code } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ message: 'Noto\'g\'ri login kiritildi' });
    }

    if (admin.loginCode !== code) {
      return res.status(401).json({ message: 'Noto\'g\'ri kod kiritildi' });
    }

    if (admin.activeSessions >= admin.maxSessions) {
      return res.status(403).json({ message: 'Kirish cheklangan: Maksimal 3 ta foydalanuvchi tizimda' });
    }

    // Sessiyani oshirish
    admin.activeSessions += 1;
    await admin.save();

    res.json({ 
      success: true, 
      token: 'fake-jwt-token-' + Date.now(), 
      message: 'Muvaffaqiyatli kirdingiz' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Sessiyani yakunlash
 */
router.post('/logout', async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (admin && admin.activeSessions > 0) {
      admin.activeSessions -= 1;
      await admin.save();
    }
    res.json({ message: 'Tizimdan chiqildi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
