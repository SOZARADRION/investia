import { useEffect, useState } from 'react';

export function useCooldown() {
  const [until, setUntil] = useState(0);
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (!until) return;
    const timer = setInterval(() => {
      const time = Date.now();
      setNow(time);
      if (time >= until) setUntil(0);
    }, 1000);
    return () => clearInterval(timer);
  }, [until]);
  return {
    remaining: Math.max(0, Math.ceil((until - now) / 1000)),
    start: () => { const time = Date.now(); setNow(time); setUntil(time + 60_000); },
  };
}
