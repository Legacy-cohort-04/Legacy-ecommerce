const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { 
    type: String, 
    default: "https://res.cloudinary.com/dvkab0k8v/image/upload/v1708850888/default_avatar_ocdlay.jpg"
  },
  // ... autres champs
});

module.exports = mongoose.model('User', userSchema); 