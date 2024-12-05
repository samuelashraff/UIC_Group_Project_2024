import React, { useState } from 'react';
import PopupMessage from './PopupMessage';

const UpdateDataPage = ({ dataPoints, setDataPoints }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({ numTrees: '', location: '', growthStage: '' });
  const [popup, setPopup] = useState(null);

  const handleUpdate = () => {
    if (
      selectedIndex === null ||
      isNaN(parseInt(formData.numTrees)) ||
      !/^\d+\.\d+,\s*\d+\.\d+$/.test(formData.location) ||
      !['seedling', 'sapling', 'mature'].includes(formData.growthStage)
    ) {
      setPopup({ success: false, message: 'Invalid data or no data selected!' });
      return;
    }

    const updatedDataPoints = [...dataPoints];
    updatedDataPoints[selectedIndex] = {
      numTrees: parseInt(formData.numTrees),
      location: formData.location,
      growthStage: formData.growthStage,
    };

    setDataPoints(updatedDataPoints);
    setPopup({ success: true, message: 'Data updated successfully!' });
    setFormData({ numTrees: '', location: '', growthStage: '' });
    setSelectedIndex(null);
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setFormData(dataPoints[index]);
  };

  return (
    <div>
      <h2>Update Existing Data</h2>
      <ul>
        {dataPoints.map((point, index) => (
          <li key={index}>
            <button onClick={() => handleSelect(index)}>
              {`Trees: ${point.numTrees}, Location: ${point.location}, Growth: ${point.growthStage}`}
            </button>
          </li>
        ))}
      </ul>
      {selectedIndex !== null && (
        <form>
          <input
            type="number"
            placeholder="Number of trees"
            value={formData.numTrees}
            onChange={(e) => setFormData({ ...formData, numTrees: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location (longitude, latitude)"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <select
            value={formData.growthStage}
            onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
          >
            <option value="">Select growth stage</option>
            <option value="seedling">Seedling</option>
            <option value="sapling">Sapling</option>
            <option value="mature">Mature</option>
          </select>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      )}
      {popup && <PopupMessage success={popup.success} message={popup.message} />}
    </div>
  );
};

export default UpdateDataPage;
