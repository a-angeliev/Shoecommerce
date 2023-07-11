import { useParams } from "react-router-dom";
import style from "./ProductDetail.module.css";
import { useEffect, useState } from "react";

import * as productServices from "../../../services/product";

import { ProductForm } from "../ProductForm/ProductForm";
import { ProductPairs } from "../ProductPairs/ProductPairs";
import { ProductImages } from "../ProductImages/ProductImages";

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
                console.log(shoe, 123);
                if (shoe.images !== undefined) {
                    setShoeImages(shoe.images);
                }
                if (shoe.paris !== undefined) {
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
                        <ProductPairs></ProductPairs>
                    </div>
                </div>
            </div>
        </>
    );
};
