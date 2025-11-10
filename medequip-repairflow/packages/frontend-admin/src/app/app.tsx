import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import EquipmentPage from './pages/EquipmentPage';
import { useAuth } from './context/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="equipment" element={<EquipmentPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
