import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import { BrandForm } from "../BrandForm/BrandForm";
import * as brandService from "../../../services/brand";

import style from "./BrandEdit.module.css";

export const BrandEdit = () => {
    const { setAlert } = useContext(AlertContext);

    const [brand, setBrand] = useState("");

    const params = useParams();

    useEffect(() => {
        brandService
            .getBrandById(params.id)
            .then((res) => {
                setBrand(res);
            })
            .catch((err) => {
                setAlert({ color: "red", text: err.message });
            });
    }, []);

    return (
        <>
            <Alert></Alert>
            <BrandForm brand={brand} title='Edit' job='edit'></BrandForm>
        </>
    );
};
