import style from "./ProductInfo.module.css";
import { ProductInfoRow } from "./ProductInfoRow/ProductInfoRow";

import { useState } from "react";
import { Pagination } from "../../Pagination/Pagination";
import { SearchTable } from "../../SearchTable/SearchTable";

export const ProductInfo = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [numberOfProducts, setNumberOfProducts] = useState(6);
    const [filter, setFilter] = useState("");

    return (
        <>
            <div className={style["page-content"]}>
                <div className={style["content"]}>
                    <h1>Products Information</h1>
                    <div className={style["table-content"]}>
                        <SearchTable
                            filter={filter}
                            setFilter={setFilter}
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}></SearchTable>
                        <table>
                            <tr className={style["tr-title"]}>
                                <th className={style["cl-1"]}>Id</th>
                                <th className={style["cl-2"]}>Img</th>
                                <th className={style["cl-3"]}>Name</th>
                                <th className={style["cl-4"]}>Price</th>
                                <th className={style["cl-5"]}></th>
                            </tr>

                            <ProductInfoRow></ProductInfoRow>
                            <ProductInfoRow></ProductInfoRow>
                            <ProductInfoRow></ProductInfoRow>
                        </table>
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            itemPerPage={itemPerPage}
                            numberOfItems={numberOfProducts}></Pagination>
                    </div>
                </div>
            </div>
        </>
    );
};
