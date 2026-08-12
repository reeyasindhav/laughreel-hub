import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export type User = {
  name: string;
  email: string;
  plan: string;
  joined: string;
};

type AuthState = {
  user: User | null;
  ready: boolean;
  watchlist: string[];
  tickets: string[];
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  toggleWatchlist: (id: string) => void;
  bookTicket: (id: string) => void;
};

const KEY = "laughreel.session";
const WKEY = "laughreel.watchlist";
const TKEY = "laughreel.tickets";

const AuthContext = createContext<AuthState | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [tickets, setTickets] = useState<string[]>([]);

  useEffect(() => {
    flushSync(() => {
      setUser(read<User | null>(KEY, null));
      setWatchlist(read<string[]>(WKEY, ["biswa-mast-aadmi", "landing"]));
      setTickets(read<string[]>(TKEY, ["t1", "t3"]));
      setReady(true);
    });
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const next: User = {
      name: (email.split("@")[0] ?? "").replace(/[._-]/g, " ") || "Comedy Fan",
      email,
      plan: "Front Row",
      joined: "March 2024",
    };
    write(KEY, next);
    flushSync(() => setUser(next));
    return next;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const next: User = { name, email, plan: "Front Row", joined: "Today" };
    write(KEY, next);
    flushSync(() => setUser(next));
    return next;
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
    setUser(null);
  }, []);

  const toggleWatchlist = useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      write(WKEY, next);
      return next;
    });
  }, []);

  const bookTicket = useCallback((id: string) => {
    setTickets((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      write(TKEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, watchlist, tickets, login, signup, logout, toggleWatchlist, bookTicket }),
    [user, ready, watchlist, tickets, login, signup, logout, toggleWatchlist, bookTicket],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
