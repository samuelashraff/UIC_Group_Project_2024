import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogDataPage = ({ dataPoints, setDataPoints }) => {
  const [numTrees, setNumTrees] = useState("");
  const [location, setLocation] = useState({ longitude: "", latitude: "" });
  const [growthStage, setGrowthStage] = useState("");
  const [message, setMessage] = useState(null);

  // Real-time validation states
  const [errors, setErrors] = useState({
    numTrees: true,
    longitude: true,
    latitude: true,
    growthStage: true,
  });

  const navigate = useNavigate();

  // Update validation for each field
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

  // Unified input change handler with validation
  const handleInputChange = (field, value) => {
    let isValid = validateField(field, value);

    setErrors((prevErrors) => ({ ...prevErrors, [field]: !isValid }));

    if (field === "numTrees") setNumTrees(value);
    if (field === "longitude") setLocation((prev) => ({ ...prev, longitude: value }));
    if (field === "latitude") setLocation((prev) => ({ ...prev, latitude: value }));
    if (field === "growthStage") setGrowthStage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      numTrees: parseInt(numTrees),
      location: { ...location },
      growthStage,
    };

    setDataPoints((prevData) => [...prevData, newEntry]);
    setMessage({ type: "success", text: "Data logged successfully!" });

    setNumTrees("");
    setLocation({ longitude: "", latitude: "" });
    setGrowthStage("");
    setErrors({ numTrees: true, longitude: true, latitude: true, growthStage: true });

    setTimeout(() => {
      navigate("/"); // Navigate back to the main page
    }, 1000);
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-start mb-6">
        <Link to="/">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded shadow">
            &larr; Back to Main Page
          </button>
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Log New Tree Data</h2>
      {message && (
        <div
          className={`mb-6 p-4 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
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
            value={location.longitude}
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
            value={location.latitude}
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
          disabled={!isFormValid}
          className={`w-full py-3 px-4 font-bold rounded ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Log Data
        </button>
      </form>
    </div>
  );
};

export default LogDataPage;
