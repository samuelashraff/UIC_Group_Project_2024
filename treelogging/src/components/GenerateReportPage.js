import React, { useState } from 'react';

const GenerateReportPage = ({ dataPoints }) => {
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(dataPoints);

  const handleFilter = () => {
    if (!filterType || !filterValue) return;

    const filtered = dataPoints.filter((point) =>
      filterType === 'location'
        ? point.location === filterValue
        : point.growthStage === filterValue
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Generate Report</h2>
      <div>
        <button onClick={() => setFilterType('location')}>Filter by Location</button>
        <button onClick={() => setFilterType('growthStage')}>Filter by Growth Stage</button>
      </div>
      {filterType === 'location' && (
        <div>
          <input
            type="text"
            placeholder="Enter location (longitude, latitude)"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button onClick={handleFilter}>Apply Filter</button>
        </div>
      )}
      {filterType === 'growthStage' && (
        <div>
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">Select growth stage</option>
            <option value="seedling">Seedling</option>
            <option value="sapling">Sapling</option>
            <option value="mature">Mature</option>
          </select>
          <button onClick={handleFilter}>Apply Filter</button>
        </div>
      )}
      <h3>Report</h3>
      <ul>
        {filteredData.map((point, index) => (
          <li key={index}>
            {`Trees: ${point.numTrees}, Location: ${point.location}, Growth: ${point.growthStage}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateReportPage;
