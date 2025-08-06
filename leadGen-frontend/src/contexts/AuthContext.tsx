// AuthContext.tsx
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Tokens {
  access: string;
  refresh: string;
  django_token?: string;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
  business_name: string;
}

interface AuthContextType {
  user: User | null;
  tokens: Tokens | null;
  login: (response: {
    tokens: Tokens;
    email: string;
    first_name: string;
    last_name: string;
    business_name: string;
  }) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccess = localStorage.getItem("access_token");
    const storedRefresh = localStorage.getItem("refresh_token");
    const storedDjangoToken = localStorage.getItem("django_token");

    if (storedUser && storedAccess && storedRefresh) {
      setUser(JSON.parse(storedUser));
      setTokens({
        access: storedAccess,
        refresh: storedRefresh,
        django_token: storedDjangoToken || undefined,
      });
    }
  }, []);

  const login = (response: {
    tokens: Tokens;
    email: string;
    first_name: string;
    last_name: string;
    business_name: string;
  }) => {
    localStorage.setItem("access_token", response.tokens.access);
    localStorage.setItem("refresh_token", response.tokens.refresh);

    if (response.tokens.django_token) {
      localStorage.setItem("django_token", response.tokens.django_token);
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
        business_name: response.business_name,
      })
    );
    setUser({
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      business_name: response.business_name,
    });
    setTokens({
      access: response.tokens.access,
      refresh: response.tokens.refresh,
      django_token: response.tokens.django_token,
    });
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post(
          "http://localhost:8000/api/auth/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("django_token");
      localStorage.removeItem("user");
      setUser(null);
      setTokens(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
