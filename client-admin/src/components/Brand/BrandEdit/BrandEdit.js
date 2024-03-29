import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AlertContext } from "../../../contexts/AlertContext";
import { BrandForm } from "../BrandForm/BrandForm";

import * as brandService from "../../../services/brand";

export const BrandEdit = () => {
    const { setAlert } = useContext(AlertContext);

    const [brand, setBrand] = useState("");

    const params = useParams();

    useEffect(() => {
        brandService
            .getBrandById(params.id)
            .then((brandStr) => {
                setBrand(JSON.parse(brandStr));
            })
            .catch((err) => {
                setAlert({ color: "red", text: err.message });
            });
    }, []);

    return (
        <>
            <BrandForm brand={brand} title='Edit' job='edit'></BrandForm>
        </>
    );
};
