import style from "./SearchTable.module.css";

export const SearchTable = (params) => {
    return (
        <>
            <div className={style["search-pag"]}>
                <div className={style.search}>
                    <input
                        name='search'
                        placeholder='Search here...'
                        value={params.filter}
                        onChange={(e) => params.setFilter(e.target.value)}></input>
                    <div className={style["search-btn"]}>
                        <img src='../images/icons8-search-50-white.png' alt='search icon'></img>
                    </div>
                </div>
                <div className={style["per-page"]}>
                    <p>Per Page: </p>
                    <select
                        value={params.itemPerPage}
                        onChange={(e) => {
                            params.setItemPerPage(e.target.value);
                        }}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                    </select>
                </div>
            </div>
        </>
    );
};
