const Job = require("../models/Job.js");

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    recruiterId: req.user.id
  });
  res.status(201).json(job);
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ status: "OPEN" });
  res.json(jobs);
};
