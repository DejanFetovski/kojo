import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";
import Page404 from "./Page404";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/asset-manifest.json" element={<Navigate to="/dashboard" replace />} />
        <Route path="/manifest.json" element={<Navigate to="/dashboard" replace />} />
        <Route path="/robots.txt" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};

export default Router;
