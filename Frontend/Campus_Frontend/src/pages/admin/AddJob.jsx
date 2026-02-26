import React, { useState } from "react";
import axios from "axios";

const AddJob = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    jobType: "FULL_TIME",
    workMode: "ONSITE",
    location: "",
    salary: { min: "", max: "", currency: "INR" },
    applicationType: "INTERNAL",
    deadline: "",
    jobDetails: {
      aboutCompany: "",
      roleOverview: "",
      responsibilities: "",
      requirements: "",
      preferredSkills: "",
      perksAndBenefits: "",
      selectionProcess: "",
      documentsRequired: "",
      numberOfOpenings: "",
      internshipDuration: "",
      workTimings: "",
      reportingTo: "",
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("salary")) {
      const key = name.split(".")[1];
      setJob({ ...job, salary: { ...job.salary, [key]: value } });
    } 
    else if (name.includes("jobDetails")) {
      const key = name.split(".")[1];
      setJob({
        ...job,
        jobDetails: { ...job.jobDetails, [key]: value }
      });
    } 
    else {
      setJob({ ...job, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedJob = {
        ...job,
        jobDetails: {
          ...job.jobDetails,
          responsibilities: job.jobDetails.responsibilities.split(","),
          requirements: job.jobDetails.requirements.split(","),
          preferredSkills: job.jobDetails.preferredSkills.split(","),
          perksAndBenefits: job.jobDetails.perksAndBenefits.split(","),
          selectionProcess: job.jobDetails.selectionProcess.split(","),
          documentsRequired: job.jobDetails.documentsRequired.split(",")
        }
      };

      await axios.post("/api/admin/job", formattedJob, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Job Created Successfully 🚀");
    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Job</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input name="title" placeholder="Job Title"
          value={job.title} onChange={handleChange} required />

        <textarea name="description" placeholder="Job Description"
          value={job.description} onChange={handleChange} required />

        <select name="jobType" value={job.jobType} onChange={handleChange}>
          <option value="FULL_TIME">Full Time</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
        </select>

        <select name="workMode" value={job.workMode} onChange={handleChange}>
          <option value="ONSITE">Onsite</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
        </select>

        <input name="location" placeholder="Location"
          value={job.location} onChange={handleChange} />

        <div style={styles.row}>
          <input name="salary.min" placeholder="Min Salary"
            value={job.salary.min} onChange={handleChange} />
          <input name="salary.max" placeholder="Max Salary"
            value={job.salary.max} onChange={handleChange} />
        </div>

        <textarea name="jobDetails.aboutCompany"
          placeholder="About Company"
          value={job.jobDetails.aboutCompany}
          onChange={handleChange} />

        <textarea name="jobDetails.roleOverview"
          placeholder="Role Overview"
          value={job.jobDetails.roleOverview}
          onChange={handleChange} />

        <textarea name="jobDetails.responsibilities"
          placeholder="Responsibilities (comma separated)"
          value={job.jobDetails.responsibilities}
          onChange={handleChange} />

        <textarea name="jobDetails.requirements"
          placeholder="Requirements (comma separated)"
          value={job.jobDetails.requirements}
          onChange={handleChange} />

        <textarea name="jobDetails.preferredSkills"
          placeholder="Preferred Skills (comma separated)"
          value={job.jobDetails.preferredSkills}
          onChange={handleChange} />

        <textarea name="jobDetails.selectionProcess"
          placeholder="Selection Process (comma separated)"
          value={job.jobDetails.selectionProcess}
          onChange={handleChange} />

        <input type="date" name="deadline"
          value={job.deadline} onChange={handleChange} />

        <button type="submit" style={styles.button}>
          Create Job
        </button>

      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    background: "#f8f9fa",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  row: {
    display: "flex",
    gap: "10px"
  },
  button: {
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default AddJob;