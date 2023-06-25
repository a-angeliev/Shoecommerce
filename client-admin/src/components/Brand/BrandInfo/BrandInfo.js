import style from "./BrandInfo.module.css";
import * as brandService from "../../../services/brand";
import { useState } from "react";
import { useEffect } from "react";
import { BrandInfoRow } from "./BrandInfoRow/BrandInfoRow";

export const BrandInfo = () => {
    const [brands, setBrands] = useState("");
    const [filter, setFilter] = useState("");
    const [filteredBrands, setFilteredBrands] = useState("");
    const [orderById, setOrderById] = useState(true);

    useEffect(() => {
        brandService
            .getAllBrands()
            .then((res) => {
                setBrands(res);
                setFilteredBrands(res);
            })
            .catch((err) => console.log(err));
    }, []);

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
                    </div>
                    <div className={style.table}>
                        <table>
                            <tr className={style["tr-title"]}>
                                <th className={style["cl-1"]} onClick={() => setOrderById((prev) => !prev)}>
                                    Id
                                </th>
                                <th className={style["cl-2"]}>Name</th>
                                <th className={style["cl-3"]}>Description</th>
                                <th className={style["cl-4"]}>Logo</th>
                            </tr>

                            {filteredBrands.map((brand) => (
                                <BrandInfoRow brand={brand}></BrandInfoRow>
                            ))}
                        </table>
                    </div>
                    <div className={style.pag}>asasd</div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};
