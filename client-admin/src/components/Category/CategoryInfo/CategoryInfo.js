/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import { CategoryInfoRow } from "./CategoryInfoRow/CategoryInfoRow";
import { orderByIdFunction, orderByNameFunction } from "../../../utils/utils";
import { Pagination } from "../../Pagination/Pagination";
import { SearchTable } from "../../SearchTable/SearchTable";
import * as categoryServices from "../../../services/category";

import style from "./CategoryInfo.module.css";

export const CategoryInfo = () => {
    const { setAlert } = useContext(AlertContext);

    const [reset, setReset] = useState(false);
    const [filter, setFilter] = useState("");
    const [orderById, setOrderById] = useState(true);
    const [categories, setCategories] = useState([]);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderByTitle, setOrderByTitle] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [numberOfCategories, setNumberOfCategories] = useState(1);

    useEffect(() => {
        categoryServices
            .getAllCategories()
            .then((categories) => {
                const jsonCategories = JSON.parse(categories);
                setCategories(jsonCategories);
                setFilteredCategories(jsonCategories);
                setNumberOfCategories(jsonCategories.length);
            })
            .catch((err) => setAlert({ color: "red", text: err.message }));
    }, [reset]);

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfCategories / itemPerPage));
    }, [categories]);

    useEffect(() => {
        if (categories !== []) {
            const regexp = new RegExp(filter, "i");
            const cat = categories.filter((cat) => regexp.test(cat.title));
            setFilteredCategories(cat);
        }
    }, [filter]);

    useEffect(() => {
        setCurrentPage(1);
        setNumberOfPages(Math.ceil(numberOfCategories / itemPerPage));
    }, [itemPerPage]);

    useEffect(() => {
        orderByIdFunction(categories, orderById, setFilteredCategories);
    }, [orderById]);

    useEffect(() => {
        orderByNameFunction(categories, orderByTitle, "title", setFilteredCategories);
    }, [orderByTitle]);

    return (
        <>
            <Alert></Alert>
            <div className={style["category-info-container"]}>
                <div className={style["category-content"]}>
                    <h1 className={style["category-h1"]}>Category Information</h1>
                    <SearchTable
                        filter={filter}
                        setFilter={setFilter}
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}></SearchTable>
                    <div className={style["table-section"]}>
                        <table className={style["category-table"]}>
                            <tr className={style["tr-title"]}>
                                <th
                                    className={`${style["cl-1"]} ${style.pointer}`}
                                    onClick={() => setOrderById((prev) => !prev)}>
                                    Id{" "}
                                    <img className={style["sort-icon"]} src='../images/sort.png' alt='sort icon'></img>
                                </th>
                                <th
                                    className={`${style["cl-2"]} ${style.pointer}`}
                                    onClick={() => setOrderByTitle((prev) => !prev)}>
                                    Title{" "}
                                    <img className={style["sort-icon"]} src='../images/sort.png' alt='sort icon'></img>
                                </th>
                                <th className={style["cl-3"]}></th>
                            </tr>

                            {filteredCategories
                                .slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage)
                                .map((category) => (
                                    <CategoryInfoRow category={category} reset={setReset}></CategoryInfoRow>
                                ))}
                        </table>
                    </div>
                    <div className={style["pag-section"]}>
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            numberOfItems={numberOfCategories}></Pagination>
                    </div>
                </div>
            </div>
        </>
    );
};
