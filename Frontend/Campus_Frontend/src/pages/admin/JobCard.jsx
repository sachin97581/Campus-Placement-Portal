import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const skills = job?.eligibility?.requiredSkills || [];

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow hover:scale-105 transform"
      onClick={() => navigate(`/job/${job._id}`)}
    >
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">{job.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{job.jobType || 'Full Time'}</p>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-600 mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">No skills specified</span>
          )}
          {skills.length > 3 && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-xs font-semibold text-gray-600">{job.location || 'Location TBD'}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {job.status}
        </span>
      </div>
    </div>
  );
};

export default JobCard;