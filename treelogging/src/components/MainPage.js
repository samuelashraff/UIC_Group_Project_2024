import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {

  return (
    <div className="container mx-auto flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Tree Logging App
      </h1>
      <p className="text-lg mb-8 text-gray-600 text-center">
        Manage your tree data efficiently using this application.
      </p>
      <div className="flex space-x-6">
        <Link to="/log-data">
          <button className="btn btn-primary px-6 py-3 text-white rounded-lg bg-blue-500 hover:bg-blue-600 shadow">
            Log New Data
          </button>
        </Link>
        <Link to="/update-data">
          <button className="btn btn-success px-6 py-3 text-white rounded-lg bg-green-500 hover:bg-green-600 shadow">
            Update Existing Data
          </button>
        </Link>
        <Link to="/generate-report">
          <button className="btn btn-info px-6 py-3 text-white rounded-lg bg-teal-500 hover:bg-teal-600 shadow">
            Generate Report
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
