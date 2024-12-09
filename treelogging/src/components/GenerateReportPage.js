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

  const resetFilters = () => {
    setFilteredData(dataPoints); // Reset to show all data
    setFilters({
      minTrees: "",
      maxTrees: "",
      growthStage: "",
      minLongitude: "",
      maxLongitude: "",
      minLatitude: "",
      maxLatitude: "",
    });
  };

  const handleFilterChange = (field, value) => {
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
              className="w-full border rounded p-2"
              placeholder="Minimum number of trees"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Trees</label>
            <input
              type="number"
              min="1"
              value={filters.maxTrees}
              onChange={(e) => handleFilterChange("maxTrees", e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Maximum number of trees"
            />
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
              className="w-full border rounded p-2"
              placeholder="-180 to 180"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Longitude</label>
            <input
              type="number"
              min="-180"
              max="180"
              value={filters.maxLongitude}
              onChange={(e) => handleFilterChange("maxLongitude", e.target.value)}
              className="w-full border rounded p-2"
              placeholder="-180 to 180"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Min Latitude</label>
            <input
              type="number"
              min="-90"
              max="90"
              value={filters.minLatitude}
              onChange={(e) => handleFilterChange("minLatitude", e.target.value)}
              className="w-full border rounded p-2"
              placeholder="-90 to 90"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Latitude</label>
            <input
              type="number"
              min="-90"
              max="90"
              value={filters.maxLatitude}
              onChange={(e) => handleFilterChange("maxLatitude", e.target.value)}
              className="w-full border rounded p-2"
              placeholder="-90 to 90"
            />
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((data) => (
            <div
              key={data.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{`Tree Report for ID: ${data.id}`}</h3>
              <ul className="text-gray-600">
                <li>
                  <strong>Number of Trees:</strong> {data.numTrees}
                </li>
                <li>
                  <strong>Location:</strong> {`${data.location.longitude}, ${data.location.latitude}`}
                </li>
                <li>
                  <strong>Growth Stage:</strong> {data.growthStage}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
