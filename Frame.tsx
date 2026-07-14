import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type ProfileRow = {
  id: string;
  role: "student" | "landlord" | "admin" | string | null;
  verification_status: string | null;
  full_name: string | null;
};

type AuthContextValue = {
  session: Session | null;
  profile: ProfileRow | null;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string, fullName: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}

async function fetchProfileBySession(session: Session): Promise<ProfileRow | null> {
  const userId = session.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, verification_status, full_name")
    .eq("id", userId)
    .maybeSingle();

  if (error) return null;
  return (data as ProfileRow | null) ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  const role = profile?.role ?? null;

  const refresh = useCallback(async (nextSession: Session | null) => {
    if (!nextSession) {
      setSession(null);
      setProfile(null);
      return;
    }

    setSession(nextSession);
    const prof = await fetchProfileBySession(nextSession);
    setProfile(prof);
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        setSession(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const nextSession = data.session ?? null;
      await refresh(nextSession);
      if (!mounted) return;
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      // Keep UI consistent: auth state changes are async because profiles fetch is async too
      await refresh(nextSession ?? null);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [refresh]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, intendedRole: string, fullName: string, phone?: string) => {
      setLoading(true);

      const normalizedRole = intendedRole.toLowerCase();
      if (normalizedRole !== "student" && normalizedRole !== "landlord") {
        setLoading(false);
        throw new Error("Invalid role specified. Must be 'student' or 'landlord'.");
      }

      const metadata: Record<string, unknown> = {
        role: normalizedRole,
        full_name: fullName,
      };
      
      if (phone && phone.trim() !== '') {
        metadata.phone = phone.trim();
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        setLoading(false);
        throw error;
      }
      setLoading(false);
    },
    []
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) throw error;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      role,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [session, profile, role, loading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
