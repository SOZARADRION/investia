import { createContext, useContext, useState, type PropsWithChildren } from 'react';

const DemoSessionContext = createContext<{ version: number; clear: () => void } | null>(null);

export function DemoSessionProvider({ children }: PropsWithChildren) {
  const [version, setVersion] = useState(0);
  return <DemoSessionContext.Provider value={{ version, clear: () => setVersion((current) => current + 1) }}>
    {children}
  </DemoSessionContext.Provider>;
}

export function useDemoSession() {
  const session = useContext(DemoSessionContext);
  if (!session) throw new Error('DemoSessionProvider ausente.');
  return session;
}
