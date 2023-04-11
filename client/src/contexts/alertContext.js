import { useState, createContext } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [greenAlertBool, setGreenAlertBool] = useState(false);

    return <AlertContext.Provider value={{ greenAlertBool, setGreenAlertBool }}>{children}</AlertContext.Provider>;
};
