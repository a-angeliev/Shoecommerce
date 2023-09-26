import { useState, useEffect, createContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartState, setCartState] = useState("");

    const [cart, setCart] = useLocalStorage("cart", []);

    useEffect(() => {
        setCartState(cart);
    }, []);

    const removeFromCart = (index) => {
        cartState.splice(index, 1);
        const cartStateCopy = [...cartState];
        setCartState(cartStateCopy);
        setCart(cartStateCopy);
    };

    const addToCart = (shoe) => {
        let cartStateCopy = [...cartState];
        setCartState([...cartStateCopy, shoe]);
        setCart([...cartStateCopy, shoe]);
    };

    const emptyCart = () => {
        setCartState("");
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cartState, setCartState, removeFromCart, addToCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};
