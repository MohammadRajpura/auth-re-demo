import { auth } from "@/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const myAuthInfo = auth;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(myAuthInfo, (loggedUser) => {
      console.log("Auth State Changed:", loggedUser);
      setUser(loggedUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [myAuthInfo]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
