// 

//  this code for OPT system for login and signup
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);

router.post("/login", authController.login);
router.post("/verify-login-otp", authController.verifyLoginOtp);

module.exports = router;
