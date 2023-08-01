import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { AlertContext } from "../../../contexts/AlertContext";
import * as brandService from "../../../services/brand";

import style from "./BrandForm.module.css";

export const BrandForm = (params) => {
    const { setAlert } = useContext(AlertContext);

    const [brandInput, setBrandInput] = useState({ name: "", "logo-url": "", description: "" });
    const [nameValidation, setNameValidation] = useState("");
    const [logoValidation, setLogoValidation] = useState("");
    const [descValidation, setDescValidation] = useState("");

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.brand !== "" && params.brand !== undefined) {
            const brand = params.brand;
            setBrandInput({
                name: brand.name,
                "logo-url": brand["logo_url"],
                description: brand.description,
            });
        }
    }, [params.brand]);

    const validate = () => {
        const validateLengthHelper = (input, len, func) => {
            if (input.length < len) {
                func(false);
                console.log(123);
            } else {
                console.log(123);

                func(true);
            }
        };

        validateLengthHelper(brandInput["name"], 2, setNameValidation);
        validateLengthHelper(brandInput["logo-url"], 5, setLogoValidation);
        validateLengthHelper(brandInput["description"], 2, setDescValidation);
    };

    const checkValidation = () => {
        if (nameValidation && logoValidation && descValidation) return true;
        return false;
    };

    const inputHandler = (e) => {
        const data = { ...brandInput };
        data[e.target.name] = e.target.value;
        setBrandInput(data);
        validate();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (checkValidation()) {
            const brandData = {
                name: brandInput.name,
                logo_url: brandInput["logo-url"],
                description: brandInput.description,
            };
            if (params.job === "edit") {
                brandService
                    .editBrandById(param.id, brandData)
                    .then((_) => {
                        setAlert({ color: "green", text: "You Successful edit the Brand" });
                        navigate("/brand/information");
                    })
                    .catch((err) => {
                        setAlert({ color: "red", text: err.message });
                    });
            } else if (params.job === "create") {
                brandService
                    .createBrand(brandData)
                    .then((_) => {
                        setAlert({ color: "green", text: "You Successful Create the Brand" });
                        navigate("/brand/information");
                    })
                    .catch((err) => {
                        setAlert({ color: "red", text: err.message });
                    });
            }
        }
    };

    return (
        <>
            <div className={style["page-content"]}>
                <div className={style.wrapper}>
                    <h1>{params.title}</h1>
                    <div className={style.container}>
                        <div className={style["form-title"]}>
                            <h2>Brand Form</h2>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className={style.form}>
                                <label htmlFor='name'>Name</label>
                                <input
                                    className={nameValidation === true ? "" : style.error}
                                    name='name'
                                    id='name'
                                    type='text'
                                    placeholder='Nike'
                                    onChange={(e) => inputHandler(e)}
                                    value={brandInput.name}></input>
                                <label htmlFor='logo-url'>Logo URL</label>
                                <input
                                    className={logoValidation === true ? "" : style.error}
                                    name='logo-url'
                                    id='logo-url'
                                    type='url'
                                    placeholder='https://www.img.com'
                                    onChange={(e) => inputHandler(e)}
                                    value={brandInput["logo-url"]}></input>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    placeholder='This is description!'
                                    name='description'
                                    id='description'
                                    className={`${style.description}  ${descValidation === true ? "" : style.error} `}
                                    onChange={(e) => inputHandler(e)}
                                    value={brandInput.description}
                                    type='textarea'></textarea>
                                <button name='button'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
