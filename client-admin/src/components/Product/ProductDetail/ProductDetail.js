import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductForm } from "../ProductForm/ProductForm";
import { ProductImages } from "../ProductImages/ProductImages";
import { ProductPairs } from "../ProductPairs/ProductPairs";
import * as productServices from "../../../services/product";

import style from "./ProductDetail.module.css";

export const ProductDetail = () => {
    const [shoe, setShoe] = useState("");
    const [shoeImages, setShoeImages] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [reload, setReload] = useState(false);

    const param = useParams();

    useEffect(() => {
        productServices
            .getProductById(param.id)
            .then((res) => {
                const shoe = JSON.parse(res);
                setShoe(shoe);
                if (shoe.images !== undefined) {
                    setShoeImages(shoe.images);
                }
                if (shoe.pairs !== undefined) {
                    setPairs(shoe.pairs);
                }
            })
            .catch((err) => console.log(err));
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
