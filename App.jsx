import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import Create from './pages/Create'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App