import { useEffect, useState } from "react";
import style from "./OrderDetails.module.css";
import * as orderServices from "../../../services/order";
import { useParams } from "react-router-dom";

export const OrderDetails = (props) => {
    const [activeSelect, setActiveSelect] = useState(false);
    const [order, setOrder] = useState("");

    const param = useParams();
    useEffect(() => {
        orderServices
            .getOrderById(param.id)
            .then((res) => {
                setOrder(res);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, []);
    const orderRow = (row) => {
        return (
            <tr>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.pair_color}</td>
                <td>{row.pair_size}</td>
                <td>{row.price} $</td>
            </tr>
        );
    };

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
                            <div className={style["created-on"]}>
                                Created on: {new Date(order.created_on).toDateString()} --{" "}
                                {new Date(order.created_on).toLocaleTimeString("en-US")}
                            </div>
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
                            {order.order_items.map((row) => orderRow(row))}

                            <tr className={style["last-row"]}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total price:</td>
                                <td> {order.total_price}$</td>
                            </tr>
                        </table>
                        <dir className={style["meta-data-bottom"]}>
                            <div className={style["order-meta-information"]}>
                                <div>User Id: {order.user_id}</div>
                                <div>Order status: {order.is_shipped}</div>
                                <div>Shipped on: {order.shipped_on == null ? "none" : order.shipped_on}</div>
                            </div>
                            <div className={style["text-div"]}>
                                Comment: {order.comment == "" ? "-----------" : order.comment}
                            </div>
                        </dir>
                    </div>
                </div>
            </div>
        </>
    );
};
