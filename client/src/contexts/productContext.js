import {useState, useEffect, createContext}  from "react";
import * as productService from "./../services/product"

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    let [products, setProducts] = useState("")

    useEffect(() => {
        productService.getProducts().then((result) => {
            setProducts(result)
        })
    },[])

    return(
            <ProductContext.Provider value={{products}}>
                {children}
            </ProductContext.Provider>)
}