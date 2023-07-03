import style from "./BrandForm.module.css";

import { useState } from "react";

import * as brandService from "../../../services/brand";
import { useNavigate } from "react-router-dom";

export const BrandForm = (params) => {
    const [brandInput, setBrandInput] = useState({ name: "", "logo-url": "", description: "" });
    const [nameValidation, setNameValidation] = useState("");
    const [logoValidation, setLogoValidation] = useState("");
    const [descValidation, setDescValidation] = useState("");

    const navigate = useNavigate();

    const inputHandler = (e) => {
        const data = { ...brandInput };
        data[e.target.name] = e.target.value;
        setBrandInput(data);
        validate();
    };

    const validate = () => {
        console.log(brandInput);
        if (brandInput["name"].length <= 2) {
            setNameValidation(false);
        } else {
            setNameValidation(true);
        }
        if (brandInput["logo-url"].length < 5) {
            setLogoValidation(false);
        } else {
            setLogoValidation(true);
        }
        if (brandInput["description"].length <= 2) {
            setDescValidation(false);
        } else {
            setDescValidation(true);
        }
    };

    const checkValidation = () => {
        if (nameValidation && logoValidation && descValidation) {
            return true;
        }
        return false;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (checkValidation()) {
            const brandData = {
                name: brandInput.name,
                logo_url: brandInput["logo-url"],
                description: brandInput.description,
            };

            const brand = brandService
                .createBrand(brandData)
                .then((res) => {
                    console.log(res);
                    navigate("/brand/information");
                })
                .then((err) => console.log(err));
        }
    };

    return (
        <>
            <div className={style["page-content"]}>
                <div className={style.wrapper}>
                    <h1>{params.title}</h1>
                    <div className={style.container}>
                        <div className={style.title}>
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
                                    onChange={(e) => inputHandler(e)}
                                    value={brandInput.name}></input>
                                <label htmlFor='logo-url'>Logo URL</label>
                                <input
                                    className={logoValidation === true ? "" : style.error}
                                    name='logo-url'
                                    id='logo-url'
                                    type='url'
                                    onChange={(e) => inputHandler(e)}
                                    value={brandInput["logo-url"]}></input>
                                <label htmlFor='description'>Description</label>
                                <textarea
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
