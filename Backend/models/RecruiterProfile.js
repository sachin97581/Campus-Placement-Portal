const mongoose = require("mongoose");

const recruiterProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    companyName: {
      type: String,
      required: true
    },

    companyWebsite: String,

    companyLogo: String,

    contactPerson: String,

    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecruiterProfile", recruiterProfileSchema);
