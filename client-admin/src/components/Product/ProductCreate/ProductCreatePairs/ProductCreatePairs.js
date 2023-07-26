import { useState } from "react";
import style from "./ProductCreatePairs.module.css";

export const ProductCreatePairs = () => {
    const [color, setColor] = useState();
    const [size, setSize] = useState();
    const [quantity, setQuantity] = useState();

    return (
        <>
            <div className={style.content}>
                <div className={style.row}>
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
                        </form>
                    </div>
                </div>

                <div className={style.row}>
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
                        </form>
                    </div>
                </div>
                <div className={style.row}>
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
                        </form>
                    </div>
                </div>
                <div className={style.row}>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
