const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const applicationController = require("../controllers/applicationController");
const jobController = require("../controllers/jobController");

router.get("/jobs", auth, roleCheck("STUDENT"), jobController.getAllJobs);
router.post(
  "/apply/:jobId",
  auth,
  roleCheck("STUDENT"),
  applicationController.applyJob
);

module.exports = router;
