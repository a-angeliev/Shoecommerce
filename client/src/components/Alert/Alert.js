import React, { useEffect, useContext } from "react";

import { AlertContext } from "../../contexts/alertContext";

import "./Alert.css";

export const Alert = () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert]);

    return (
        <div
            className={`popup-container ${alert !== false ? "show" : "hide"} 
            ${alert !== false ? color[alert.color] : ""}
            `}>
            <div className='popup-text'>{alert.text}</div>
        </div>
    );
};
