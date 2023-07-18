import { useState } from "react";
import style from "./OrderDetails.module.css";

export const OrderDetails = (props) => {
    const [activeSelect, setActiveSelect] = useState(false);

    return (
        <>
            <div className={style["details-content"]}>
                <div className={style.content}>
                    <h1>Order Details</h1>
                    <div className={style["table-content"]}>
                        <div className={style["change-status"]}>
                            <select className={style.select} disabled={activeSelect ? false : true}>
                                <option>pending</option>
                                <option>shipped</option>
                                <option>rejected</option>
                            </select>
                            {activeSelect ? (
                                <img
                                    src='../images/accept.png'
                                    alt='accept button'
                                    onClick={() => setActiveSelect(false)}></img>
                            ) : (
                                <img
                                    src='../images/add.png'
                                    alt='add button'
                                    onClick={() => setActiveSelect(true)}></img>
                            )}
                        </div>
                        <div className={style["meta-data"]}>
                            <div className={style["created-on"]}>Created on: 12-23-2023 -- 12;23</div>
                            <div className={style["order-id"]}>Order Id: 2</div>
                        </div>
                        <table className={style.table}>
                            <tr>
                                <th className={style["cl-1"]}>Product Id</th>
                                <th className={style["cl-2"]}>Name</th>
                                <th className={style["cl-3"]}>Color</th>
                                <th className={style["cl-4"]}>Size</th>
                                <th className={style["cl-5"]}>Price</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Adidas shoe</td>
                                <td>black</td>
                                <td>35</td>
                                <td>199.99$</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Adidas shoe</td>
                                <td>black</td>
                                <td>35</td>
                                <td>199.99$</td>
                            </tr>
                            <tr className={style["last-row"]}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total price:</td>
                                <td> 399.99$</td>
                            </tr>
                        </table>
                        <dir className={style["meta-data-bottom"]}>
                            <div className={style["order-meta-information"]}>
                                <div>User Id: 10</div>
                                <div>Order status: pending</div>
                                <div>Shipped on: none</div>
                            </div>
                            <div className={style["text-div"]}>Comment: The delivery should after 10am!</div>
                        </dir>
                    </div>
                </div>
            </div>
        </>
    );
};
