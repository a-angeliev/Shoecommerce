import { SearchTable } from "../../SearchTable/SearchTable";
import style from "./OrderInfo.module.css";
import { OrderInfoRow } from "./OrderInfoRow/OrderInfoRow";
import * as OrderServices from "../../../services/order";
import { useEffect, useState } from "react";
import { Pagination } from "../../Pagination/Pagination";
export const OrderInfo = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderServices.getAllOrders()
            .then((res) => setOrders(JSON.parse(res)))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div className={style["order-context"]}>
                <div className={style.context}>
                    <h1>Order Info</h1>
                    <div className={style["order-table"]}>
                        <div className={style.search}>
                            <SearchTable></SearchTable>
                        </div>
                        <table className={style.table}>
                            <tr className={style["tr-head"]}>
                                <th className={style["cl-1"]}>Id</th>
                                <th className={style["cl-2"]}>Created on</th>
                                <th className={style["cl-3"]}>Status</th>
                                <th className={style["cl-4"]}>Shipped on</th>
                                <th className={style["cl-5"]}>Price</th>
                                <th className={style["cl-6"]}></th>
                            </tr>
                            {orders.map((order) => (
                                <OrderInfoRow order={order} />
                            ))}

                            {/* <OrderInfoRow></OrderInfoRow>
                            <OrderInfoRow></OrderInfoRow>
                            <OrderInfoRow></OrderInfoRow>
                            <OrderInfoRow></OrderInfoRow> */}
                        </table>
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    );
};
