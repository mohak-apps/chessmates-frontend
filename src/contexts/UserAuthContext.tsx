import { User } from "@/types";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";

// Define AuthContextType
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (_) => {},
  accessToken: null,
  setAccessToken: (_) => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userLogout = useRef(false); // Track logout state

  const logOut = async () => {
    // without Nav
    userLogout.current = true; // Set logging out state
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(null);
        setAccessToken(null);
      }
    } catch (err) {
      console.log("Error in logging out");
    } finally {
      setLoading(false);
    }
  };

  // refresh token
  const refreshToken = async () => {
    if (userLogout.current) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/auth/refresh-token`,
        {},
        {
          withCredentials: true, // include cookies in the request which has refresh token
        }
      );
      setAccessToken(response.data.accessToken);
      setUser(response.data.user);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logOut();
    } finally {
      setLoading(false);
    }
  };

  // refreshToken if no token is present
  useEffect(() => {
    if (!accessToken) {
      refreshToken();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  if (!!loading) {
    return (
      <ReactLoading type={"bubbles"} color={"red"} height={667} width={375} />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
