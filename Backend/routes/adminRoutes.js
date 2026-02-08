const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const jobController = require("../controllers/jobController");

router.post(
  "/job",
  auth,
  roleCheck("ADMIN"),
  jobController.createJob
);

module.exports = router;
