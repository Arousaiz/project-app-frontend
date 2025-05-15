import { useContext, createContext, useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router";
import { AuthService, type AuthInterface } from "~/api/api.auth";

export interface AuthContextInterface {
  user: any | null;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | undefined;
}) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(user);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
