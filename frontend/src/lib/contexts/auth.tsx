import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AUTHORIZATION_KEY } from "../constants";

type Props = {
  children: ReactNode;
};

type AuthContextT = {
  isAuthenticated: boolean;
  authLoading: boolean;
  authLogin: (token?: string) => void;
  authLogout: () => void;
  setAuthLoading: (loading: boolean) => void;
};

const AuthContext = createContext<AuthContextT>({
  isAuthenticated: false,
  authLoading: true,
  authLogin: () => {},
  authLogout: () => {},
  setAuthLoading: (loading: boolean) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    console.log("AUthProvider useEffect called");
    const token = localStorage.getItem(AUTHORIZATION_KEY);
    console.log("AuthProvider token from localStorage: ", token);

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
    setAuthLoading(true);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTHORIZATION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authLoading,
        authLogin,
        authLogout,
        setAuthLoading,
        // userDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
