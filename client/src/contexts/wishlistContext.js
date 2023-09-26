import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./Auth";
import * as wishlistService from "../services/wishlist";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [wishlist, setWishlist] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]);

    useEffect(() => {
        setWishlistIds(wishlist.map((shoe) => shoe.id));
    }, [wishlist]);

    useEffect(() => {
        if (Object.keys(user).length != 0) {
            wishlistService
                .getWishlist()
                .then((result) => {
                    let data = JSON.parse(result);
                    let idList = data.map((shoe) => shoe.id);
                    setWishlistIds(idList);
                    setWishlist(data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const addWishlistCtx = (shoe) => {
        let prevState = [...wishlist];
        prevState.push(shoe);
        setWishlist(prevState);
    };

    const removeWishlistCtx = (shoeId) => {
        let prevState = [...wishlist];
        const filteredPrevState = prevState.filter((shoe) => shoe.id != shoeId);
        setWishlist(filteredPrevState);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, wishlistIds, addWishlistCtx, removeWishlistCtx }}>
            {children}
        </WishlistContext.Provider>
    );
};
