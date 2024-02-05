import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/LandingPage";
const Index = () => {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
  );
};

export default Index;

