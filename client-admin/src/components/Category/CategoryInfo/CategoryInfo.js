import style from "./CategoryInfo.module.css";
import { CategoryInfoRow } from "./CategoryInfoRow/CategoryInfoRow";

import { AlertContext } from "../../../contexts/AlertContext";
import { Alert } from "../../Alert/Alert";
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

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        categoryServices
            .getAllCategories()
            .then((res) => {
                setCategories(res);
                setFilteredCategories(res);
            })
            .catch((err) => setAlert({ color: "red", text: err.message }));
    }, []);

    useEffect(() => {
        if (categories !== []) {
            const regexp = new RegExp(filter, "i");
            const cat = categories.filter((cat) => regexp.test(cat.title));
            setFilteredCategories(cat);
        }
    }, [filter]);

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
                                <th className={style["cl-1"]}>
                                    Id <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-2"]}>
                                    Title <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-3"]}>asd</th>
                            </tr>

                            {filteredCategories.map((category) => (
                                <CategoryInfoRow category={category}></CategoryInfoRow>
                            ))}
                        </table>
                    </div>
                    <div className={style["pag-section"]}>Pagination section</div>
                </div>
            </div>
        </>
    );
};
