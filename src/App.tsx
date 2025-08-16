import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import ViewPage from "./pages/view-page/ViewPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/post/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
