import { AlertContext } from "../../contexts/alertContext";
import "./Alert.css";

import React, { useState, useEffect, useContext } from "react";

export const Alert = (props) => {
    const { alert, setAlert } = useContext(AlertContext);
    const text = {
        addInCart: "Product added to cart successfully!",
        chooseColor: "You should pick color and size!",
        notAvailable: "It not available some of products in your order!",
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
