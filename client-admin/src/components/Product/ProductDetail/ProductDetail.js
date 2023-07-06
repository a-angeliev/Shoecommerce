import { useParams } from "react-router-dom";
import style from "./ProductDetail.module.css";
import { useEffect, useState } from "react";

import * as productServices from "../../../services/product";
import { ProductForm } from "../ProductForm/ProductForm";
import { ProductPairs } from "../ProductPairs/ProductPairs";

export const ProductDetail = () => {
    const [shoe, setShoe] = useState("");
    const [shoeImages, setShoeImages] = useState([]);
    const [paris, setPairs] = useState([]);

    const param = useParams();

    useEffect(() => {
        productServices
            .getProductById(param.id)
            .then((res) => {
                console.log(JSON.parse(res));
            })
            .catch((err) => console.log(err));
    }, [param.id]);

    return (
        <>
            <div className={style["detail-component"]}>
                <h1> Product Information</h1>
                <div className={style["product-content"]}>
                    <div className={style["product-info"]}>
                        <ProductForm></ProductForm>
                    </div>
                    <div className={style["product-pairs"]}>
                        <ProductPairs></ProductPairs>
                    </div>
                </div>
            </div>
        </>
    );
};
