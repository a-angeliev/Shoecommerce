import { useState } from "react";
import style from "./ProductInfoRow.module.css";
import { Link } from "react-router-dom";
export const ProductInfoRow = () => {
    const [activeDots, setActiveDots] = useState(false);

    const expandDots = () => {
        setActiveDots((prev) => !prev);
    };
    return (
        <>
            <tr className={style["tr"]}>
                <td className={style["cl-1"]}>1</td>
                <td className={style["cl-2"]}>
                    <img
                        className={style["product-img"]}
                        src='https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/a427af8a-b5fa-43c2-964c-743aae124d9c/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png'></img>
                </td>
                <td className={style["cl-3"]}>Addidas Shoes</td>
                <td className={style["cl-4"]}>300$</td>
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
                                    <Link to={`/brand/edit/`}>Details</Link>
                                </li>
                                <li>{/* <Link onClick={() => setDeletePopup(true)}>Delete</Link> */}</li>
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
