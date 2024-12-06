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
    numTrees: true,
    longitude: true,
    latitude: true,
    growthStage: true,
  });
  const [hasChanges, setHasChanges] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case "numTrees":
        return value && !isNaN(value) && parseInt(value) > 0;
      case "longitude":
        return value && !isNaN(value) && value >= -180 && value <= 180;
      case "latitude":
        return value && !isNaN(value) && value >= -90 && value <= 90;
      case "growthStage":
        return !!value;
      default:
        return true;
    }
  };

  const handleInputChange = (field, value) => {
    let isValid = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: !isValid }));

    // Handle changes in fields
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

  const isFormValid = Object.values(errors).every((error) => !error);
  const isSubmitDisabled = !hasChanges || !isFormValid;

  useEffect(() => {
    if (selectedData) {
      // Reset validation and changes status when a new data point is selected
      setHasChanges(false);
      setErrors({
        numTrees: false,
        longitude: false,
        latitude: false,
        growthStage: false,
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

      {/* List of data points displayed as cards */}
      {!selectedData && dataPoints.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataPoints.map((data) => (
            <div
              key={data.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300 mb-4"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">{`Trees: ${data.numTrees}`}</h3>
                <p className="text-gray-600">{`Location: ${data.location.longitude}, ${data.location.latitude}`}</p>
                <p className="text-gray-600">{`Growth Stage: ${data.growthStage}`}</p>
              </div>
              <button
                onClick={() => handleSelectData(data)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Edit
              </button>
            </div>
          ))}
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
