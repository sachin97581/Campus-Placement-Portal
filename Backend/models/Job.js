// This covers almost every job option colleges need.
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    jobType: {
      type: String,
      enum: ["FULL_TIME", "INTERNSHIP", "PART_TIME", "CONTRACT"],
      default: "FULL_TIME"
    },

    workMode: {
      type: String,
      enum: ["ONSITE", "REMOTE", "HYBRID"],
      default: "ONSITE"
    },

    location: String,

    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR"
      }
    },

    eligibility: {
      branches: [String],
      minCGPA: Number,
      graduationYears: [Number],
      requiredSkills: [String]
    },

    applicationType: {
      type: String,
      enum: ["INTERNAL", "GOOGLE_FORM"],
      default: "INTERNAL"
    },

    googleFormLink: String,

    formFields: [
      {
        label: String,
        type: {
          type: String,
          enum: ["text", "email", "number", "textarea", "select", "checkbox", "file"]
        },
        required: Boolean,
        options: [String]
      }
    ],

    status: {
      type: String,
      enum: ["DRAFT", "OPEN", "CLOSED"],
      default: "OPEN"
    },

    deadline: {
      type: Date,
      required: true
    },

    createdByAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
