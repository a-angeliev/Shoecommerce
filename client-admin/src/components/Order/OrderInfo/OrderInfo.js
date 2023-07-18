import { SearchTable } from "../../SearchTable/SearchTable";
import style from "./OrderInfo.module.css";
import { OrderInfoRow } from "./OrderInfoRow/OrderInfoRow";
import * as OrderServices from "../../../services/order";
import { useEffect, useState } from "react";
import { Pagination } from "../../Pagination/Pagination";
import { orderByIdFunction, orderByNumberFunction, orderByNameFunction } from "../../../utils/utils";

export const OrderInfo = () => {
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
            .then((res) => {
                setOrders(JSON.parse(res));
                setFilteredOrders(JSON.parse(res));
                const numOfOrd = JSON.parse(res).length;
                setNumberOfPages(Math.ceil(numOfOrd / itemPerPage));
                setNumberOfOrders(numOfOrd);
            })
            .catch((err) => console.log(err));
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
                            <tr className={style["tr-head"]}>
                                <th className={style["cl-1"]} onClick={() => setOrderById((prev) => !prev)}>
                                    Id <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-2"]}>Created on</th>
                                <th className={style["cl-3"]} onClick={() => setOrderByStatus((prev) => !prev)}>
                                    Status <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-4"]}>Shipped on</th>
                                <th className={style["cl-5"]}>Price</th>
                                <th className={style["cl-6"]}></th>
                            </tr>
                            {filteredOrders.map((order) => (
                                <OrderInfoRow order={order} />
                            ))}
                        </table>
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            itemPerPage={itemPerPage}
                            numberOfItems={numberOfOrders}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
