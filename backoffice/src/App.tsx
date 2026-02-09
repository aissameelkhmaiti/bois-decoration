import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import NotFound from './pages/NoutFound';
import { useAuth } from './context/AuthContext';
import FullPageLoader from './components/FullPageLoader'; // Ton nouveau composant

function App() {
  const { user, token, loading } = useAuth();
  const isAuthenticated = !!user && !!token;

  // Rendu propre pendant la vérification de l'auth
  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />

        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;