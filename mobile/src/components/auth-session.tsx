import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { getIdToken, onAuthStateChanged, reload, type User } from 'firebase/auth';
import { auth } from '@/services/firebase';

const AuthContext = createContext<{ user: User | null; loading: boolean; creating: boolean; setCreating: (value: boolean) => void; emailVerified: boolean; refreshVerification: () => Promise<boolean> } | null>(null);

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  useEffect(() => onAuthStateChanged(auth, (current) => {
    setUser(current);
    setEmailVerified(current?.emailVerified ?? false);
    setLoading(false);
  }, () => { setUser(null); setEmailVerified(false); setLoading(false); }), []);
  async function refreshVerification() {
    const current = auth.currentUser;
    if (!current) return false;
    await reload(current);
    await getIdToken(current, true);
    if (auth.currentUser?.uid !== current.uid) return false;
    setEmailVerified(current.emailVerified);
    return current.emailVerified;
  }
  return <AuthContext.Provider value={{ user, loading, creating, setCreating, emailVerified, refreshVerification }}>{children}</AuthContext.Provider>;
}

export function useAuthSession() {
  const session = useContext(AuthContext);
  if (!session) throw new Error('AuthSessionProvider ausente.');
  return session;
}
