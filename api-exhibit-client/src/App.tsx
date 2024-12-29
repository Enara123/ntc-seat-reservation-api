import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import NtcAdmin from "./pages/NtcAdmin";
import BusOperator from "./pages/BusOperator";
import Commuter from "./pages/Commuter";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/ntc-admin" replace />} />
          <Route path="/ntc-admin" element={<NtcAdmin />} />
          <Route path="/bus-operator" element={<BusOperator />} />
          <Route path="/commuter" element={<Commuter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
