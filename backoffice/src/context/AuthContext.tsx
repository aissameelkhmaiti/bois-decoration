import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loginRequest, fetchUser } from '../api/authService';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

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
      if (!token) return;

      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        // token invalide ou expiré
        logout();
      }
    };

    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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
