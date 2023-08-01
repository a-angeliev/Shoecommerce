import { useEffect, useState } from "react";

import style from "./ProductCreatePairs.module.css";

export const ProductCreatePairs = (props) => {
    const [rowsNumber, setRowsNumber] = useState(1);
    const [row, setRow] = useState([{ color: "black", size: "", quantity: "" }]);

    useEffect(() => {
        setRowsNumber(row.length);
        props.setPairData(row);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row]);

    const inputHandler = (e, i, key, func = null) => {
        const rowCopy = [...row];
        const pair = rowCopy[i];
        if (func) {
            pair[`${key}`] = func(e.target.value);
        } else {
            pair[`${key}`] = e.target.value;
        }
        rowCopy[i] = pair;
        setRow(rowCopy);
    };

    const addRow = () => {
        const rowCopy = [...row];
        rowCopy.push({ color: "black", size: "", quantity: "" });
        setRow(rowCopy);
    };

    const removeRow = () => {
        const rowCopy = [...row];
        rowCopy.pop();
        setRow(rowCopy);
    };

    const newRow = (x, i) => {
        return (
            <>
                <div className={style.row}>
                    <div className={style["add-container"]}>
                        <form className={style.form}>
                            <div className={style["section-div"]}>
                                <label htmlFor={`color-${i}`}>Color:</label>
                                <select
                                    className={style.select}
                                    name={`color-${i}`}
                                    onChange={(e) => inputHandler(e, i, "color")}
                                    value={x.color}>
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
                                <label htmlFor={`size-${i}`}>Size:</label>
                                <input
                                    className={style.input}
                                    name={`size-${i}`}
                                    type='number'
                                    onChange={(e) => inputHandler(e, i, "size", Number)}
                                    value={x.size}></input>
                            </div>

                            <div className={style["input-div"]}>
                                <label htmlFor={`quantity-${i}`}>Quantity:</label>
                                <input
                                    className={style.input}
                                    name={`quantity-${i}`}
                                    type='number'
                                    onChange={(e) => inputHandler(e, i, "quantity", Number)}
                                    value={x.quantity}></input>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className={style.content}>
                {row.map((x, i) => newRow(x, i))}

                <div className={style["button-row"]}>
                    <img onClick={addRow} src='../images/add.png' alt='add button'></img>
                    {rowsNumber > 1 ? (
                        <img onClick={removeRow} src='../images/remove.png' alt='remove button'></img>
                    ) : null}
                </div>
            </div>
        </>
    );
};
