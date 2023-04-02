import {useState, useEffect, createContext}  from "react";


export const FilterContext = createContext();

export const FilterProvider = ({children}) => {
    const [brandFilterCtx, setBrandFilterCtx] = useState([])
    const [categoryFilterCtx, setCategoryFilterCtx] = useState([])
    const [genderCtx, setGenderCtx] = useState("")


    return(
        <FilterContext.Provider value={{brandFilterCtx, categoryFilterCtx, genderCtx, setBrandFilterCtx, setCategoryFilterCtx, setGenderCtx}}>
            {children}
        </FilterContext.Provider>)
}