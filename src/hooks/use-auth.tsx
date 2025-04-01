
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserRole = "student" | "teacher" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: string; // For students
  subject?: string; // For teachers
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS: Record<string, User> = {
  "student@school.ru": {
    id: "1",
    name: "Иван Иванов",
    email: "student@school.ru",
    role: "student",
    class: "11A"
  },
  "teacher@school.ru": {
    id: "2",
    name: "Елена Петрова",
    email: "teacher@school.ru",
    role: "teacher",
    subject: "Математика"
  },
  "admin@school.ru": {
    id: "3",
    name: "Александр Сидоров",
    email: "admin@school.ru",
    role: "admin"
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("school-journal-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem("school-journal-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // In a real app, this would be an API call
      const mockUser = MOCK_USERS[email];
      
      if (mockUser && mockUser.role === role) {
        // Successful login
        setUser(mockUser);
        localStorage.setItem("school-journal-user", JSON.stringify(mockUser));
        toast.success(`Добро пожаловать, ${mockUser.name}!`);
      } else {
        throw new Error("Неверный email или пароль");
      }
    } catch (error) {
      let errorMessage = "Ошибка входа";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("school-journal-user");
    toast.info("Вы вышли из системы");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
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
