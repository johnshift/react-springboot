import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  AUTHORIZATION_KEY,
  MSG_SUCCESSFUL_LOGOUT,
  TOAST_OPTIONS,
} from "../constants";

type Props = {
  children: ReactNode;
};

type AuthContextT = {
  isAuthenticated: boolean;
  authLoading: boolean;
  authLogin: (token?: string) => void;
  authLogout: () => void;
};

const AuthContext = createContext<AuthContextT>({
  isAuthenticated: false,
  authLoading: true,
  authLogin: () => {},
  authLogout: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
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
    // no network calls. no need to display loaders

    setIsAuthenticated(true);

    if (token) {
      localStorage.setItem(AUTHORIZATION_KEY, token);
    }

    setAuthLoading(false);

    // to-do: get info using claims token
  };

  const authLogout = () => {
    // no network calls. no need to display loaders

    setIsAuthenticated(false);
    localStorage.removeItem(AUTHORIZATION_KEY);
    router.push("/login").then(() => {
      toast.success(MSG_SUCCESSFUL_LOGOUT, TOAST_OPTIONS);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authLoading,
        authLogin,
        authLogout,
        // userDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
