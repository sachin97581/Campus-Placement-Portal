const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rollNumber: String,

    branch: {
      type: String,
      required: true
    },

    cgpa: {
      type: Number,
      min: 0,
      max: 10
    },

    graduationYear: Number,

    skills: [String],

    resumeUrl: String,

    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
