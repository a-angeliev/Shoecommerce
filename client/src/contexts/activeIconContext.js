import { useState, createContext } from "react";

export const ActiveIconContext = createContext();

export const ActiveIconProvider = ({ children }) => {
    const [activeIcon, setActiveIcon] = useState("");

    return <ActiveIconContext.Provider value={{ activeIcon, setActiveIcon }}>{children}</ActiveIconContext.Provider>;
};
