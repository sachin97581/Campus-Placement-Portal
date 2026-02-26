import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Try different endpoints to fetch the job
        let res;
        try {
          res = await axios.get(
            `http://localhost:5000/api/student/jobs`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          // Find the job with matching ID
          const jobData = res.data.find(j => j._id === id);
          if (jobData) {
            setJob(jobData);
          } else {
            setError("Job not found");
          }
        } catch (err) {
          console.error("Error fetching job:", err);
          setError("Failed to load job details");
        }
        setLoading(false);
      } catch (err) {
        setError("An error occurred");
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/student/apply/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setHasApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to apply for this job";
      alert(message);
    } finally {
      setApplying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/job/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Job deleted successfully");
      navigate(-1);
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const handleUpdate = () => {
    navigate(`/edit-job/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Job not found</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const skills = job.eligibility?.requiredSkills || [];
  const salary = job.salary || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          {/* Job Title and Meta Info */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
            {job.location && (
              <div className="flex items-center">
                <MapPin size={20} className="text-blue-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold">{job.location}</p>
                </div>
              </div>
            )}
            {job.jobType && (
              <div className="flex items-center">
                <Briefcase size={20} className="text-blue-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Job Type</p>
                  <p className="font-semibold">{job.jobType}</p>
                </div>
              </div>
            )}
            {salary.min && salary.max && (
              <div className="flex items-center">
                <DollarSign size={20} className="text-blue-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="font-semibold">₹{salary.min}K - ₹{salary.max}K</p>
                </div>
              </div>
            )}
            {job.deadline && (
              <div className="flex items-center">
                <Calendar size={20} className="text-blue-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="font-semibold">{new Date(job.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Role</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Required Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility */}
          {job.eligibility && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                {job.eligibility.branches && job.eligibility.branches.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700">Branches:</p>
                    <p className="text-gray-600">{job.eligibility.branches.join(", ")}</p>
                  </div>
                )}
                {job.eligibility.minCGPA && (
                  <div>
                    <p className="font-semibold text-gray-700">Minimum CGPA:</p>
                    <p className="text-gray-600">{job.eligibility.minCGPA}</p>
                  </div>
                )}
                {job.eligibility.graduationYears && job.eligibility.graduationYears.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700">Graduation Years:</p>
                    <p className="text-gray-600">{job.eligibility.graduationYears.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Details */}
          {job.jobDetails && (
            <div className="mb-8">
              {job.jobDetails.aboutCompany && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Company</h2>
                  <p className="text-gray-700">{job.jobDetails.aboutCompany}</p>
                </div>
              )}

              {job.jobDetails.responsibilities && job.jobDetails.responsibilities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Responsibilities</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {job.jobDetails.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-gray-700">{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.jobDetails.requirements && job.jobDetails.requirements.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {job.jobDetails.requirements.map((req, idx) => (
                      <li key={idx} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.jobDetails.perksAndBenefits && job.jobDetails.perksAndBenefits.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Perks & Benefits</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {job.jobDetails.perksAndBenefits.map((perk, idx) => (
                      <li key={idx} className="text-gray-700">{perk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          {user?.role === "student" && (
            <button
              onClick={handleApply}
              disabled={hasApplied || applying}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition ${
                hasApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {hasApplied ? "Already Applied" : applying ? "Applying..." : "Apply Now"}
            </button>
          )}

          {user?.role === "admin" && (
            <>
              <button
                onClick={handleUpdate}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
              >
                Update Job
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
              >
                Delete Job
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;