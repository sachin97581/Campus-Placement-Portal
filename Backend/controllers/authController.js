// 


// this code for OTP system for login and signup
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
// const sendEmail = require("../utils/sendEmail");
const otpEmailTemplate = require("../utils/otpEmailTemplate");
// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOtp();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    otp,
    otpExpiry: Date.now() + 10 * 60 * 1000 // 10 minutes
  });

  // await sendEmail(
  //   email,
  //   "Verify your account",
  //   `<h3>Your OTP is: <b>${otp}</b></h3>`
  // );
  await sendEmail(
  user.email,
  "Verify your Campus Portal account",
  otpEmailTemplate(user.name, otp, "account verification")
);

  res.status(201).json({
    message: "OTP sent to email. Please verify."
  });
};

// VERIFY OTP API (Signup)
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({
    token: generateToken(user),
    message: "Account verified successfully"
  });
};

// LOGIN with OTP (Two-step)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ message: "Account not verified" });

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  // await sendEmail(
  //   email,
  //   "Login OTP",
  //   `<h3>Your login OTP is: <b>${otp}</b></h3>`
  // );
  await sendEmail(
  user.email,
  "Login OTP - Campus Portal",
  otpEmailTemplate(user.name, otp, "login")
);

  res.json({ message: "OTP sent to email" });
};

// Step 2: Verify Login OTP
exports.verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({
    token: generateToken(user),
    message: "Login successful"
  });
};
