// import { createContext, useContext } from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setItem, removeUser] = useLocalStorage('user', null);

//     const addUser = (user) => setItem(user);

//     const logout = () => {
//         removeUser();
//     };

//     const isAuthenticated = Boolean(user?.token);

//     return (
//         <AuthContext.Provider
//             value={{ user, addUser, logout, isAuthenticated }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// /**
//  *
//  * @returns { { user: {}, addUser: ({ email: string, password: string}) => void, logout: () => void, isAuthenticated: boolean} }
//  */
// export const useAuthContext = () => {
//     const authState = useContext(AuthContext);

//     return authState;
// };

import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";
import { AlertContext } from "./alertContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { setAlert } = useContext(AlertContext);
    const [auth, setAuth] = useLocalStorage("auth", {});
    const userLogin = (authData) => setAuth(authData);
    const userLogout = () => setAuth({});
    const isAuthenticated = Boolean(auth?.token);

    useEffect(() => {
        console.log(auth);
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
