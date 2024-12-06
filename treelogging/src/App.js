import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, data } from 'react-router-dom';
import MainPage from './components/MainPage';
import LogDataPage from './components/LogDataPage';
import UpdateDataPage from './components/UpdateDataPage';
import GenerateReportPage from './components/GenerateReportPage';

function App() {
  const [dataPoints, setDataPoints] = useState([]);
  console.log(dataPoints)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/log-data"
          element={<LogDataPage dataPoints={dataPoints} setDataPoints={setDataPoints} />}
        />
        <Route
          path="/update-data"
          element={<UpdateDataPage dataPoints={dataPoints} setDataPoints={setDataPoints} />}
        />
        <Route
          path="/generate-report"
          element={<GenerateReportPage dataPoints={dataPoints} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
