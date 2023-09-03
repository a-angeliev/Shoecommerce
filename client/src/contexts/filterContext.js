import { useState, useEffect, createContext } from "react";
import { useRef } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const windowSizeWidth = useRef(window.innerWidth);

    const [brandFilterCtx, setBrandFilterCtx] = useState([]);
    const [categoryFilterCtx, setCategoryFilterCtx] = useState([]);
    const [priceFilterCtx, setPriceFilterCtx] = useState([]);
    const [sortedByCtx, setSortedByCtx] = useState("");
    const [genderCtx, setGenderCtx] = useState("");
    const [pageLoaderCtx, setPageLoaderCtx] = useState(0);
    const [startPageLoader, setStartPageLoader] = useState(0);
    const [newRow, setNewRow] = useState(0);

    useEffect(() => {
        const width = windowSizeWidth.current;
        const action = {
            1400: () => {
                setStartPageLoader(7);
                setNewRow(4);
            },
            1742: () => {
                setStartPageLoader(8);
                setNewRow(3);
            },
            2092: () => {
                setStartPageLoader(7);
                setNewRow(4);
            },
            2440: () => {
                setStartPageLoader(9);
                setNewRow(5);
            },
            100000: () => {
                setStartPageLoader(11);
                setNewRow(6);
            },
        };

        Object.keys(action).every((key) => {
            if (width < Number(key)) {
                action[key]();
                return false;
            }
            return true;
        });
    }, [windowSizeWidth]);

    useEffect(() => {
        setPageLoaderCtx(startPageLoader);
    }, [startPageLoader]);

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
                newRow,
                startPageLoader,
            }}>
            {children}
        </FilterContext.Provider>
    );
};
