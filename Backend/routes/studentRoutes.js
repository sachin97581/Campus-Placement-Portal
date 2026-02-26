const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const roleCheck = require("../middleware/roleCheck.js");
const applicationController = require("../controllers/applicationController.js");
const jobController = require("../controllers/jobController.js");

// get all jobs for students whose status is OPEN
router.get("/jobs", auth, roleCheck("student"), jobController.getAllJobs);

//  Apply for a job
router.post("/apply/:jobId", auth, roleCheck("student"),
  applicationController.applyJob
);

module.exports = router;
