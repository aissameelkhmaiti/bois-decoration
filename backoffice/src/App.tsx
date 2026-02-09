import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import NotFound from './pages/NoutFound';
import { useAuth } from './context/AuthContext';
import { Box, Skeleton } from '@mui/material'; // ← importer MUI Skeleton

function App() {
  const { user, token, loading } = useAuth(); // loading = vérifie si le contexte est prêt
  const isAuthenticated = !!user && !!token;

  // Loader Skeleton pendant le chargement
  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Skeleton variant="text" width={250} height={40} />   {/* titre */}
        <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} /> {/* contenu */}
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
      </Box>
    );
  }

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
