import { useParams } from "react-router-dom";
import style from "./ProductDetail.module.css";
import { useEffect, useState } from "react";

import * as productServices from "../../../services/product";
import { ProductForm } from "../ProductForm/ProductForm";

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
                        {/* <div>
                            <form>
                                <div className={style["shoe-name"]}>
                                    <h2>Shoe Information</h2>
                                    <div className={style["deleted-div"]}>
                                        <label htmlFor='deleted'>Is deleted: </label>
                                        <input className={style.deleted} name='deleted' type='checkbox'></input>
                                    </div>
                                </div>
                                <label htmlFor='title'>Title</label>
                                <input name='title'></input>
                                <div className={style["price-gender"]}>
                                    <div className={style["group-div"]}>
                                        <label htmlFor='price'>Price:</label>
                                        <div className={style.combine}>
                                            <input className={style.price} name='price'></input>
                                            <p id={style.dollar}> $</p>
                                        </div>
                                    </div>
                                    <div className={style["group-div"]}>
                                        <label htmlFor='gender'>Gender:</label>
                                        <div className={style.combine}>
                                            <select className={style.gender} name='gender'>
                                                <option>man</option>
                                                <option>women</option>
                                                <option>kid</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={style["category-brand"]}>
                                    <div className={style["group-div"]}>
                                        <label htmlFor='category'>Category:</label>
                                        <div className={style.combine}>
                                            <select className={style.category} name='category'></select>
                                        </div>
                                    </div>
                                    <div className={style["group-div"]}>
                                        <label htmlFor='brand'>Brand:</label>
                                        <div className={style.combine}>
                                            <select className={style.brand} name='brand'></select>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor='description'>Description</label>
                                <textarea className={style.description} name='description'></textarea>

                                <button>Submit</button>
                            </form>
                        </div> */}

                        <ProductForm></ProductForm>
                    </div>
                    <div className={style["product-pairs"]}>asd</div>
                </div>
            </div>
        </>
    );
};
