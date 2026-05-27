import { createContext, useContext, useEffect, useState } from 'react';
import { getMe, login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(({ data }) => { setUser(data?.user ?? null); })
      .catch(() => { setUser(null); })
      .finally(() => { setIsLoading(false); });
  }, []);

  async function login(email, password) {
    const { data, error } = await apiLogin(email, password);
    if (error) return { error };
    setUser(data.user);
    return { error: null };
  }

  async function register(email, password) {
    const { data, error } = await apiRegister(email, password);
    if (error) return { error };
    setUser(data.user);
    return { error: null };
  }

  async function logout() {
    await apiLogout();
    localStorage.removeItem('auth_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
