const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const roleCheck = require("../middleware/roleCheck.js");
const applicationController = require("../controllers/applicationController.js");
const jobController = require("../controllers/jobController.js");

router.get("/jobs", auth, roleCheck("STUDENT"), jobController.getAllJobs);
router.post(
  "/apply/:jobId",
  auth,
  roleCheck("STUDENT"),
  applicationController.applyJob
);

module.exports = router;
