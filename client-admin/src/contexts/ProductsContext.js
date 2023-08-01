import { useState, useEffect, createContext } from "react";

import * as productService from "./../services/product";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getProducts().then((products) => {
            setProducts(JSON.parse(products));
        });
    }, []);

    return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
};
