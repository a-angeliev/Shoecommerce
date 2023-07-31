import { Link } from "react-router-dom";
import { useState } from "react";

import style from "./ProductInfoRow.module.css";

export const ProductInfoRow = (props) => {
    const [activeDots, setActiveDots] = useState(false);

    const expandDots = () => {
        setActiveDots((prev) => !prev);
    };

    return (
        <>
            <tr className={style["tr"]}>
                <td className={style["cl-1"]}>{props.product.id}</td>
                <td className={style["cl-2"]}>
                    <img className={style["product-img"]} src={props.product.images[0].img_url}></img>
                </td>
                <td className={style["cl-3"]}>{props.product.title}</td>
                <td className={style["cl-4"]}>{props.product.price}$</td>
                <td className={style["cl-5"]}>
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
                                    <Link to={`/product/${props.product.id}`}>Details</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={style.dot}></div>
                    </div>
                    <div
                        className={style.cursor}
                        onClick={() => {
                            expandDots();
                        }}></div>
                </td>
            </tr>
        </>
    );
};
