import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "public" | "registered" | "premium";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: AppRole;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole>("public");
  const [loading, setLoading] = useState(true);

  const loadRole = useCallback(async (uid: string | null) => {
    if (!uid) {
      setRole("public");
      return;
    }
    const { data } = await (supabase as unknown as {
      from: (t: string) => {
        select: (c: string) => {
          eq: (k: string, v: string) => {
            maybeSingle: () => Promise<{ data: { role: AppRole } | null }>;
          };
        };
      };
    })
      .from("profiles")
      .select("role")
      .eq("id", uid)
      .maybeSingle();
    setRole((data?.role as AppRole) ?? "registered");
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      // Defer supabase call to avoid deadlock in listener
      setTimeout(() => {
        loadRole(s?.user?.id ?? null);
      }, 0);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      loadRole(s?.user?.id ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [loadRole]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole("public");
  };

  const refreshRole = useCallback(async () => {
    await loadRole(session?.user?.id ?? null);
  }, [loadRole, session?.user?.id]);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, role, loading, signOut, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
