import style from "./BrandInfo.module.css";
import * as brandService from "../../../services/brand";
import { useState } from "react";
import { useEffect } from "react";
import { BrandInfoRow } from "./BrandInfoRow/BrandInfoRow";
import { Pagination } from "../../Pagination/Pagination";

export const BrandInfo = () => {
    const [brands, setBrands] = useState("");
    const [filter, setFilter] = useState("");
    const [filteredBrands, setFilteredBrands] = useState("");
    const [orderById, setOrderById] = useState(true);
    const [orderByName, setOrderByName] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [numberOfBrands, setNumberOfBrands] = useState(1);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        brandService
            .getAllBrands()
            .then((res) => {
                setBrands(res);
                setNumberOfBrands(res.length);
                setFilteredBrands(res);
            })
            .catch((err) => console.log(err));
    }, [reset]);

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfBrands / itemPerPage));
    }, [brands]);

    useEffect(() => {
        if (brands !== "") {
            const regexp = new RegExp(filter, "i");
            const br = brands.filter((brand) => regexp.test(brand.name));
            setFilteredBrands(br);
        }
    }, [filter]);

    useEffect(() => {
        const br = [...brands];
        if (orderById) {
            br.sort((br1, br2) => br2.id - br1.id);
        } else {
            br.sort((br1, br2) => br1.id - br2.id);
        }
        setFilteredBrands(br);
    }, [orderById]);

    useEffect(() => {
        const br = [...brands];
        if (orderByName) {
            br.sort((br1, br2) => {
                const textA = br1.name.toUpperCase();
                const textB = br2.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
        } else {
            br.sort((br1, br2) => {
                const textA = br1.name.toUpperCase();
                const textB = br2.name.toUpperCase();
                return textA > textB ? -1 : textA < textB ? 1 : 0;
            });
        }
        setFilteredBrands(br);
    }, [orderByName]);

    useEffect(() => {
        setCurrentPage(1);
        setNumberOfPages(Math.ceil(numberOfBrands / itemPerPage));
    }, [itemPerPage]);
    if (filteredBrands !== "") {
        return (
            <div className={style.content}>
                <div className={style.title}>
                    <h1>Brand Information</h1>
                </div>
                <div className={style["table-content"]}>
                    <div className={style["search-pag"]}>
                        <div className={style.search}>
                            <input
                                name='search'
                                placeholder='Search here...'
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}></input>
                            <div className={style["search-btn"]}>
                                <img src='../images/icons8-search-50-white.png'></img>
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
                    </div>
                    <div className={style.table}>
                        <table>
                            <tr className={style["tr-title"]}>
                                <th
                                    className={`${style["cl-1"]} ${style.link}`}
                                    onClick={() => setOrderById((prev) => !prev)}>
                                    Id <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th
                                    className={`${style["cl-2"]} ${style.link}`}
                                    onClick={() => setOrderByName((prev) => !prev)}>
                                    Name <img className={style["sort-icon"]} src='../images/sort.png'></img>
                                </th>
                                <th className={style["cl-3"]}>Description</th>
                                <th className={style["cl-4"]}>Logo</th>
                                <th className={style["cl-5"]}></th>
                            </tr>

                            {filteredBrands
                                .slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage)
                                .map((brand) => (
                                    <BrandInfoRow brand={brand} reset={setReset}></BrandInfoRow>
                                ))}
                        </table>
                    </div>
                    <div className={style.pag}>
                        <div className={style.pagination}>
                            <Pagination
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                numberOfPages={numberOfPages}></Pagination>
                        </div>
                        <div className={style["item-info"]}>
                            Showing{" "}
                            {currentPage * itemPerPage - Number(itemPerPage) == 0
                                ? 1
                                : currentPage * itemPerPage - Number(itemPerPage)}{" "}
                            to {currentPage * itemPerPage > numberOfBrands ? numberOfBrands : currentPage * itemPerPage}{" "}
                            of {numberOfBrands} entries
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};
