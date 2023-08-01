import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert } from "../../../Alert/Alert";
import { AlertContext } from "../../../../contexts/AlertContext";
import * as productServices from "../../../../services/product";

import style from "./ProductPairsRow.module.css";
import { outsideRange } from "../../../../utils/utils";

export const ProductPairsRow = (params) => {
    const { setAlert } = useContext(AlertContext);

    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState(0);

    const param = useParams();

    useEffect(() => {
        setInput(params.pair.quantity);
    }, [params.pair.quantity]);

    const validateInput = () => {
        if (outsideRange(input, 0, 10000)) {
            setAlert({ color: "red", text: "Quantity must be between 0 and 10000" });
            return false;
        }
        return true;
    };
    const onSubmit = () => {
        if (validateInput()) {
            productServices
                .editProductPair(param.id, params.pair.id, { quantity: input })
                .then((_) => {
                    setAlert({ color: "green", text: "You successful edit the pair" });
                    setEdit(false);
                })
                .catch((err) => {
                    setAlert({ color: "red", text: err.message });
                });
        }
    };

    return (
        <>
            <Alert />
            <tr className={style.tr}>
                <td className={style["cl-1"]}>{params.pair.id}</td>
                <td className={style["cl-2"]}>{params.pair.color}</td>
                <td className={style["cl-3"]}>{params.pair.size}</td>
                <td className={style["cl-4"]}>
                    {edit ? (
                        <input
                            className={style.input}
                            type='number'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                    ) : (
                        `${input}`
                    )}
                </td>
                <td className={style["cl-5"]}>
                    {edit ? (
                        <img
                            className={style["trash-img"]}
                            onClick={onSubmit}
                            src='../images/accept.png'
                            alt='accept img'></img>
                    ) : (
                        <img
                            className={style["trash-img"]}
                            onClick={() => setEdit(true)}
                            alt='accept img'
                            src='../images/add.png'></img>
                    )}
                </td>
            </tr>
        </>
    );
};
