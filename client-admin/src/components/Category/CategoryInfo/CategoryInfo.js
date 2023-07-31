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
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("");
    const [itemPerPage, setItemPerPage] = useState(5);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [numberOfCategories, setNumberOfCategories] = useState(1);
    const [orderById, setOrderById] = useState(true);
    const [orderByTitle, setOrderByTitle] = useState(true);
    const [reset, setReset] = useState(false);

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        categoryServices
            .getAllCategories()
            .then((res) => {
                setCategories(res);
                setFilteredCategories(res);
                setNumberOfCategories(res.length);
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
                    <h1>Category Information</h1>
                    <SearchTable
                        filter={filter}
                        setFilter={setFilter}
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}></SearchTable>
                    <div className={style["table-section"]}>
                        <table>
                            <tr className={style["tr-title"]}>
                                <th
                                    className={`${style["cl-1"]} ${style.pointer}`}
                                    onClick={() => setOrderById((prev) => !prev)}>
                                    Id <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th
                                    className={`${style["cl-2"]} ${style.pointer}`}
                                    onClick={() => setOrderByTitle((prev) => !prev)}>
                                    Title <img className={style["sort-icon"]} src='../images/sort.png'></img>
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
                            numberOfItems={numberOfCategories}></Pagination>
                    </div>
                </div>
            </div>
        </>
    );
};
