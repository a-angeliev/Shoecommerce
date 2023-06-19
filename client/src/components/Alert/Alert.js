import { AlertContext } from "../../contexts/alertContext";
import "./Alert.css";

import React, { useState, useEffect, useContext } from "react";

export const Alert = (props) => {
    const { alert, setAlert } = useContext(AlertContext);
    const text = {
        addInCart: "Product added to cart successfully!",
        chooseColor: "You should pick color and size!",
        notAvailable: "It not available some of products in your order!",
        tokenMissing: "A valid token is missing!",
        userUpdated: "Updated user info successfully!",
        inputInvalid: "You should fill with valid data all fields!",
        removeWish: "You successful remove the shoe from the Wishlist!",
        addWish: "You successful add the shoe into the Wishlist!",
        wishProblem: "There is problem with Add/Remove.Try to reload!",
    };
    const color = {
        green: "color-green",
        red: "color-red",
    };
    useEffect(() => {
        // Show popup and hide after 1.5 seconds
        if (alert) {
            setTimeout(() => {
                setAlert(false);
            }, 1500);
        }
    }, [alert]);

    return (
        <div
            className={`popup-container ${alert !== false ? "show" : "hide"} 
            ${alert !== false ? color[alert.color] : ""}
            `}>
            <div className='popup-text'>{text[alert.text]}</div>
        </div>
    );
};
