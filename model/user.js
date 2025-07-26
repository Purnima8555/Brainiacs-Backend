import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const avatarOptions = [
  "RocketRam",
  "BrainyBelle",
  "TwinTales",
  "RoaryRoy",
  "HarmonyHope",
  "ClimberCody",
];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    enum: avatarOptions,
    required: true,
  },
  secretCode: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});

// Hash secretCode before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('secretCode')) return next();
  const salt = await bcrypt.genSalt(10);
  this.secretCode = await bcrypt.hash(this.secretCode, salt);
  next();
});

// Method to compare secret code
userSchema.methods.matchSecretCode = async function (enteredCode) {
  return await bcrypt.compare(enteredCode, this.secretCode);
};

const User = mongoose.model('User', userSchema);

export default User;
