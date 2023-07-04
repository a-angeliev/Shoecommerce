import { AlertContext } from "../../contexts/AlertContext";
import style from "./Alert.module.css";

import React, { useState, useEffect, useContext } from "react";

export const Alert = (props) => {
    const { alert, setAlert } = useContext(AlertContext);

    const color = {
        green: "color-green",
        red: "color-red",
    };

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false);
            }, 1500);
        }
    }, [alert]);

    return (
        <div
            className={`${style["popup-container"]} ${alert !== false ? style.show : style.hide} 
            ${alert !== false ? style[color[alert.color]] : ""}
            `}>
            <div className={style["popup-text"]}>{alert.text}</div>
        </div>
    );
};
