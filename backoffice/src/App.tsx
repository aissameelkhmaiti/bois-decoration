import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import NotFound from './pages/NoutFound'; // Import du nouveau fichier
import { useAuth } from './context/AuthContext';

function App() {
  const { user, token } = useAuth();
  const isAuthenticated = user && token;

  return (
    <Router>
      <Routes>
        {/* Login : redirige vers dashboard si déjà connecté */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />

        {/* Dashboard protégé */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* Accueil : redirection logique selon l'auth */}
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
        />

        {/* Page 404 : Capture toutes les autres routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;