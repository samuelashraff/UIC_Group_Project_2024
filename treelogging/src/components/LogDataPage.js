import React, { useState } from 'react';
import PopupMessage from './PopupMessage';

const LogDataPage = ({ dataPoints, setDataPoints }) => {
  const [formData, setFormData] = useState({ numTrees: '', location: '', growthStage: '' });
  const [popup, setPopup] = useState(null);

  const handleSubmit = () => {
    const { numTrees, location, growthStage } = formData;

    if (
      isNaN(parseInt(numTrees)) ||
      !/^\d+\.\d+,\s*\d+\.\d+$/.test(location) ||
      !['seedling', 'sapling', 'mature'].includes(growthStage)
    ) {
      setPopup({ success: false, message: 'Invalid data entered!' });
      return;
    }

    setDataPoints([...dataPoints, { numTrees: parseInt(numTrees), location, growthStage }]);
    setPopup({ success: true, message: 'Data logged successfully!' });
    setFormData({ numTrees: '', location: '', growthStage: '' });
  };

  return (
    <div>
      <h2>Log New Data</h2>
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
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {popup && <PopupMessage success={popup.success} message={popup.message} />}
    </div>
  );
};

export default LogDataPage;
