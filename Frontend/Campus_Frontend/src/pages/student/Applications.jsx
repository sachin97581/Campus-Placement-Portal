import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StudentNavbar from "../../components/StudentNavbar";
import { MapPin, Briefcase, Calendar, ExternalLink } from 'lucide-react';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        // Try to fetch student applications
        const res = await axios.get(
          "http://localhost:5000/api/student/applications",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setApplications(res.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.response?.data?.message || "Failed to fetch applications");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <StudentNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Applications</h1>
            <p className="text-gray-600">Track your job applications and their status</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading applications...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {!loading && !error && applications.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-4">You haven't applied to any jobs yet.</p>
              <a
                href="/student/dashboard"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Browse Available Jobs
              </a>
            </div>
          )}

          {!loading && !error && applications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Applied Jobs ({applications.length})
              </h2>
              {applications.map(app => (
                <div
                  key={app._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800">{app.jobId?.title || 'Job Title'}</h3>
                      <p className="text-gray-600 mt-1">{app.jobId?.description?.substring(0, 100) || 'No description'}...</p>
                    </div>
                    <a
                      href={`/job/${app.jobId?._id}`}
                      className="flex items-center text-blue-500 hover:text-blue-700 ml-4"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b">
                    {app.jobId?.location && (
                      <div className="flex items-center text-gray-700">
                        <MapPin size={18} className="mr-2 text-blue-500" />
                        <span>{app.jobId.location}</span>
                      </div>
                    )}
                    {app.jobId?.jobType && (
                      <div className="flex items-center text-gray-700">
                        <Briefcase size={18} className="mr-2 text-blue-500" />
                        <span>{app.jobId.jobType}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-700">
                      <Calendar size={18} className="mr-2 text-blue-500" />
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        app.status === 'ACCEPTED'
                          ? 'bg-green-100 text-green-700'
                          : app.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status || 'PENDING'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Applications