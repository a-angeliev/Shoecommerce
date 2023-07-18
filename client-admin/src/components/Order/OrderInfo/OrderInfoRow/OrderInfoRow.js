import { useState } from "react";
import style from "./OrderInfoRow.module.css";
import { Link } from "react-router-dom";

export const OrderInfoRow = (props) => {
    const [activeDots, setActiveDots] = useState(false);
    const date = new Date(props.order.created_on);
    console.log(date.toLocaleDateString(), date.toLocaleTimeString(), 123);
    return (
        <>
            <tr className={style.tr}>
                <td className={style["cl-1"]}>{props.order.id}</td>
                <td className={style["cl-2"]}>
                    {date.toLocaleDateString()} - {date.toLocaleTimeString()}
                </td>
                <td className={style["cl-3"]}>{props.order.is_shipped}</td>
                <td className={style["cl-4"]}>{props.order.shipped_on === null ? "none" : props.order.shipped_on}</td>
                <td className={style["cl-5"]}>{props.order.total_price} $</td>
                <td className={style["cl-6"]}>
                    <div className={`${style["dots"]}  ${activeDots ? style.active : ""}`}>
                        <div className={style.dot}></div>
                        <div className={style.dot}></div>
                        <div className={`${style.shadow} ${style.cut}`}></div>
                        <div className={`${style.container} ${style.cut}`}>
                            <div className={`${style.drop} ${style.cut}`}></div>
                        </div>
                        <div className={style.list}>
                            <ul>
                                <li>
                                    <Link to={`/order/${1}`}>Details</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={style.dot}></div>
                    </div>
                    <div
                        className={style.cursor}
                        onClick={() => {
                            setActiveDots((prev) => !prev);
                        }}></div>
                </td>
            </tr>
        </>
    );
};
