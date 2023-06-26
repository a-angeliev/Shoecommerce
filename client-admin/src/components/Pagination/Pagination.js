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
        <ul className={style["pagination-list"]}>
            <li onClick={prevPage} className={props.currentPage === 1 ? style["non-hover"] : ""}>
                <img className={style.pagImg} src='../images/left-arrow.png'></img>
            </li>

            {props.currentPage === 1 ? (
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
            )}

            <li onClick={nextPage} className={props.currentPage === props.numberOfPages ? style["non-hover"] : ""}>
                <img className={style.pagImg} src='../images/right-arrow.png'></img>
            </li>
        </ul>
    );
};
