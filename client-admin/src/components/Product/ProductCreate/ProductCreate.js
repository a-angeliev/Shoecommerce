import style from "./ProductCreate.module.css";
import { ProductCreateForm } from "./ProductCreateForm/ProductCreateForm";
import { ProductCreatePairs } from "./ProductCreatePairs/ProductCreatePairs";
import { ProductCreateUrls } from "./ProductCreateUrls/ProductCreateUrls";
import { Alert } from "../../Alert/Alert";

import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../../contexts/AlertContext";

import * as productServices from "../../../services/product";

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

    const isInputValid = () => {
        if (
            mainData.title.length < 2 ||
            mainData.price < 0 ||
            mainData.price > 10000 ||
            mainData.gender.length < 2 ||
            mainData.category_title.length < 2 ||
            mainData.brand_name.length < 2 ||
            mainData.description.length < 2
        ) {
            setAlert({ color: "red", text: "You have empty fields in main shoe information" });
            return false;
        } else if (
            urlData.url1.length < 3 ||
            urlData.url2.length < 3 ||
            urlData.url3.length < 3 ||
            urlData.url4.length < 3 ||
            urlData.url5.length < 3 ||
            urlData.url6.length < 3 ||
            urlData.url7.length < 3
        ) {
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
            console.log(pairData);
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
            console.log(data);
            productServices
                .create(data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
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
