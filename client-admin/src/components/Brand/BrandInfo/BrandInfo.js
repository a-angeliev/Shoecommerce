/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useState } from "react";

import { BrandInfoRow } from "./BrandInfoRow/BrandInfoRow";
import { orderByIdFunction, orderByNameFunction } from "../../../utils/utils";
import { Pagination } from "../../Pagination/Pagination";
import { AlertContext } from "../../../contexts/AlertContext";
import * as brandService from "../../../services/brand";

import style from "./BrandInfo.module.css";
import { SearchTable } from "../../SearchTable/SearchTable";

export const BrandInfo = () => {
    const { setAlert } = useContext(AlertContext);

    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState("");
    const [reset, setReset] = useState(false);
    const [orderById, setOrderById] = useState(true);
    const [orderByName, setOrderByName] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [numberOfBrands, setNumberOfBrands] = useState(1);

    useEffect(() => {
        brandService
            .getAllBrands()
            .then((brands) => {
                const brandsJson = JSON.parse(brands);
                setBrands(brandsJson);
                setNumberOfBrands(brandsJson.length);
                setFilteredBrands(brandsJson);
            })
            .catch((err) => setAlert({ color: "red", text: err }));
    }, [reset]);

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfBrands / itemPerPage));
    }, [brands]);

    useEffect(() => {
        const regexp = new RegExp(filter, "i");
        const filtered = brands.filter((brand) => regexp.test(brand.name));
        setFilteredBrands(filtered);
    }, [filter]);

    useEffect(() => {
        orderByIdFunction(brands, orderById, setFilteredBrands);
    }, [orderById]);

    useEffect(() => {
        orderByNameFunction(brands, orderByName, "name", setFilteredBrands);
    }, [orderByName]);

    useEffect(() => {
        setCurrentPage(1);
        setNumberOfPages(Math.ceil(numberOfBrands / itemPerPage));
    }, [itemPerPage]);

    return (
        <div className={style.content}>
            <div className={style.title}>
                <h1>Brand Information</h1>
            </div>
            <div className={style["table-content"]}>
                {/* <div className={style["search-pag"]}>
                    <div className={style.search}>
                        <input
                            name='search'
                            placeholder='Search here...'
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}></input>
                        <div className={style["search-btn"]}>
                            <img src='../images/icons8-search-50-white.png' alt='arrow icon'></img>
                        </div>
                    </div>
                    <div className={style["per-page"]}>
                        <p>Per Page: </p>
                        <select
                            value={itemPerPage}
                            onChange={(e) => {
                                setItemPerPage(e.target.value);
                            }}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                    </div>
                </div> */}
                <SearchTable
                    filter={filter}
                    setFilter={setFilter}
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}></SearchTable>
                <div className={style.table}>
                    <table>
                        <thead>
                            <tr className={style["tr-title"]}>
                                <th
                                    className={`${style["cl-1"]} ${style.link}`}
                                    onClick={() => setOrderById((prev) => !prev)}>
                                    Id{" "}
                                    <img className={style["sort-icon"]} src='../images/sort.png' alt='sort icon'></img>
                                </th>
                                <th
                                    className={`${style["cl-2"]} ${style.link}`}
                                    onClick={() => setOrderByName((prev) => !prev)}>
                                    Name{" "}
                                    <img className={style["sort-icon"]} src='../images/sort.png' alt='sort icon'></img>
                                </th>
                                <th className={style["cl-3"]}>Description</th>
                                <th className={style["cl-4"]}>Logo</th>
                                <th className={style["cl-5"]}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrands
                                .slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage)
                                .map((brand) => (
                                    <BrandInfoRow key={brand.id} brand={brand} reset={setReset}></BrandInfoRow>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
                numberOfItems={numberOfBrands}></Pagination>
        </div>
    );
};
