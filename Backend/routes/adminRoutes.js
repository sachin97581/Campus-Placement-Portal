const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const jobController = require("../controllers/jobController");

// admin can create a job posting
router.post("/job", auth, roleCheck("admin"),
  jobController.createJob
);

// admin can update a job posting
router.put("/job/:id", auth, roleCheck("admin"),
  jobController.updateJob
);

// admin can delete a job posting
router.delete("/job/:id", auth, roleCheck("admin"),
  jobController.deleteJob
);

// admin can view all job applications
router.get("/applications", auth, roleCheck("admin"),
  jobController.viewApplications
);

module.exports = router;
