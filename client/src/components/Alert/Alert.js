import { AlertContext } from "../../contexts/alertContext";
import "./Alert.css";

import React, { useState, useEffect, useContext } from "react";

export const Alert = (props) => {
    const { greenAlertBool, setGreenAlertBool } = useContext(AlertContext);
    const text = {
        addInCart: "Product added to cart successfully",
        chooseColor: "Pick a color first",
    };
    const color = {
        green: "color-green",
        red: "color-red",
    };
    useEffect(() => {
        // Show popup and hide after 1.5 seconds
        if (greenAlertBool) {
            setTimeout(() => {
                setGreenAlertBool(false);
            }, 1500);
        }
    }, [greenAlertBool]);

    return (
        <div
            className={`popup-container ${greenAlertBool ? "show" : "hide"} 
                ${props.colored ? color[props.colored] : null}
                `}>
            <div className='popup-text'>{text[props.text]}</div>
        </div>
    );
};
