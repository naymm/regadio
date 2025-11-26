import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  // Carregar perfil do usuário
  const loadUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      console.log("Loading profile for user ID:", supabaseUser.id);
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        console.error("Error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        
        // Se o perfil não existe (PGRST116), tentar criar
        if (error.code === "PGRST116") {
          console.log("Profile not found, attempting to create...");
          return await createProfile(supabaseUser);
        }
        
        return null;
      }

      if (!profile) {
        console.error("Profile not found in database, attempting to create...");
        return await createProfile(supabaseUser);
      }

      console.log("Profile found:", profile);
      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
      };
    } catch (error: any) {
      console.error("Exception loading profile:", error);
      return null;
    }
  };

  // Criar perfil se não existir
  const createProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      console.log("Creating profile for user:", supabaseUser.id);
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          name: supabaseUser.user_metadata?.name || supabaseUser.email || "User",
          role: "viewer",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating profile:", error);
        // Se já existe (conflito), tentar buscar novamente
        if (error.code === "23505") {
          console.log("Profile already exists, fetching...");
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", supabaseUser.id)
            .single();
          
          if (existingProfile) {
            return {
              id: existingProfile.id,
              email: existingProfile.email,
              name: existingProfile.name,
              role: existingProfile.role,
            };
          }
        }
        return null;
      }

      if (profile) {
        console.log("Profile created successfully:", profile);
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role,
        };
      }

      return null;
    } catch (error: any) {
      console.error("Exception creating profile:", error);
      return null;
    }
  };

  // Verificar sessão ao carregar
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    
    // Timeout de segurança para garantir que loading seja false após 5 segundos
    timeoutId = setTimeout(() => {
      if (mounted) {
        console.warn("Loading timeout reached, setting loading to false");
        setLoading(false);
      }
    }, 5000);
    
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      console.log("Initial session check:", session?.user?.id);
      if (session?.user) {
        loadUserProfile(session.user).then((profile) => {
          if (mounted) {
            clearTimeout(timeoutId);
            setUser(profile);
            setLoading(false); // Sempre setar loading como false
          }
        }).catch((error) => {
          console.error("Error in loadUserProfile promise:", error);
          if (mounted) {
            clearTimeout(timeoutId);
            setLoading(false); // Garantir que loading seja false mesmo em caso de erro
          }
        });
      } else {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    }).catch((error) => {
      console.error("Error getting session:", error);
      if (mounted) {
        clearTimeout(timeoutId);
        setLoading(false); // Garantir que loading seja false mesmo em caso de erro
      }
    });

    // Ouvir mudanças de autenticação
    let isProcessingAuthChange = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Evitar processamento múltiplo simultâneo
      if (isProcessingAuthChange) {
        console.log("Auth change already processing, skipping...");
        return;
      }
      
      isProcessingAuthChange = true;
      console.log("Auth state changed:", event, session?.user?.id);
      
      try {
        if (session?.user) {
          const profile = await loadUserProfile(session.user);
          if (profile) {
            setUser(profile);
            console.log("User set in onAuthStateChange:", profile);
          } else {
            console.error("Failed to load profile in onAuthStateChange");
            setUser(null); // Limpar usuário se perfil não foi carregado
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in onAuthStateChange:", error);
        setUser(null);
      } finally {
        setLoading(false); // Sempre setar loading como false
        isProcessingAuthChange = false;
      }
    });

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Attempting login for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
      }

      if (!data.user) {
        console.error("No user returned from login");
        return { success: false, error: "Erro ao fazer login" };
      }

      console.log("User authenticated, loading profile...", data.user.id);
      
      const profile = await loadUserProfile(data.user);
      
      if (!profile) {
        console.error("Profile not found for user:", data.user.id);
        return { 
          success: false, 
          error: "Perfil não encontrado. Verifique se o trigger handle_new_user foi executado ou crie o perfil manualmente." 
        };
      }

      console.log("Profile loaded successfully:", profile);
      
      // Atualizar estado imediatamente
      setUser(profile);
      setLoading(false);
      
      console.log("User state updated, isAuthenticated should be true now");
      
      return { success: true };
    } catch (error: any) {
      console.error("Login exception:", error);
      return { success: false, error: error.message || "Erro desconhecido" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
        loading,
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
