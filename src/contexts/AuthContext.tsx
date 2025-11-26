import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Permissões por role
const permissions = {
  admin: ["read", "write", "delete", "publish", "archive", "manage_users"],
  editor: ["read", "write", "publish", "archive"],
  viewer: ["read"],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem("admin_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("admin_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Em produção, isso seria uma chamada à API
    // Por enquanto, validação simples (em produção, usar hash de senha)
    const users = [
      {
        id: "1",
        email: "admin@regadio.co.ao",
        password: "admin123", // Em produção, usar hash
        name: "Administrador",
        role: "admin" as const,
      },
      {
        id: "2",
        email: "editor@regadio.co.ao",
        password: "editor123",
        name: "Editor",
        role: "editor" as const,
      },
    ];

    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("admin_user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return permissions[user.role].includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission,
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

