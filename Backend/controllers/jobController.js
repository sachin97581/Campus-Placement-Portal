const Job = require("../models/Job.js");

// to add new job in portal
exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    recruiterId: req.user.id
  });
  res.status(201).json(job);
};

// to delete the job from portal
exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  await job.remove();
  res.json({ message: "Job deleted successfully" });
}

// to update the job details
exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  Object.assign(job, req.body);
  await job.save();
  res.json(job);
};

exports.viewApplications = async (req, res) => {
  const job = await Job.findById(req.params.id).populate("applications");
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(job.applications);
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ status: "OPEN" });
  res.json(jobs);
};
