import style from "./ProductPairs.module.css";
import { ProductPairsRow } from "./ProductPairsRow/ProductPairsRow";

export const ProductPairs = () => {
    return (
        <>
            <div className={style.content}>
                <div className={style["pairs-title"]}>
                    <h2>Product Pairs</h2>
                    <button className={style["add-button"]}>Add</button>
                </div>

                <div className={style["add-container"]}>
                    <form className={style.form}>
                        <div className={style["section-div"]}>
                            <label htmlFor='color'>Color:</label>
                            <select className={style.select} name='color'>
                                <option>green</option>
                                <option>red</option>
                                <option>blue</option>
                            </select>
                        </div>

                        <div className={style["input-div"]}>
                            <label htmlFor='size'>Size:</label>
                            <input className={style.input} name='size'></input>
                        </div>

                        <div className={style["input-div"]}>
                            <label htmlFor='quantity'>Quantity:</label>
                            <input className={style.input} name='quantity'></input>
                        </div>

                        <img className={style.accept} src='../images/accept.png'></img>
                        <img className={style.remove} src='../images/remove.png'></img>
                    </form>
                </div>
                <div className={style.table}>
                    <table>
                        <tr className={style["tr-title"]}>
                            <th className={style["cl-1"]}>Id</th>
                            <th className={style["cl-2"]}>Color</th>
                            <th className={style["cl-3"]}>Size</th>
                            <th className={style["cl-4"]}>Quantity</th>
                            <th className={style["cl-4"]}></th>
                        </tr>

                        <ProductPairsRow></ProductPairsRow>
                        <ProductPairsRow></ProductPairsRow>
                        <ProductPairsRow></ProductPairsRow>
                        <ProductPairsRow></ProductPairsRow>
                        <ProductPairsRow></ProductPairsRow>
                    </table>
                </div>
            </div>
        </>
    );
};
