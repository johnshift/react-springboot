import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AUTHORIZATION_KEY } from "../constants";

type Props = {
  children: ReactNode;
};

type AuthContextT = {
  isRedirected: boolean;
  isAuthenticated: boolean;
  authLoading: boolean;
  justLoggedOut: boolean;
  setIsRedirected: (redirected: boolean) => void;
  authLogin: (token?: string) => void;
  authLogout: () => void;
  setJustLoggedOut: (justLoggedOut: boolean) => void;
};

const AuthContext = createContext<AuthContextT>({
  isRedirected: false,
  isAuthenticated: false,
  authLoading: true,
  justLoggedOut: false,
  setIsRedirected: (redirected: boolean) => {},
  authLogin: () => {},
  authLogout: () => {},
  setJustLoggedOut: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [isRedirected, setIsRedirected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(AUTHORIZATION_KEY);
    console.log("AuthProvider token: ", token);

    // to-do: replace this with jwt-validation
    if (token !== null && token !== undefined) {
      authLogin();
    }
    setAuthLoading(false);
  }, []);

  const authLogin = (token?: string) => {
    setIsAuthenticated(true);

    if (token) {
      localStorage.setItem(AUTHORIZATION_KEY, token);
    }
    // to-do: get info using claims token
  };

  const authLogout = () => {
    // simulate logout delay
    setAuthLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      localStorage.removeItem(AUTHORIZATION_KEY);
      setJustLoggedOut(false);
      setAuthLoading(false);
      router.push("/login");
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        isRedirected,
        isAuthenticated,
        authLoading,
        justLoggedOut,
        authLogin,
        authLogout,
        setIsRedirected,
        setJustLoggedOut,
        // userDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
