import style from "./BrandEdit.module.css";

import * as brandService from "../../../services/brand";
import { BrandForm } from "../BrandForm/BrandForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const BrandEdit = () => {
    const [brand, setBrand] = useState("");
    const params = useParams();
    console.log(params.id);
    // useEffect(() => {
    //     const brand = brandService
    //         .getBrandById(params.id)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);
    return (
        <>
            <BrandForm title='Edit' job='edit'></BrandForm>
        </>
    );
};
