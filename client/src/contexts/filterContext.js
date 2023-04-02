import { useState, useEffect, createContext } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [brandFilterCtx, setBrandFilterCtx] = useState([]);
    const [categoryFilterCtx, setCategoryFilterCtx] = useState([]);
    const [priceFilterCtx, setPriceFilterCtx] = useState([]);
    const [genderCtx, setGenderCtx] = useState("");

    return (
        <FilterContext.Provider
            value={{
                brandFilterCtx,
                categoryFilterCtx,
                genderCtx,
                priceFilterCtx,
                setBrandFilterCtx,
                setCategoryFilterCtx,
                setGenderCtx,
                setPriceFilterCtx,
            }}>
            {children}
        </FilterContext.Provider>
    );
};
