import style from "./BrandForm.module.css";

import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as brandService from "../../../services/brand";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../../contexts/AlertContext";
import { Alert } from "../../Alert/Alert";

export const BrandForm = (params) => {
    const [brandInput, setBrandInput] = useState({ name: "", "logo-url": "", description: "" });
    const [nameValidation, setNameValidation] = useState("");
    const [logoValidation, setLogoValidation] = useState("");
    const [descValidation, setDescValidation] = useState("");
    const { alert, setAlert } = useContext(AlertContext);
    const param = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (params.brand !== "" && params.brand !== undefined) {
            const brand = JSON.parse(params.brand);
            setBrandInput({
                name: brand.name,
                "logo-url": brand["logo_url"],
                description: brand.description,
            });
        }
    }, [params.brand]);

    const inputHandler = (e) => {
        const data = { ...brandInput };
        data[e.target.name] = e.target.value;
        setBrandInput(data);
        validate();
    };

    const validate = () => {
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
            console.log(params);
            if (params.job === "edit") {
                const edit = brandService
                    .editBrandById(param.id, brandData)
                    .then((res) => {
                        setAlert({ color: "green", text: "You Successful edit the Brand" });
                        navigate("/brand/information");
                    })
                    .catch((err) => {
                        setAlert({ color: "red", text: err.message });
                    });
            } else if (params.job === "create") {
                const brand = brandService
                    .createBrand(brandData)
                    .then((res) => {
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
            <Alert></Alert>
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
