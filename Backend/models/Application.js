// Application.js (Dynamic Answers – Google Form Style)
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    answers: [
      {
        label: String,
        value: mongoose.Schema.Types.Mixed
      }
    ],

    status: {
      type: String,
      enum: ["APPLIED", "SHORTLISTED", "REJECTED", "SELECTED"],
      default: "APPLIED"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
