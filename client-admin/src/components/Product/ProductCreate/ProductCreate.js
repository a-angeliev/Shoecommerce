import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertContext } from "../../../contexts/AlertContext";
import { ProductCreateForm } from "./ProductCreateForm/ProductCreateForm";
import { ProductCreatePairs } from "./ProductCreatePairs/ProductCreatePairs";
import { ProductCreateUrls } from "./ProductCreateUrls/ProductCreateUrls";
import { validateLengthArray, outsideRange } from "../../../utils/utils";
import * as productServices from "../../../services/product";

import style from "./ProductCreate.module.css";

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
            outsideRange(mainData.price, 0, 10000) ||
            validateLengthArray(
                [mainData.title, mainData.gender, mainData.category_title, mainData.brand_name, mainData.description],
                2,
                "<"
            )
        ) {
            setAlert({ color: "red", text: "You have empty fields or wrong value in main shoe information" });
            return false;
        } else if (validateLengthArray(Object.values(urlData), 3, "<")) {
            setAlert({ color: "red", text: "You have empty fields in image urls section" });
            return false;
        } else if (
            pairData
                .map((x) => {
                    return !(x.color.length < 2 || outsideRange(x.size, 10, 70) || outsideRange(x.quantity, 0, 100));
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

    const createProduct = () => {
        const productData = {
            ...mainData,
            images: Object.values(urlData),
            pairs: [...pairData],
        };
        if (isInputValid()) {
            productServices
                .create(productData)
                .then((product) => {
                    navigate(`/product/${JSON.parse(product).id}`);
                    setAlert({ color: "green", text: "You create product successful" });
                })
                .catch((err) => {
                    setAlert({ color: "red", text: err.message });
                });
        }
    };
    return (
        <>
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
