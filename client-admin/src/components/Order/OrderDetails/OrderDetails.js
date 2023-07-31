import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import * as orderServices from "../../../services/order";

import style from "./OrderDetails.module.css";

export const OrderDetails = (props) => {
    const { setAlert } = useContext(AlertContext);

    const [activeSelect, setActiveSelect] = useState(false);
    const [statusInput, setStatusInput] = useState("pending");
    const [order, setOrder] = useState({
        order_address: [
            {
                address_1: "",
                address_2: "",
                city: "",
                country: "",
                post_code: "",
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
            },
        ],
        order_items: [],
    });

    const param = useParams();

    useEffect(() => {
        orderServices
            .getOrderById(param.id)
            .then((res) => {
                console.log(res);
                setOrder(res);
                setStatusInput(res.is_shipped);
            })
            .catch((err) => setAlert({ color: "red", text: err }));
    }, []);

    const changeOrder = () => {
        orderServices
            .changeOrderStatus(param.id, { status: statusInput })
            .then((res) => {
                setOrder(JSON.parse(res));
                setStatusInput(JSON.parse(res).is_shipped);
                setAlert({ color: "green", text: "Change order status successful!" });
            })
            .catch((err) => setAlert({ color: "red", text: err }));
        setActiveSelect(false);
    };

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
            <Alert></Alert>
            <div className={style["details-content"]}>
                <div className={style.content}>
                    <h1>Order Details</h1>
                    <div className={style["table-content"]}>
                        <div className={style["change-status"]}>
                            <select
                                className={style.select}
                                disabled={activeSelect ? false : true}
                                value={statusInput}
                                onChange={(e) => setStatusInput(e.target.value)}>
                                <option>pending</option>
                                <option>shipped</option>
                                <option>rejected</option>
                            </select>
                            {activeSelect ? (
                                <img src='../images/accept.png' alt='accept button' onClick={() => changeOrder()}></img>
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
                        <div className={style["address-div"]}>
                            <div className={style["address-cl1"]}>
                                <p className={style["address-p"]}>Address 1: {order.order_address[0].address_1}</p>
                                <p className={style["address-p"]}>Address 2: {order.order_address[0].address_2}</p>
                                <p className={style["address-p"]}>City: {order.order_address[0].city}</p>
                            </div>
                            <div className={style["address-cl2"]}>
                                <p className={style["address-p"]}>Country: {order.order_address[0].country}</p>
                                <p className={style["address-p"]}>Post code: {order.order_address[0].post_code}</p>
                                <p className={style["address-p"]}>Email: {order.order_address[0].email}</p>
                            </div>
                            <div className={style["address-cl3"]}>
                                <p className={style["address-p"]}>First name: {order.order_address[0].first_name}</p>
                                <p className={style["address-p"]}>Last name: {order.order_address[0].last_name}</p>
                                <p className={style["address-p"]}>Phone: {order.order_address[0].phone}</p>
                            </div>
                        </div>
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
