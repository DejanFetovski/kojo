import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../components/LandingPage'
import AdminPanel from '../components/AdminPanel'
import Page404 from '../components/Page404'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/admin" element={<AdminPanel />} /> */}
      <Route path="/404" element={<Page404 />} />
      <Route
        path="/asset-manifest.json"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/manifest.json"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/robots.txt"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default Router
