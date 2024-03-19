import { supabase } from "@/lib/superbase";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  console.log(
    "🚀 ~ file: AuthProvider.tsx:25 ~ AuthProvider ~ session:",
    session
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      if (error) {
        console.error("Error fetching session", error);
        return;
      }
    };
    fetchSession();
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
