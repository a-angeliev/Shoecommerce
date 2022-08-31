import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setItem] = useLocalStorage('user', null);

    const addUser = (user) => setItem(user);

    const logout = () => {
        setItem(null);
    };

    const isAuthenticated = Boolean(user?.token);

    return (
        <AuthContext.Provider
            value={{ user, addUser, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
};
