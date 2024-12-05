import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Tree Logger</h1>
    <div>
      <Link to="/log-data"><button>Log New Data</button></Link>
      <Link to="/update-data"><button>Update Existing Data</button></Link>
      <Link to="/generate-report"><button>Generate Report</button></Link>
    </div>
  </div>
);

export default MainPage;
