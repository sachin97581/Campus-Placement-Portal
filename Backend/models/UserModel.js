// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["ADMIN", "STUDENT", "RECRUITER"],
//       required: true
//     },
//     isActive: { type: Boolean, default: true }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


//  this code whene i want to login and signup via user OTP system
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      // enum: ["ADMIN", "STUDENT", "RECRUITER"],
      enum: ["admin", "recruiter", "student"],
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    otp: String,
    otpExpiry: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
