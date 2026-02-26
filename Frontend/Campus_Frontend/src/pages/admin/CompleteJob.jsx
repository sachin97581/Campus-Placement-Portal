import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const CompleteJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch all jobs and filter by CLOSED status
        const res = await axios.get(
          "http://localhost:5000/api/student/jobs",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Filter for CLOSED/completed jobs
        const completeJobs = res.data.filter(j => j.status === "CLOSED");
        setJobs(completeJobs);
        setError(null);
      } catch (err) {
        console.error("Error fetching completed jobs:", err);
        setError(err.response?.data?.message || "Failed to fetch completed jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading completed jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No completed jobs to display.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Completed Jobs ({jobs.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default CompleteJob;