import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RecruiterNavbar from "../../components/RecruiterNavbar";
import JobCard from "../admin/JobCard";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        // Fetch all jobs and filter by recruiter ID
        const res = await axios.get(
          "http://localhost:5000/api/student/jobs",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Filter jobs by recruiter ID
        const recruiterJobs = res.data.filter(j => j.recruiterId === user?._id);
        setJobs(recruiterJobs);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <RecruiterNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Job Postings</h1>
            <p className="text-gray-600">Manage and monitor your posted jobs</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-4">You haven't posted any jobs yet.</p>
              <a
                href="/recruiter/post-job"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Post a New Job
              </a>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Posted Jobs ({jobs.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard