import { useState, useEffect, createContext } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [brandFilterCtx, setBrandFilterCtx] = useState([]);
    const [categoryFilterCtx, setCategoryFilterCtx] = useState([]);
    const [priceFilterCtx, setPriceFilterCtx] = useState([]);
    const [sortedByCtx, setSortedByCtx] = useState("");
    const [genderCtx, setGenderCtx] = useState("");
    const [pageLoaderCtx, setPageLoaderCtx] = useState(7);

    return (
        <FilterContext.Provider
            value={{
                brandFilterCtx,
                categoryFilterCtx,
                genderCtx,
                priceFilterCtx,
                sortedByCtx,
                pageLoaderCtx,
                setBrandFilterCtx,
                setCategoryFilterCtx,
                setGenderCtx,
                setPriceFilterCtx,
                setSortedByCtx,
                setPageLoaderCtx,
            }}>
            {children}
        </FilterContext.Provider>
    );
};
