import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  verifyOtp: {
    type: String,
    default: '',
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  verifyOtp: {
    type: String,
    default: '',
  },
  resetOtp: {
    type: String,
    default: '',
  },
  resetOtpExpireAt: {
    type: String,
    default: 0,
  },
});

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel
