import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { Alert } from "../../../Alert/Alert";
import { AlertContext } from "../../../../contexts/AlertContext";
import * as brandService from "../../../../services/brand";

import style from "./BrandInfoRow.module.css";

export const BrandInfoRow = (props) => {
    const { setAlert } = useContext(AlertContext);

    const [activeDots, setActiveDots] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const navigate = useNavigate();

    const brand = props.brand;

    const expandDots = () => {
        setActiveDots((prev) => !prev);
    };

    const deleteBrand = () => {
        const deletese = brandService
            .deleteBrandById(brand.id)
            .then((res) => {
                props.reset((prev) => !prev);
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
                        Are you sure you want to <span className={style["delete-color"]}>DELETE</span> brand and all
                        shoes in this brand?
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
                                    <Link to={`/brand/edit/${brand.id}`}>Edit</Link>
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
