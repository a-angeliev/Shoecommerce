import { useContext, useState } from "react";
import style from "./ProductPairs.module.css";
import { ProductPairsRow } from "./ProductPairsRow/ProductPairsRow";

import * as productService from "../../../services/product";
import { useParams } from "react-router-dom";
import { AlertContext } from "../../../contexts/AlertContext";
import { Alert } from "../../Alert/Alert";

export const ProductPairs = (props) => {
    const [add, setAdd] = useState(false);
    const [color, setColor] = useState("black");
    const [size, setSize] = useState(30);
    const [quantity, setQuantity] = useState(0);

    const param = useParams();

    const { setAlert } = useContext(AlertContext);

    const validateInput = () => {
        if (20 < size < 60 && 0 <= quantity < 10000 && color.length > 0) {
            return true;
        }
        if (size < 20 || size > 60) {
            setAlert({ color: "red", text: "The size must be between 20 and 60" });
            return false;
        } else if (quantity < 0 || quantity >= 10000) {
            setAlert({ color: "red", text: "The quantity must be between 0 and 10000" });
            return false;
        } else {
            setAlert({ color: "red", text: "Choose color" });
            return false;
        }
    };

    const isExist = () => {
        const check = props.pairs.map((pair) => (pair.color == color && pair.size == size ? true : false));
        console.log(check);
        if (check.includes(true)) {
            setAlert({ color: "red", text: "That pair already exist" });
            return false;
        }
        return true;
    };

    const onSubmit = () => {
        if (validateInput() && isExist()) {
            productService
                .addProductPair(param.id, { size: size, color: color, quantity: quantity })
                .then((res) => {
                    setAlert({ color: "green", text: "You successful add new pair" });
                    setAdd(false);
                    props.setReload((prev) => !prev);
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
    };

    return (
        <>
            <div className={style.content}>
                <div className={style["pairs-title"]}>
                    <h2>Product Pairs</h2>
                    {add ? null : (
                        <button className={style["add-button"]} onClick={() => setAdd(true)}>
                            Add
                        </button>
                    )}
                </div>

                {add ? (
                    <div className={style["add-container"]}>
                        <form className={style.form}>
                            <div className={style["section-div"]}>
                                <label htmlFor='color'>Color:</label>
                                <select
                                    className={style.select}
                                    name='color'
                                    onChange={(e) => setColor(e.target.value)}
                                    value={color}>
                                    <option key='black'>black</option>
                                    <option key='white'>white</option>
                                    <option key='green'>green</option>
                                    <option key='red'>red</option>
                                    <option key='brown'>brown</option>
                                    <option key='gray'>gray</option>
                                    <option key='blue'>blue</option>
                                    <option key='pink'>pink</option>
                                </select>
                            </div>

                            <div className={style["input-div"]}>
                                <label htmlFor='size'>Size:</label>
                                <input
                                    className={style.input}
                                    name='size'
                                    type='number'
                                    onChange={(e) => setSize(e.target.value)}
                                    value={size}></input>
                            </div>

                            <div className={style["input-div"]}>
                                <label htmlFor='quantity'>Quantity:</label>
                                <input
                                    className={style.input}
                                    name='quantity'
                                    type='number'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}></input>
                            </div>

                            <img
                                alt='accept button'
                                className={style.accept}
                                src='../images/accept.png'
                                onClick={onSubmit}></img>
                            <img
                                alt='remove button'
                                className={style.remove}
                                src='../images/remove.png'
                                onClick={() => setAdd(false)}></img>
                        </form>
                    </div>
                ) : null}

                <div className={style.table}>
                    <table>
                        <tr className={style["tr-title"]}>
                            <th className={style["cl-1"]}>Id</th>
                            <th className={style["cl-2"]}>Color</th>
                            <th className={style["cl-3"]}>Size</th>
                            <th className={style["cl-4"]}>Quantity</th>
                            <th className={style["cl-4"]}></th>
                        </tr>
                        {props.pairs.map((pair) => (
                            <ProductPairsRow pair={pair}></ProductPairsRow>
                        ))}
                        {/* <ProductPairsRow></ProductPairsRow> */}
                        {/* <ProductPairsRow></ProductPairsRow> */}
                        {/* <ProductPairsRow></ProductPairsRow> */}
                        {/* <ProductPairsRow></ProductPairsRow> */}
                    </table>
                </div>
            </div>
        </>
    );
};
