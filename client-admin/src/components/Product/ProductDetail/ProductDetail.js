import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AlertContext } from "../../../contexts/AlertContext";
import { ProductForm } from "../ProductForm/ProductForm";
import { ProductImages } from "../ProductImages/ProductImages";
import { ProductPairs } from "../ProductPairs/ProductPairs";
import * as productServices from "../../../services/product";

import style from "./ProductDetail.module.css";

export const ProductDetail = () => {
    const { setAlert } = useContext(AlertContext);

    const [shoe, setShoe] = useState("");
    const [shoeImages, setShoeImages] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [reload, setReload] = useState(false);

    const param = useParams();

    useEffect(() => {
        productServices
            .getProductById(param.id)
            .then((product) => {
                const shoeJson = JSON.parse(product);
                setShoe(shoeJson);
                if (shoeJson.images !== undefined) setShoeImages(shoeJson.images);
                if (shoeJson.pairs !== undefined) setPairs(shoeJson.pairs);
            })
            .catch((err) => setAlert({ color: "red", text: err.message }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    return (
        <>
            <div className={style["detail-component"]}>
                <h1> Product Information</h1>
                <div className={style["product-content"]}>
                    <div className={style["product-info"]}>
                        <ProductForm shoe={shoe}></ProductForm>
                        <ProductImages images={shoeImages} setReload={setReload} reload={reload}></ProductImages>
                    </div>
                    <div className={style["product-pairs"]}>
                        <ProductPairs pairs={pairs} setReload={setReload}></ProductPairs>
                    </div>
                </div>
            </div>
        </>
    );
};
