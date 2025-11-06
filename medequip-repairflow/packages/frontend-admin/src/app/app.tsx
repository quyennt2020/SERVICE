import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

// Simple authentication check for demonstration
const isAuthenticated = () => {
  // In a real app, you'd check for a token in localStorage or a cookie
  return true; // For now, always return true to access protected routes
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
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
        {/* Add dashboard route later */}
        <Route index element={<div>Dashboard Page</div>} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
