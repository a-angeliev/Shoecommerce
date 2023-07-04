import style from "./BrandEdit.module.css";

import * as brandService from "../../../services/brand";
import { BrandForm } from "../BrandForm/BrandForm";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AlertContext } from "../../../contexts/AlertContext";
import { Alert } from "../../Alert/Alert";

export const BrandEdit = () => {
    const [brand, setBrand] = useState("");
    const params = useParams();
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        brandService
            .getBrandById(params.id)
            .then((res) => {
                setBrand(res);
            })
            .catch((err) => {
                setAlert({ color: "red", text: err.message });
                console.log(err);
            });
    }, []);

    return (
        <>
            <Alert></Alert>
            <BrandForm brand={brand} title='Edit' job='edit'></BrandForm>
        </>
    );
};
