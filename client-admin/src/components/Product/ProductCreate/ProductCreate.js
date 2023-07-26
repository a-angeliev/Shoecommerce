import style from "./ProductCreate.module.css";
import { ProductCreateForm } from "./ProductCreateForm/ProductCreateForm";
import { ProductCreatePairs } from "./ProductCreatePairs/ProductCreatePairs";
import { ProductCreateUrls } from "./ProductCreateUrls/ProductCreateUrls";

import { useEffect, useState } from "react";

export const ProductCreate = () => {
    return (
        <>
            <div className={style["create-content"]}>
                <div className={style["content-div"]}>
                    <h1>Create product</h1>
                    <div className={style.content}>
                        <div className={style.form}>
                            <ProductCreateForm></ProductCreateForm>
                        </div>
                        <div className={style.urls}>
                            <ProductCreateUrls></ProductCreateUrls>
                        </div>
                        <div className={style.pairs}>
                            <ProductCreatePairs></ProductCreatePairs>
                        </div>
                    </div>
                </div>
                <button className={style.submit}>Create</button>
            </div>
        </>
    );
};
