import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loginRequest, fetchUser } from '../api/authService';

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;           // <-- Nouveau state
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true); // <-- loading au départ

  // ================= LOGIN =================
  const login = async (email: string, password: string) => {
    const data = await loginRequest({ email, password });

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // ================= FETCH USER SI TOKEN EXISTE =================
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false); // fini de charger si pas de token
        return;
      }

      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        // token invalide ou expiré
        logout();
      } finally {
        setLoading(false); // fini le chargement
      }
    };

    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ================= HOOK =================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
