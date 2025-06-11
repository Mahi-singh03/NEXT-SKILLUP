"use client";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from storage
  const initializeAuth = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token"); // Add regular user token

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    
    if (adminToken) {
      setIsAdmin(true);
      setIsAuthenticated(true);
      if (!storedUser) {
        setUser({ isAdmin: true });
      }
    }
    
    // Check regular user token
    if (userToken && !storedUser) {
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback((userData, isAdminLogin = false, token = null) => {
    if (isAdminLogin && token) {
      localStorage.setItem("adminToken", token);
      setIsAdmin(true);
      setUser(userData || { isAdmin: true });
    } else {
      localStorage.setItem("user", JSON.stringify(userData));
      if (token) localStorage.setItem("token", token);
      setUser(userData);
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin, 
      login, 
      logout, 
      loading,
      initializeAuth 
    }}>
      {children}
    </UserContext.Provider>
  );
}