import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ({ dataPoints }) => {
  const navigate = useNavigate();

  const noData = dataPoints === undefined || dataPoints.length === 0;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Tree Data Management</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`py-3 px-6 font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 ${
            noData ? "animate-glow border-4 border-blue-400" : ""
          }`}
          onClick={() => navigate("/log-data")}
        >
          Log New Data
        </button>
        <button
          className="py-3 px-6 font-bold rounded-lg bg-green-600 text-white hover:bg-gray-600"
          onClick={() => navigate("/update-data")}
        >
          Update Existing Data
        </button>
        <button
          className="py-3 px-6 font-bold rounded-lg bg-teal-500 text-white hover:bg-gray-600"
          onClick={() => navigate("/generate-report")}
        >
          Generate Report
        </button>
      </div>

      {/* Informative Content Section */}
      <div className="mt-8">
        {dataPoints === undefined || dataPoints.length === 0 ? (
          <div className="text-center p-8 bg-blue-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-blue-800">No Data Found</h2>
            <p className="text-xl text-blue-700 mt-4">
              You haven't added any data yet. To get started, click on the <strong>Log New Data</strong> button above.
            </p>
          </div>
        ) : (
          <div className="text-center p-8 bg-green-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-green-800">Data Overview</h2>
            <p className="text-xl text-green-700 mt-4">
              You have <strong>{dataPoints.length}</strong> data point{dataPoints.length > 1 ? "s" : ""} logged.
            </p>
            <p className="text-xl text-green-700 mt-4">
              You can now keep <strong>Logging New Data</strong>, <strong>Update The Existing Data</strong>, or <strong>Generate a Report</strong> using the buttons above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
