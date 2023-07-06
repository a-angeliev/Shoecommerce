import style from "./ProductPairsRow.module.css";

export const ProductPairsRow = () => {
    return (
        <>
            <tr className={style.tr}>
                <td className={style["cl-1"]}>1</td>
                <td className={style["cl-2"]}>gray</td>
                <td className={style["cl-3"]}>25</td>
                <td className={style["cl-4"]}>3</td>
                <td className={style["cl-5"]}>
                    <img className={style["trash-img"]} src='../images/add.png'></img>
                </td>
            </tr>
        </>
    );
};
