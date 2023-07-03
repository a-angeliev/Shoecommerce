import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const userLogin = (authData) => setAuth(JSON.parse(authData));
    const userLogout = () => setAuth({});
    const isAuthenticated = Boolean(auth?.token);

    return (
        <AuthContext.Provider
            value={{
                user: auth,
                userLogin,
                userLogout,
                isAuthenticated,
                isAdmin: auth.role == "admin",
            }}>
            {children}
        </AuthContext.Provider>
    );
};