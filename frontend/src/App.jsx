import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import DataOverview from './Components/DataOverview';
import SalaryPrediction from './Components/SalaryPrediction';
import Correlations from './Components/Correlations';

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
          } lg:ml-64 xl:ml-64 sm:ml-48`}
        >
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DataOverview />} />
              <Route path="/prediction" element={<SalaryPrediction />} />
              <Route path="/correlations" element={<Correlations />} />
              <Route path="*" element={<h2 className="text-2xl font-bold">Page Not Found</h2>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
