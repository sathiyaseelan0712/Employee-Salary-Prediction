import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate(); // Initialize navigate for client-side routing

  return (
    <div
      className={`fixed top-0 left-0 bg-gray-900 text-white h-screen p-4 transition-all duration-300 
        ${isCollapsed ? 'w-16' : 'w-64'} lg:w-64 xl:w-64 sm:w-48`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center justify-between mb-6">
      </div>
      <div>
        <h2 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Employee Salary Prediction Apps</h2>
      </div>
      <ul className={`mt-4 ${isCollapsed ? 'hidden' : 'block'}`}>
        <li className="mb-4">
          <button onClick={() => navigate("/")} className="w-full text-left">Home</button>
        </li>
        <li className="mb-4">
          <button onClick={() => navigate("/correlations")} className="w-full text-left">Relations & Correlations</button>
        </li>
        <li className="mb-4">
          <button onClick={() => navigate("/prediction")} className="w-full text-left">Prediction</button>
        </li>
      </ul>
    </div>
  );
};
