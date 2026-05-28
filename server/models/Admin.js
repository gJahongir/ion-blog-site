const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: 'admin.joxa'
  },
  loginCode: {
    type: String,
    required: true,
    length: 6
  },
  activeSessions: {
    type: Number,
    default: 0
  },
  maxSessions: {
    type: Number,
    default: 3
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
