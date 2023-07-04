import style from "./CategoryInfoRow.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export const CategoryInfoRow = (params) => {
    const [activeDots, setActiveDots] = useState(false);

    const expandDots = () => {
        setActiveDots((prev) => !prev);
    };
    return (
        <>
            <tr className={style.tr}>
                <td className={style["cl-1"]}>{params.category.id}</td>
                <td className={style["cl-2"]}>{params.category.title}</td>
                <td className={style["cl-3"]}>
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
                                    <Link to={`/category/edit/${params.category.id}`}>Edit</Link>
                                </li>
                                <li>
                                    <Link>Delete</Link>
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
