import { useState } from "react";

const SalaryPrediction = () => {
  const [age, setAge] = useState(24);
  const [experience, setExperience] = useState(2);
  const [education, setEducation] = useState("Bachelor's");
  const [gender, setGender] = useState("Female"); // Default gender value
  const [predictedSalary, setPredictedSalary] = useState(null);

  const handlePredict = async () => {
    const new_data = { age, experience, education, gender };
    const response = await fetch("https://employee-salary-prediction-2.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_data),
    });
    const data = await response.json();
    setPredictedSalary(data.predicted_salary);
  };

  const handleModelCheckup = () => {
    window.location.href = "https://salaryprediction-8awy.onrender.com/";
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg max-w-full mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-purple-600 text-center font-mono">
        Employee Salary Prediction 📈💰
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-mono font-extrabold">
            Age:
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-white font-mono font-extrabold">
            Experience:
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-white font-mono font-extrabold">
            Education:
          </label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="Bachelor's">Bachelor</option>
            <option value="Master's">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-white font-mono font-extrabold">
            Gender:
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </div>
      <button
        onClick={handlePredict}
        className="bg-purple-600 text-white mt-4 p-3 rounded"
      >
        Predict
      </button>

      {predictedSalary && (
        <div className="mt-4 ">
          <h3 className="text-2xl font-extrabold text-white font-mono">
            Predicted Salary: ₹{predictedSalary}
          </h3>
        </div>
      )}

      {/* New Container for Advanced Model Checkup */}
      <div className="bg-gray-700 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-extrabold mb-4 text-purple-600 text-center font-mono">
          Advanced Model Checkup 🔍
        </h2>
        <p className="text-white mb-4 text-center">
          Our external site offers advanced features and a more comprehensive
          analysis of salary prediction models. Explore detailed insights and
          additional capabilities beyond our current model.
        </p>
        <button
          onClick={handleModelCheckup}
          className="bg-purple-600 text-white mt-4 p-3 rounded w-full"
        >
          Explore Advanced Features
        </button>
      </div>
    </div>
  );
};

export default SalaryPrediction;
