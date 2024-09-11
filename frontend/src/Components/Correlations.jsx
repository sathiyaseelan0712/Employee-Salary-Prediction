import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const RelationsAndCorrelations = () => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [scatterMatrixData, setScatterMatrixData] = useState(null);
  const [firstFeature, setFirstFeature] = useState('');
  const [secondFeature, setSecondFeature] = useState('');
  const [relationScatterData, setRelationScatterData] = useState(null);
  const [numericalColumns, setNumericalColumns] = useState([]);

  // Fetch Heatmap Data
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/heatmap').then(response => {
      setHeatmapData(response.data);
    });
  }, []);

  // Fetch Scatter Matrix Data
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/scatter-matrix').then(response => {
      setScatterMatrixData(response.data);
    });
  }, []);

  // Fetch Column Names
  useEffect(() => {
    const columns = ['Age', 'Years of Experience', "Education Level_Master's", 'Education Level_PhD', 'Gender_Male'];
    setNumericalColumns(columns);
    setFirstFeature(columns[0]);
    setSecondFeature(columns[1]);
  }, []);

  // Fetch Relation Scatter Data
  useEffect(() => {
    if (firstFeature && secondFeature) {
      axios.get(`http://127.0.0.1:5000/api/relation-scatter?x=${firstFeature}&y=${secondFeature}`).then(response => {
        setRelationScatterData(response.data);
      });
    }
  }, [firstFeature, secondFeature]);

  return (
    <div className="bg-gray-900 min-h-screen text-white rounded-lg font-mono flex flex-col items-center justify-center">
      <div className="container mx-auto py-8 items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-center font-mono">Correlations Between Data</h1>

        {/* Heatmap */}
        <div className="mb-8 w-full flex justify-center">
          {heatmapData && (
            <Plot
              data={heatmapData.data}
              layout={heatmapData.layout}
              config={{ responsive: true }}
              className="w-full md:w-2/3 xl:w-1/2"
            />
          )}
        </div>

        <div className="my-8 bg-white h-4"></div>

        {/* Scatter Matrix */}
        <div className="mb-8 w-full flex justify-center">
          {scatterMatrixData && (
            <Plot
              data={scatterMatrixData.data}
              layout={scatterMatrixData.layout}
              config={{ responsive: true }}
              className="w-full md:w-3/4 xl:w-2/3"
            />
          )}
        </div>

        <div className="my-8 bg-white h-4"></div>

        {/* Feature Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-feature" className="block text-md font-bold text-gray-400">First Feature</label>
            <select
              id="first-feature"
              className="mt-1 block w-full p-2 bg-gray-800 text-white rounded"
              value={firstFeature}
              onChange={(e) => setFirstFeature(e.target.value)}
            >
              {numericalColumns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="second-feature" className="block text-md font-bold text-gray-400">Second Feature</label>
            <select
              id="second-feature"
              className="mt-1 block w-full p-2 bg-gray-800 text-white rounded"
              value={secondFeature}
              onChange={(e) => setSecondFeature(e.target.value)}
            >
              {numericalColumns.filter(col => col !== firstFeature).map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Relation Scatter */}
        <div className="mt-8 w-full flex justify-center">
          {relationScatterData && (
            <Plot
              data={relationScatterData.data}
              layout={relationScatterData.layout}
              config={{ responsive: true }}
              className="w-full md:w-2/3 xl:w-1/2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RelationsAndCorrelations;
