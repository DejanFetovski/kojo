import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "../components/Page404";
const Index = () => {
  return (
      <Routes>
        <Route path="/" element={<Page404 />} />
      </Routes>
  );
};
export default Index;