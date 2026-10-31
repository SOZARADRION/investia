import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/services/firebase';

const AuthContext = createContext<{ user: User | null; loading: boolean; creating: boolean; setCreating: (value: boolean) => void } | null>(null);

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  useEffect(() => onAuthStateChanged(auth, (current) => {
    setUser(current);
    setLoading(false);
  }, () => { setUser(null); setLoading(false); }), []);
  return <AuthContext.Provider value={{ user, loading, creating, setCreating }}>{children}</AuthContext.Provider>;
}

export function useAuthSession() {
  const session = useContext(AuthContext);
  if (!session) throw new Error('AuthSessionProvider ausente.');
  return session;
}
