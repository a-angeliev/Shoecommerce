import { useEffect, useContext } from "react";

import { AlertContext } from "../../contexts/AlertContext";

import style from "./Alert.module.css";

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
            className={`${style["popup-container"]} ${alert !== false ? style.show : style.hide} 
            ${alert !== false ? style[color[alert.color]] : ""}
            `}>
            <div className={style["popup-text"]}>{alert.text}</div>
        </div>
    );
};
