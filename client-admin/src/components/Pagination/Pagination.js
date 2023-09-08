import { useEffect, useState } from "react";
import style from "./Pagination.module.css";
import { useNavigate } from "react-router-dom";

export const Pagination = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const [itemPerPageStatic, setItemPerPageStatic] = useState();
    const [currentPageStatic, setCurrentPageStatic] = useState();

    // useEffect(() => {
    //     window.history.replaceState(
    //         "http://localhost:3000/products/information",
    //         "",
    //         "?curPage=" + 1 + "&perPage=" + 5
    //     );
    // }, []);

    useEffect(() => {
        const urlCurrentPage = Number(queryParameters.get("curPage"));
        const urlItemPerPage = Number(queryParameters.get("perPage"));
        if (urlCurrentPage !== currentPageStatic && urlCurrentPage != 0 && urlCurrentPage !== undefined) {
            props.setCurrentPage(urlCurrentPage);
        }

        if (urlItemPerPage !== itemPerPageStatic && urlItemPerPage != 0 && urlItemPerPage !== undefined) {
            props.setItemPerPage(urlItemPerPage);
        }
    }, [queryParameters]);

    useEffect(() => {
        setItemPerPageStatic(props.itemPerPage);
        setCurrentPageStatic(props.currentPage);
        const urlItemPerPage = Number(queryParameters.get("perPage"));
        const urlCurrentPage = Number(queryParameters.get("curPage"));
        if (urlItemPerPage != props.itemPerPage || urlCurrentPage != props.currentPage) {
            navigate("?curPage=" + props.currentPage + "&perPage=" + props.itemPerPage);
        }
    }, [props.currentPage, props.itemPerPage]);

    const changePage = (e) => {
        props.setCurrentPage(Number(e.target.innerText));
    };

    const prevPage = () => {
        // if (props.currentPage > 1) props.setCurrentPage((prev) => prev - 1);
        if (props.currentPage > 1) props.setCurrentPage((prev) => prev - 1);
    };

    const nextPage = () => {
        // if (props.currentPage < props.numberOfPages) props.setCurrentPage((prev) => prev + 1);
        if (props.currentPage < props.numberOfPages) props.setCurrentPage((prev) => prev + 1);
    };

    return (
        <>
            <div className={style["pagination-content"]}>
                <ul className={style["pagination-list"]}>
                    <li onClick={prevPage} className={props.currentPage === 1 ? style["non-hover"] : ""}>
                        <img className={style.pagImg} src='../images/left-arrow.png' alt='arrow icon'></img>
                    </li>
                    {props.numberOfPages > 3 ? (
                        props.currentPage === 1 ? (
                            <>
                                <li onClick={(e) => changePage(e)} className={style.active}>
                                    1
                                </li>
                                <li onClick={(e) => changePage(e)}>2</li>
                                <li onClick={(e) => changePage(e)}>3</li>
                            </>
                        ) : props.currentPage === props.numberOfPages ? (
                            <>
                                <li onClick={(e) => changePage(e)}>{props.numberOfPages - 2}</li>
                                <li onClick={(e) => changePage(e)}>{props.numberOfPages - 1}</li>
                                <li onClick={(e) => changePage(e)} className={style.active}>
                                    {props.numberOfPages}
                                </li>
                            </>
                        ) : (
                            <>
                                <li onClick={(e) => changePage(e)}>{props.currentPage - 1}</li>
                                <li onClick={(e) => changePage(e)} className={style.active}>
                                    {props.currentPage}
                                </li>
                                <li onClick={(e) => changePage(e)}>{props.currentPage + 1}</li>
                            </>
                        )
                    ) : (
                        [...Array(props.numberOfPages)].map((x, i) => (
                            <li
                                onClick={(e) => changePage(e)}
                                className={props.currentPage === i + 1 ? style.active : ""}
                                key={i + 1}>
                                {i + 1}
                            </li>
                        ))
                    )}

                    <li
                        onClick={nextPage}
                        className={props.currentPage === props.numberOfPages ? style["non-hover"] : ""}>
                        <img className={style.pagImg} src='../images/right-arrow.png' alt='arrow icon'></img>
                    </li>
                </ul>

                <div className={style["item-info"]}>
                    Showing{" "}
                    {props.currentPage * itemPerPageStatic - Number(itemPerPageStatic) === 0
                        ? 1
                        : props.currentPage * itemPerPageStatic - Number(itemPerPageStatic)}{" "}
                    to{" "}
                    {props.currentPage * itemPerPageStatic > props.numberOfItems
                        ? props.numberOfItems
                        : props.currentPage * itemPerPageStatic}{" "}
                    of {props.numberOfItems} entries
                </div>
            </div>
        </>
    );
};
