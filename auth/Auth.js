import { getAuth, onIdTokenChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase.config";
import nookies from "nookies";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        console.log("no user");
        setCurrentUser(null);
        nookies.set(undefined, "token", null, {});
        nookies.set(undefined, "sellerId", null, {});
        nookies.set(undefined, "user", null, {});

        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      nookies.set(undefined, "token", token, {});
      nookies.set(undefined, "user", user, {});
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
