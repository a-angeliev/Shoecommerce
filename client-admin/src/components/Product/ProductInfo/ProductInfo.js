import style from "./ProductInfo.module.css";
import { ProductInfoRow } from "./ProductInfoRow/ProductInfoRow";

import { useContext, useState, useEffect } from "react";
import { Pagination } from "../../Pagination/Pagination";
import { SearchTable } from "../../SearchTable/SearchTable";
import { ProductContext } from "../../../contexts/ProductsContext";
import { orderByIdFunction, orderByNameFunction } from "../../../utils/utils";
export const ProductInfo = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [numberOfProducts, setNumberOfProducts] = useState(1);
    const [filter, setFilter] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [orderById, setOrderById] = useState(true);
    const [orderByName, setOrderByName] = useState(true);
    const [orderByPrice, setOrderByPrice] = useState(true);

    const { products } = useContext(ProductContext);

    useEffect(() => {
        setNumberOfProducts(products.length);
        setNumberOfPages(Math.ceil(products.length / itemPerPage));
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        if (products !== "") {
            const regexp = new RegExp(filter, "i");
            const prd = products.filter((product) => regexp.test(product.title));
            setFilteredProducts(prd);
            setNumberOfProducts(prd.length);
            setNumberOfPages(Math.ceil(prd.length / itemPerPage));
            setCurrentPage(1);
        }
    }, [filter]);

    useEffect(() => {
        setCurrentPage(1);
        setNumberOfPages(Math.ceil(numberOfProducts / itemPerPage));
    }, [itemPerPage]);

    useEffect(() => {
        orderByIdFunction(products, orderById, setFilteredProducts);
    }, [orderById]);

    useEffect(() => {
        orderByNameFunction(filteredProducts, orderByName, "title", setFilteredProducts);
    }, [orderByName]);

    useEffect(() => {
        const prd = [...products];
        if (orderByPrice) {
            prd.sort((prd1, prd2) => prd1.price - prd2.price);
        } else {
            prd.sort((prd1, prd2) => prd2.price - prd1.price);
        }
        setFilteredProducts(prd);
    }, [orderByPrice]);
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
                                <th className={style["cl-1"]} onClick={() => setOrderById((prev) => !prev)}>
                                    Id <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-2"]}>Img</th>
                                <th className={style["cl-3"]} onClick={() => setOrderByName((prev) => !prev)}>
                                    Name <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-4"]} onClick={() => setOrderByPrice((prev) => !prev)}>
                                    Price <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-5"]}></th>
                            </tr>

                            {filteredProducts
                                .slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage)
                                .map((product) => (
                                    <ProductInfoRow product={product}></ProductInfoRow>
                                ))}
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
