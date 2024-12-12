import React, { useState } from "react";
import { Link } from "react-router-dom";

const GenerateReport = ({ dataPoints }) => {
  const [filters, setFilters] = useState({
    minTrees: "",
    maxTrees: "",
    growthStage: "",
    minLongitude: "",
    maxLongitude: "",
    minLatitude: "",
    maxLatitude: "",
  });
  const [filteredData, setFilteredData] = useState(dataPoints);

  const [errors, setErrors] = useState({
    minTrees: "",
    maxTrees: "",
    minLongitude: "",
    maxLongitude: "",
    minLatitude: "",
    maxLatitude: "",
  });
  

  const applyFilters = () => {
    const {
      minTrees,
      maxTrees,
      growthStage,
      minLongitude,
      maxLongitude,
      minLatitude,
      maxLatitude,
    } = filters;

    const filtered = dataPoints.filter((data) => {
      const numTreesValid =
        (!minTrees || data.numTrees >= parseInt(minTrees)) &&
        (!maxTrees || data.numTrees <= parseInt(maxTrees));
      const growthStageValid =
        !growthStage || data.growthStage === growthStage;
      const longitudeValid =
        (!minLongitude || data.location.longitude >= parseFloat(minLongitude)) &&
        (!maxLongitude || data.location.longitude <= parseFloat(maxLongitude));
      const latitudeValid =
        (!minLatitude || data.location.latitude >= parseFloat(minLatitude)) &&
        (!maxLatitude || data.location.latitude <= parseFloat(maxLatitude));

      return numTreesValid && growthStageValid && longitudeValid && latitudeValid;
    });

    setFilteredData(filtered);
  };

  const handleFilterChange = (field, value) => {
    let errorMessage = "";

    switch (field) {
      case "minTrees":
      case "maxTrees":
        if (value !== "" && (isNaN(value) || parseInt(value) < 0)) {
          errorMessage = "Value must be a non-negative integer.";
        } else if (field === "maxTrees" && filters.minTrees && parseInt(value) < parseInt(filters.minTrees)) {
          errorMessage = "Max Trees must be greater than or equal to Min Trees.";
        }
        break;

      case "minLongitude":
      case "maxLongitude":
        if (value !== "" && (isNaN(value) || value < -180 || value > 180)) {
          errorMessage = "Value must be between -180 and 180.";
        } else if (field === "maxLongitude" && filters.minLongitude && parseFloat(value) < parseFloat(filters.minLongitude)) {
          errorMessage = "Max Longitude must be greater than or equal to Min Longitude.";
        }
        break;

      case "minLatitude":
      case "maxLatitude":
        if (value !== "" && (isNaN(value) || value < -90 || value > 90)) {
          errorMessage = "Value must be between -90 and 90.";
        } else if (field === "maxLatitude" && filters.minLatitude && parseFloat(value) < parseFloat(filters.minLatitude)) {
          errorMessage = "Max Latitude must be greater than or equal to Min Latitude.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));

    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Back to Main Page Button */}
      <div className="flex items-center justify-start mb-6">
        <Link to="/">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded shadow">
            &larr; Back to Main Page
          </button>
        </Link>
      </div>

      {/* Page Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Generate Tree Report</h2>

      {/* Filters Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-300">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Number of Trees Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Min Trees</label>
            <input
              type="number"
              min="0"
              value={filters.minTrees}
              onChange={(e) => handleFilterChange("minTrees", e.target.value)}
              className={`w-full border rounded p-2 ${errors.minTrees ? "border-red-500" : ""}`}
              placeholder="Minimum number of trees"
            />
            {errors.minTrees && <p className="text-red-500 text-sm mt-1">{errors.minTrees}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Trees</label>
            <input
              type="number"
              min="1"
              value={filters.maxTrees}
              onChange={(e) => handleFilterChange("maxTrees", e.target.value)}
              className={`w-full border rounded p-2 ${errors.maxTrees ? "border-red-500" : ""}`}
              placeholder="Maximum number of trees"
            />
            {errors.maxTrees && <p className="text-red-500 text-sm mt-1">{errors.maxTrees}</p>}
          </div>

          {/* Growth Stage Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Growth Stage</label>
            <select
              value={filters.growthStage}
              onChange={(e) => handleFilterChange("growthStage", e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Any</option>
              <option value="seedling">Seedling</option>
              <option value="sapling">Sapling</option>
              <option value="mature">Mature</option>
            </select>
          </div>

          {/* Location Filters */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Min Longitude</label>
            <input
              type="number"
              min="-180"
              max="180"
              value={filters.minLongitude}
              onChange={(e) => handleFilterChange("minLongitude", e.target.value)}
              className={`w-full border rounded p-2 ${errors.minLongitude ? "border-red-500" : ""}`}
              placeholder="-180 to 180"
            />
            {errors.minLongitude && <p className="text-red-500 text-sm mt-1">{errors.minLongitude}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Longitude</label>
            <input
              type="number"
              min="-180"
              max="180"
              value={filters.maxLongitude}
              onChange={(e) => handleFilterChange("maxLongitude", e.target.value)}
              className={`w-full border rounded p-2 ${errors.maxLongitude ? "border-red-500" : ""}`}
              placeholder="-180 to 180"
            />
            {errors.maxLongitude && <p className="text-red-500 text-sm mt-1">{errors.maxLongitude}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Min Latitude</label>
            <input
              type="number"
              min="-90"
              max="90"
              value={filters.minLatitude}
              onChange={(e) => handleFilterChange("minLatitude", e.target.value)}
              className={`w-full border rounded p-2 ${errors.minLatitude ? "border-red-500" : ""}`}
              placeholder="-90 to 90"
            />
            {errors.minLatitude && <p className="text-red-500 text-sm mt-1">{errors.minLatitude}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Latitude</label>
            <input
              type="number"
              min="-90"
              max="90"
              value={filters.maxLatitude}
              onChange={(e) => handleFilterChange("maxLatitude", e.target.value)}
              className={`w-full border rounded p-2 ${errors.maxLatitude ? "border-red-500" : ""}`}
              placeholder="-90 to 90"
            />
            {errors.maxLatitude && <p className="text-red-500 text-sm mt-1">{errors.maxLatitude}</p>}
          </div>
        </div>
        <button
          onClick={applyFilters}
          disabled={Object.values(errors).some((err) => err)}
          className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ${
            Object.values(errors).some((err) => err) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Apply Filters
        </button>
        <button
          onClick={() => setFilteredData(dataPoints)} // This will reset the filters and show all data
          className="mt-4 ml-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Show All Data
        </button>
      </div>

      {/* Filtered Results Section */}
      {filteredData.length === 0 ? (
        <div className="p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-lg text-center">
          <h3 className="text-lg font-medium">No Data Matches the Filters</h3>
          <p className="text-sm">Try adjusting the filters to see results.</p>
        </div>
      ) : (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">ID</th>
                <th className="px-4 py-2 border-b text-center">Number of Trees</th>
                <th className="px-4 py-2 border-b text-center">Location</th>
                <th className="px-4 py-2 border-b text-center">Growth Stage</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data) => (
                <tr key={data.id}>
                  <td className="px-4 py-2 border-b text-center">{data.id}</td>
                  <td className="px-4 py-2 border-b text-center">{data.numTrees}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {data.location.latitude}, {data.location.longitude}
                  </td>
                  <td className="px-4 py-2 border-b text-center">{data.growthStage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
