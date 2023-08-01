/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AlertContext } from "../../../contexts/AlertContext";
import { orderByIdFunction, orderByNameFunction, orderByNumberFunction, outsideRange } from "../../../utils/utils";
import { ProductPairsRow } from "./ProductPairsRow/ProductPairsRow";
import * as productService from "../../../services/product";

import style from "./ProductPairs.module.css";

export const ProductPairs = (props) => {
    const { setAlert } = useContext(AlertContext);

    const [add, setAdd] = useState(false);
    const [color, setColor] = useState("black");
    const [size, setSize] = useState(30);
    const [quantity, setQuantity] = useState(0);
    const [orderedPairs, setOrderedPairs] = useState([]);
    const [orderById, setOrderById] = useState(false);
    const [orderByColor, setOrderByColor] = useState(false);
    const [orderBySize, setOrderBySize] = useState(false);
    const [orderByQuantity, setOrderByQuantity] = useState(false);

    const param = useParams();

    useEffect(() => {
        orderByIdFunction(props.pairs, orderById, setOrderedPairs);
    }, [props.pairs]);

    useEffect(() => {
        orderByIdFunction(orderedPairs, orderById, setOrderedPairs);
    }, [orderById]);

    useEffect(() => {
        orderByNameFunction(orderedPairs, orderByColor, "color", setOrderedPairs);
    }, [orderByColor]);

    useEffect(() => {
        orderByNumberFunction(orderedPairs, orderBySize, "size", setOrderedPairs);
    }, [orderBySize]);

    useEffect(() => {
        orderByNumberFunction(orderedPairs, orderByQuantity, "quantity", setOrderedPairs);
    }, [orderByQuantity]);

    const alertWithReturn = (text) => {
        setAlert({ color: "red", text: text });
        return false;
    };

    const validateInput = () => {
        if (20 < size < 60 && 0 <= quantity <= 10000 && color.length > 0) return true;

        if (outsideRange(size, 20, 70)) {
            alertWithReturn("The size must be between 20 and 70");
        } else if (outsideRange(quantity, 0, 10000)) {
            alertWithReturn("The quantity must be between 0 and 10000");
        } else {
            alertWithReturn("Choose color");
        }
    };

    const isExist = () => {
        const check = props.pairs.map((pair) => (pair.color === color && pair.size === size ? true : false));
        if (check.includes(true)) alertWithReturn("That pair already exist");
        return true;
    };

    const onSubmit = () => {
        if (validateInput() && isExist()) {
            productService
                .addProductPair(param.id, { size: size, color: color, quantity: quantity })
                .then((_) => {
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
                    <table className={style["pair-table"]}>
                        <tr className={style["tr-title"]}>
                            <th className={style["cl-1"]} onClick={() => setOrderById((prev) => !prev)}>
                                Id <img className={style["sort-icon"]} alt='sort icon' src='../images/sort.png'></img>
                            </th>
                            <th className={style["cl-2"]} onClick={() => setOrderByColor((prev) => !prev)}>
                                Color{" "}
                                <img className={style["sort-icon"]} alt='sort icon' src='../images/sort.png'></img>
                            </th>
                            <th className={style["cl-3"]} onClick={() => setOrderBySize((prev) => !prev)}>
                                Size <img className={style["sort-icon"]} alt='sort icon' src='../images/sort.png'></img>
                            </th>
                            <th className={style["cl-4"]} onClick={() => setOrderByQuantity((prev) => !prev)}>
                                Quantity{" "}
                                <img className={style["sort-icon"]} alt='sort icon' src='../images/sort.png'></img>
                            </th>
                            <th className={style["cl-4"]}></th>
                        </tr>
                        {orderedPairs.map((pair) => (
                            <ProductPairsRow pair={pair}></ProductPairsRow>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
};
