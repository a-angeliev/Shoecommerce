import style from "./BrandInfoRow.module.css";
import { useState } from "react";

export const BrandInfoRow = (props) => {
    const brand = props.brand;

    const [activeDots, setActiveDots] = useState(false);

    const expandDots = () => {
        setActiveDots((prev) => !prev);
        console.log(activeDots);
    };
    return (
        <tr>
            <td className={style["cl-1"]}>{brand.id}</td>
            <td className={style["cl-2"]}>{brand.name}</td>
            <td className={style["cl-3"]}>
                <div className={style["brand-description"]}>{brand.description}</div>
            </td>
            <td className={style["cl-4"]}>
                <img className={style["brand-logo"]} src={brand.logo_url}></img>
            </td>
            <td className={style["cl-5"]}>
                <div
                    className={`${style["dots"]}  ${activeDots ? style.active : ""}`}
                    // onClick={() => {
                    //     expandDots();
                    // }}
                >
                    <div className={style.dot}></div>
                    <div className={style.dot}></div>
                    <div className={`${style.shadow} ${style.cut}`}></div>
                    <div className={`${style.container} ${style.cut}`}>
                        <div className={`${style.drop} ${style.cut}`}></div>
                    </div>
                    <div className={style.list}>
                        <ul>
                            <li>Edit</li>
                            <li>Delete</li>
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
    );
};
