import style from "./ProductCreate.module.css";
import { ProductCreateForm } from "./ProductCreateForm/ProductCreateForm";
import { ProductCreatePairs } from "./ProductCreatePairs/ProductCreatePairs";
import { ProductCreateUrls } from "./ProductCreateUrls/ProductCreateUrls";
import { Alert } from "../../Alert/Alert";

import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../../contexts/AlertContext";

import * as productServices from "../../../services/product";
import { validateLengthArray } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

export const ProductCreate = () => {
    const { setAlert } = useContext(AlertContext);
    const [mainData, setMainData] = useState({
        title: "",
        price: "",
        gender: "",
        category_title: "",
        brand_name: "",
        description: "",
        discount: 0,
    });
    const [urlData, setUrlData] = useState({ url1: "", url2: "", url3: "", url4: "", url5: "", url6: "", url7: "" });
    const [pairData, setPairData] = useState({ color: "", size: "", quantity: "" });
    const navigate = useNavigate();

    const isInputValid = () => {
        if (
            mainData.price < 0 ||
            mainData.price > 10000 ||
            validateLengthArray(
                [mainData.title, mainData.gender, mainData.category_title, mainData.brand_name, mainData.description],
                2,
                "<"
            )
        ) {
            setAlert({ color: "red", text: "You have empty fields in main shoe information" });
            return false;
        } else if (validateLengthArray(Object.values(urlData), 3, "<")) {
            setAlert({ color: "red", text: "You have empty fields in image urls section" });
            return false;
        } else if (
            pairData
                .map((x) => {
                    if (x.color.length < 2 || 10 > x.size || x.size > 70 || 0 > x.quantity || x.quantity > 100) {
                        return false;
                    }
                    return true;
                })
                .includes(false)
        ) {
            setAlert({
                color: "red",
                text: "You have empty fields in pair section or incorrect number of size or quantity. Size must be between 10 and 70. The quantity myst be between 0 and 100.",
            });
            return false;
        }
        return true;
    };

    const createProduct = (e) => {
        e.preventDefault();
        const data = {
            ...mainData,
            images: Object.values(urlData),
            pairs: [...pairData],
        };
        if (isInputValid()) {
            productServices
                .create(data)
                .then((res) => {
                    console.log();
                    navigate(`/product/${JSON.parse(res).id}`);
                    setAlert({ color: "green", text: "You create product successful" });
                })
                .catch((err) => setAlert({ color: "red", text: err }));
        }
    };
    return (
        <>
            <Alert></Alert>
            <div className={style["create-content"]}>
                <div className={style["content-div"]}>
                    <h1>Create product</h1>
                    <div className={style.content}>
                        <div className={style.form}>
                            <ProductCreateForm setMainData={setMainData}></ProductCreateForm>
                        </div>
                        <div className={style.urls}>
                            <ProductCreateUrls urlData={urlData} setUrlData={setUrlData}></ProductCreateUrls>
                        </div>
                        <div className={style.pairs}>
                            <ProductCreatePairs setPairData={setPairData}></ProductCreatePairs>
                        </div>
                    </div>
                </div>
                <button onClick={createProduct} className={style.submit}>
                    Create
                </button>
            </div>
        </>
    );
};
