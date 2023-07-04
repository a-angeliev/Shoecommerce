import style from "./CategoryInfo.module.css";
import { CategoryInfoRow } from "./CategoryInfoRow/CategoryInfoRow";

import { AlertContext } from "../../../contexts/AlertContext";
import { Alert } from "../../Alert/Alert";
import { Pagination } from "../../Pagination/Pagination";
import * as categoryServices from "../../../services/category";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SearchTable } from "../../SearchTable/SearchTable";

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
    }, []);

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
        const cat = [...categories];
        if (orderById) {
            cat.sort((c1, c2) => c2.id - c1.id);
        } else {
            cat.sort((c1, c2) => c1.id - c2.id);
        }
        setFilteredCategories(cat);
    }, [orderById]);

    useEffect(() => {
        const cat = [...categories];
        if (orderByTitle) {
            cat.sort((c1, c2) => {
                const textA = c1.title.toUpperCase();
                const textB = c2.title.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
        } else {
            cat.sort((c1, c2) => {
                const textA = c1.title.toUpperCase();
                const textB = c2.title.toUpperCase();
                return textA > textB ? -1 : textA < textB ? 1 : 0;
            });
        }
        setFilteredCategories(cat);
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
                                    <CategoryInfoRow category={category}></CategoryInfoRow>
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
