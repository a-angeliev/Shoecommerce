import { useState, useEffect, createContext } from "react";
import * as productService from "./../services/product";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    let [products, setProducts] = useState("");

    useEffect(() => {
        productService.getProducts().then((result) => {
            const r = JSON.parse(result);
            setProducts(r);
        });
    }, []);

    return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
};
