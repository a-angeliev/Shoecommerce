import style from "./Pagination.module.css";

export const Pagination = (props) => {
    const changePage = (e) => {
        props.setCurrentPage(Number(e.target.innerText));
    };

    const prevPage = () => {
        if (props.currentPage > 1) {
            props.setCurrentPage((prev) => prev - 1);
        }
    };

    const nextPage = () => {
        if (props.currentPage < props.numberOfPages) {
            props.setCurrentPage((prev) => prev + 1);
        }
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
                    {props.currentPage * props.itemPerPage - Number(props.itemPerPage) === 0
                        ? 1
                        : props.currentPage * props.itemPerPage - Number(props.itemPerPage)}{" "}
                    to{" "}
                    {props.currentPage * props.itemPerPage > props.numberOfItems
                        ? props.numberOfItems
                        : props.currentPage * props.itemPerPage}{" "}
                    of {props.numberOfItems} entries
                </div>
            </div>
        </>
    );
};
