/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import { AlertContext } from "../../../contexts/AlertContext";
import { orderByIdFunction, orderByNameFunction } from "../../../utils/utils";
import { OrderInfoRow } from "./OrderInfoRow/OrderInfoRow";
import { Pagination } from "../../Pagination/Pagination";
import { SearchTable } from "../../SearchTable/SearchTable";
import * as OrderServices from "../../../services/order";

import style from "./OrderInfo.module.css";

export const OrderInfo = () => {
    const { setAlert } = useContext(AlertContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [numberOfOrders, setNumberOfOrders] = useState(0);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState("");
    const [orderById, setOrderById] = useState(false);
    const [orderByStatus, setOrderByStatus] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderServices.getAllOrders()
            .then((allOrders) => {
                setOrders(JSON.parse(allOrders));
                setFilteredOrders(JSON.parse(allOrders));
                const numOfOrd = JSON.parse(allOrders).length;
                setNumberOfPages(Math.ceil(numOfOrd / itemPerPage));
                setNumberOfOrders(numOfOrd);
            })
            .catch((err) => setAlert({ color: "red", text: err }));
    }, []);

    useEffect(() => {
        if (orders !== []) {
            const regexp = new RegExp(filter, "i");
            const ord = orders.filter((ord) => regexp.test(ord.id));
            setFilteredOrders(ord);
        }
    }, [filter]);

    useEffect(() => {
        setCurrentPage(1);
        setNumberOfPages(Math.ceil(numberOfOrders / itemPerPage));
    }, [itemPerPage]);

    useEffect(() => {
        orderByIdFunction(orders, orderById, setFilteredOrders);
    }, [orderById]);

    useEffect(() => {
        orderByNameFunction(orders, orderByStatus, "is_shipped", setFilteredOrders);
    }, [orderByStatus]);

    return (
        <>
            <div className={style["order-context"]}>
                <div className={style.context}>
                    <h1>Order Info</h1>
                    <div className={style["order-table"]}>
                        <div className={style.search}>
                            <SearchTable
                                filter={filter}
                                setFilter={setFilter}
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}></SearchTable>
                        </div>
                        <table className={style.table}>
                            <thead>
                                <tr className={style["tr-head"]}>
                                    <th className={style["cl-1"]} onClick={() => setOrderById((prev) => !prev)}>
                                        Id{" "}
                                        <img
                                            className={style["sort-icon"]}
                                            src='../images/sort.png'
                                            alt='sort icon'></img>
                                    </th>
                                    <th className={style["cl-2"]}>Created on</th>
                                    <th className={style["cl-3"]} onClick={() => setOrderByStatus((prev) => !prev)}>
                                        Status{" "}
                                        <img
                                            className={style["sort-icon"]}
                                            src='../images/sort.png'
                                            alt='sort icon'></img>
                                    </th>
                                    <th className={style["cl-4"]}>Shipped on</th>
                                    <th className={style["cl-5"]}>Price</th>
                                    <th className={style["cl-6"]}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders
                                    .slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage)
                                    .map((order) => (
                                        <OrderInfoRow key={order.id} order={order} />
                                    ))}
                            </tbody>
                        </table>
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            numberOfItems={numberOfOrders}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
