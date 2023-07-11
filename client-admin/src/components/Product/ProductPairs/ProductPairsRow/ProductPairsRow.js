import style from "./ProductPairsRow.module.css";

export const ProductPairsRow = (params) => {
    return (
        <>
            <tr className={style.tr}>
                <td className={style["cl-1"]}>{params.pair.id}</td>
                <td className={style["cl-2"]}>{params.pair.color}</td>
                <td className={style["cl-3"]}>{params.pair.size}</td>
                <td className={style["cl-4"]}>{params.pair.quantity}</td>
                <td className={style["cl-5"]}>
                    <img className={style["trash-img"]} src='../images/add.png'></img>
                </td>
            </tr>
        </>
    );
};
