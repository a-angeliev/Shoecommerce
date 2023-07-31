import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { Alert } from "../../../Alert/Alert";
import { AlertContext } from "../../../../contexts/AlertContext";
import * as categoryService from "../../../../services/category";

import style from "./CategoryInfoRow.module.css";

export const CategoryInfoRow = (params) => {
    const { setAlert } = useContext(AlertContext);

    const [activeDots, setActiveDots] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const expandDots = () => {
        setActiveDots((prev) => !prev);
    };

    const deleteBrand = () => {
        categoryService
            .deleteCategory(params.category.id)
            .then((res) => {
                params.reset((prev) => !prev);
                setDeletePopup(false);
                setActiveDots(false);
                setAlert({ color: "green", text: "You successful delete the Item!" });
            })
            .catch((err) => {
                setAlert({ color: "red", text: err.message });
            });
    };

    return (
        <>
            <Alert></Alert>
            <div
                className={`${style.delete}  ${deletePopup ? style.active : ""}`}
                onClick={() => {
                    setDeletePopup(false);
                    setActiveDots(false);
                }}>
                <div className={style.popup} onClick={(e) => e.stopPropagation()}>
                    <p>
                        Are you sure you want to <span className={style["delete-color"]}>DELETE</span> this category and
                        shoes in it?
                    </p>
                    <div className={style.buttons}>
                        <button
                            onClick={() => {
                                setDeletePopup(false);
                                setActiveDots(false);
                            }}>
                            NO
                        </button>
                        <button onClick={() => deleteBrand()}>YES</button>
                    </div>
                </div>
            </div>
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
                                    <Link onClick={() => setDeletePopup(true)}>Delete</Link>
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
