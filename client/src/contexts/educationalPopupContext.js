import { createContext, useState } from "react";

export const EducationalPopupContext = createContext();

export const EducationalPopupProvider = ({ children }) => {
    const [educationPopup, setEducationPopup] = useState(true);

    return (
        <EducationalPopupContext.Provider value={{ educationPopup, setEducationPopup }}>
            {children}
        </EducationalPopupContext.Provider>
    );
};
