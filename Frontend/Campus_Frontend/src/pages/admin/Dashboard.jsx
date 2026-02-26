import React from 'react'
import AdminNavbar from "../../components/AdminNavbar";
import LiveJob from "./LiveJob";
import CompleteJob from "./CompleteJob";

const Dashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Job Management Dashboard</h1>
            <p className="text-gray-600">Manage and monitor all job postings</p>
          </div>
          
          <LiveJob />
          <CompleteJob />
        </div>
      </div>
    </>
  );
};

export default Dashboard