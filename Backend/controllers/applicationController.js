const Application = require("../models/Application.js");

exports.applyJob = async (req, res) => {
  const { jobId } = req.params;

  const alreadyApplied = await Application.findOne({
    jobId,
    studentId: req.user.id
  });

  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied" });
  }

  const application = await Application.create({
    jobId,
    studentId: req.user.id,
    answers: req.body.answers
  });

  res.status(201).json(application);
};
