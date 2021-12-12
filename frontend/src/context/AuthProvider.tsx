import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AUTHORIZATION_KEY } from "../lib/constants";
import { simulateDelay } from "../lib/simulateDelay";

type Props = {
  children: ReactNode;
};

type AuthContext = {
  isAuthenticated: boolean;
  authLoading: boolean;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
  authLogin: (login?: string) => Promise<void>;
  authLogout: () => Promise<void>;
};

const Context = createContext<AuthContext>(undefined as any);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // called on app start
  useEffect(() => {
    const token = localStorage.getItem(AUTHORIZATION_KEY);

    if (token) {
      // we setLoadingFalse to get rid of initial authLoading state
      authLogin(undefined, true);
    } else {
      setAuthLoading(false);
    }
  }, []);

  // should provide token if called after login
  // otherwise proceed with login steps
  const authLogin = async (token?: string, setLoadingFalse?: boolean) => {
    await simulateDelay();

    if (token) {
      localStorage.setItem(AUTHORIZATION_KEY, token);
    }

    setIsAuthenticated(true);

    if (setLoadingFalse) {
      setAuthLoading(false);
    }
  };

  const authLogout = async () => {
    await simulateDelay();
    localStorage.removeItem(AUTHORIZATION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        authLoading,
        setAuthLoading,
        authLogin,
        authLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
