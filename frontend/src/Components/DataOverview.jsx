import { useEffect, useState } from 'react';

const DataOverview = () => {
  const [data, setData] = useState([]);
  const [numericalStats, setNumericalStats] = useState({});

  // Fetch Data from Backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/data')
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data);
        setData(parsedData);
      });

    fetch('http://127.0.0.1:5000/data_summary')
      .then(response => response.json())
      .then(summary => setNumericalStats(summary));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg max-w-full mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-red-500 font-mono">Employee Salary Prediction 📈💰</h1>
      </div>

      {/* Data Overview Table */}
      <div className="mb-6">
        <div className="overflow-y-auto" style={{ maxHeight: '408px' }}>
          <table className="min-w-full text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 font-extrabold text-xl font-mono text-white">Age</th>
                <th className="px-4 py-2 font-extrabold text-xl font-mono text-white">Experience</th>
                <th className="px-4 py-2 font-extrabold text-xl font-mono text-white">Education</th>
                <th className="px-4 py-2 font-extrabold text-xl font-mono text-white">Gender</th>
                <th className="px-4 py-2 font-extrabold text-xl font-mono text-white">Salary</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2 font-mono text-white">{row.Age}</td>
                  <td className="border px-4 py-2 font-mono text-white">{row['Years of Experience']}</td>
                  <td className="border px-4 py-2 font-mono text-white">{row['Education Level']}</td>
                  <td className="border px-4 py-2 font-mono text-white">{row['Gender']}</td>
                  <td className="border px-4 py-2 font-mono text-white">{row.Salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>   
      {/* Data Summary Overview */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-extrabold text-yellow-400 font-mono">Numerical Data Summary 🧐</h2>
      </div>
        
      <div className="mb-6">
        {/* Numerical Data Summary */}
        {Object.keys(numericalStats).length > 0 && (
          <div>
            <table className="min-w-full mt-4 text-center">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">Feature</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">Count</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">Mean</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">Std</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">Min</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">25%</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">50%</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">75%</th>
                  <th className="px-4 py-2 font-extrabold text-lg font-mono text-white">Max</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(numericalStats).map(([feature, stats]) => (
                  <tr key={feature}>
                    <td className="border px-4 py-2 font-mono text-white">{feature}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['count']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['mean']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['std']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['min']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['25%']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['50%']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['75%']}</td>
                    <td className="border px-4 py-2 font-mono text-white">{stats['max']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataOverview;
