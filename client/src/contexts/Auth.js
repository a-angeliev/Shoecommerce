import { createContext, useContext, useEffect } from "react";

import { AlertContext } from "./alertContext";
import { useLocalStorage } from "./../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { setAlert } = useContext(AlertContext);

    const userLogout = () => setAuth({});

    const [auth, setAuth] = useLocalStorage("auth", {});

    const userLogin = (authData) => setAuth(authData);

    const isAuthenticated = Boolean(auth?.token);

    useEffect(() => {
        if (auth.role == "admin") {
            userLogout();
            setAlert({ color: "red", text: "You cannot login with admin account. Use client account. " });
        }
    }, [auth]);

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
