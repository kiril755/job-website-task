import "./scss/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

import JobList from "./components/JobList";
import DetailedJob from "./components/DetailedJob";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container container__job-list">
            <JobList />
          </div>
        }
      />
      <Route path="/detail" element={<DetailedJob />} />
    </Routes>
  );
}

export default App;
