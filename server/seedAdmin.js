const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    let admin = await Admin.findOne();
    if (!admin) {
      await Admin.create({
        username: 'admin.joxa',
        loginCode: '123456',
        activeSessions: 0,
        maxSessions: 3
      });
      console.log('Admin yaratildi: admin.joxa / 123456');
    } else {
      // Mavjud adminni yangilash
      admin.username = 'admin.joxa';
      admin.loginCode = '123456';
      await admin.save();
      console.log('Admin ma\'lumotlari yangilandi: admin.joxa / 123456');
    }
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
