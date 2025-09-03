import { createContext, useContext, useState, useEffect } from "react";

// Create the memory box (Context)
const AuthContext = createContext();

// This is like a special helper that lets any part of your app ask:
// "Who is logged in?" or "Can I go to this page?"
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// This is the actual memory box that holds all the user information
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Who is logged in?
  const [isLoading, setIsLoading] = useState(true); // Are we still checking?

  // When the app starts, check if someone was already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("kanban-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("kanban-user");
      }
    }
    setIsLoading(false);
  }, []);

  // Function to login (put user info in the memory box)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("kanban-user", JSON.stringify(userData));
  };

  // Function to logout (empty the memory box)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("kanban-user");
  };

  // Check if someone is logged in
  const isAuthenticated = !!user;

  // This is what we share with the whole app
  const value = {
    user, // Who is logged in?
    login, // How to login
    logout, // How to logout
    isAuthenticated, // Are they logged in?
    isLoading, // Are we still checking?
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
