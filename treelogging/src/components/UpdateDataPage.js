import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UpdateDataPage = ({ dataPoints, setDataPoints }) => {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [numTrees, setNumTrees] = useState("");
  const [locationData, setLocationData] = useState({ longitude: "", latitude: "" });
  const [growthStage, setGrowthStage] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({
    numTrees: null,
    longitude: null,
    latitude: null,
    growthStage: null,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const validateField = (field, value) => {
    if (value === "") return null; // No error if the field hasn't been interacted with
    switch (field) {
      case "numTrees":
        return value && !isNaN(value) && parseInt(value) > 0
          ? null
          : "Please enter a valid number greater than 0.";
      case "longitude":
        return value && !isNaN(value) && value >= -180 && value <= 180
          ? null
          : "Longitude must be between -180 and 180.";
      case "latitude":
        return value && !isNaN(value) && value >= -90 && value <= 90
          ? null
          : "Latitude must be between -90 and 90.";
      case "growthStage":
        return value ? null : "Please select a growth stage.";
      default:
        return null;
    }
  };


  const handleInputChange = (field, value) => {
    const errorMessage = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  
    if (field === "numTrees") {
      setNumTrees(value);
      setHasChanges(value !== String(selectedData.numTrees));
    }
    if (field === "longitude") {
      setLocationData((prev) => ({ ...prev, longitude: value }));
      setHasChanges(value !== String(selectedData.location.longitude));
    }
    if (field === "latitude") {
      setLocationData((prev) => ({ ...prev, latitude: value }));
      setHasChanges(value !== String(selectedData.location.latitude));
    }
    if (field === "growthStage") {
      setGrowthStage(value);
      setHasChanges(value !== selectedData.growthStage);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEntry = {
      id: selectedData.id,
      numTrees: parseInt(numTrees),
      location: { ...locationData },
      growthStage,
    };

    setDataPoints((prevData) =>
      prevData.map((item) => (item.id === selectedData.id ? updatedEntry : item))
    );

    setMessage({ type: "success", text: "Data updated successfully!" });

    setTimeout(() => {
      navigate("/"); // Redirect back to the main page
    }, 1000);
  };

  const handleSelectData = (data) => {
    setSelectedData(data);
    setNumTrees(data.numTrees);
    setLocationData(data.location);
    setGrowthStage(data.growthStage);
    setHasChanges(false); // Reset changes state when selecting a new data point
  };

  const isFormValid = Object.values(errors).every((error) => error === null);
  const isSubmitDisabled = !hasChanges || !isFormValid;
  

  useEffect(() => {
    if (selectedData) {
      setHasChanges(false);
      setErrors({
        numTrees: null,
        longitude: null,
        latitude: null,
        growthStage: null,
      });
    }
  }, [selectedData]);
  

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-start mb-6">
        <Link to="/">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded shadow">
            &larr; Back to Main Page
          </button>
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Update Tree Data</h2>

      {/* Success message after submission */}
      {message && (
        <div
          className={`mb-6 p-4 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Show message if no data points exist */}
      {dataPoints.length === 0 && (
        <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-lg text-center">
          <h3 className="text-lg font-medium">No Data Points Found</h3>
          <p className="text-sm">
            It seems there are no tree data logged yet. Please log data first before trying to update.
          </p>
        </div>
      )}

      {/* List of data points displayed as a table */}
      {!selectedData && dataPoints.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">Number of Trees</th>
                <th className="px-4 py-2 border-b text-center">Longitude</th>
                <th className="px-4 py-2 border-b text-center">Latitude</th>
                <th className="px-4 py-2 border-b text-center">Growth Stage</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataPoints.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-center">{data.numTrees}</td>
                  <td className="px-4 py-2 border-b text-center">{data.location.longitude}</td>
                  <td className="px-4 py-2 border-b text-center">{data.location.latitude}</td>
                  <td className="px-4 py-2 border-b text-center">{data.growthStage}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleSelectData(data)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form for updating the selected data point */}
      {selectedData && (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg"
        >
          <div className="mb-4">
            <label htmlFor="numTrees" className="block text-gray-700 font-medium mb-2">
              Number of Trees Planted
            </label>
            <input
              type="text"
              id="numTrees"
              value={numTrees}
              onChange={(e) => handleInputChange("numTrees", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.numTrees ? "border-red-500" : "border-green-500"
              }`}
              placeholder="Enter the number of trees planted"
            />
            {errors.numTrees && <p className="text-red-500 text-sm mt-1">{errors.numTrees}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-gray-700 font-medium mb-2">
              Longitude (-180 to 180)
            </label>
            <input
              type="text"
              id="longitude"
              value={locationData.longitude}
              onChange={(e) => handleInputChange("longitude", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.longitude ? "border-red-500" : "border-green-500"
              }`}
              placeholder="Enter longitude"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-gray-700 font-medium mb-2">
              Latitude (-90 to 90)
            </label>
            <input
              type="text"
              id="latitude"
              value={locationData.latitude}
              onChange={(e) => handleInputChange("latitude", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.latitude ? "border-red-500" : "border-green-500"
              }`}
              placeholder="Enter latitude"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="growthStage" className="block text-gray-700 font-medium mb-2">
              Growth Stage
            </label>
            <select
              id="growthStage"
              value={growthStage}
              onChange={(e) => handleInputChange("growthStage", e.target.value)}
              className={`w-full border rounded p-2 ${
                errors.growthStage ? "border-red-500" : "border-green-500"
              }`}
            >
              <option value="">Select a growth stage</option>
              <option value="seedling">Seedling</option>
              <option value="sapling">Sapling</option>
              <option value="mature">Mature</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            Update Data
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateDataPage;
