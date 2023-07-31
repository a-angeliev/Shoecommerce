import { createContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const isAuthenticated = Boolean(auth?.token);

    const userLogin = (authData) => setAuth(JSON.parse(authData));

    const userLogout = () => setAuth({});

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
