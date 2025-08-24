import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.Model.js";
import transporter from "../config/nodemailer.js";

// login register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing detail" });
  }

  try {
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.json({
        success: false,
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //email functuinality
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Welcome to auth_web`,
      text: `Your account has been created successfully with email: ${email}`,
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// login fuction

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });

    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: "email and password are required",
    });
  }
};

// logout functionality

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    {
      return res.json({ success: true, message: "logged out" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//send verification otp to user by email


export const sendVerifyOtp = async (req,res) =>{
  try {
    const {userId} = req.body 
    const user = await userModel.findById(userId)
    
    if(user.isAccountVerified){
      return res.json({success:false , message: " Account Already Verified "})
    }

const Otp =   String(Math.floor(100000 + Math.random() *900000));

user.verifyOtp = Otp;
user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

await user.save();

//email functuinality
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Account Verification  Otp`,
      text: `Your OTP is ${Otp}. Verify your account using this Otp`,
    };

    await transporter.sendMail(mailOption);

res.json ({success:true , message:"Verification Otp sent on Email "})
     
  } catch (error) {
    res.json({success: false , message: error.message})
  }
}

export const verifyEmail = async(req,res)=>{
  const {userId , Otp } = req.body;

  if(!userId || !Otp){
    return res.json({success:false , message : "Missing Details"})
  }

  try {
    const user = await userModel.findById(userId);
    if(!user){
      return res.json({ success:false , message: 'user not found' })
    }

    if(user.verifyOtp === ''  || user.verifyOtp !== Otp ){
      return res.json({ success: false , message : 'invalid Otp'})
    }

    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success: false , message: 'Otp Expired'})
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0
     
    await user.save()

    return res.json({success: true , message: 'Email Verifed Succcessfully'})
  } catch (error) {
    return res.json({ success: false, message: error.message });

  }
}