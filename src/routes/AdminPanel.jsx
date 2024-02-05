import { Routes, Route } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPanel />} />
    </Routes>
  )
}

export default Index
