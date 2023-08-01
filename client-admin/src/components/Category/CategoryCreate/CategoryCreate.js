import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertContext } from "../../../contexts/AlertContext";
import { CategoryForm } from "../CategoryForm/CategoryForm";
import * as categoryService from "../../../services/category";

import style from "./CategoryCreate.module.css";

export const CategoryCreate = () => {
    const { setAlert } = useContext(AlertContext);

    const [title, setTitle] = useState("");
    const [isValidTitle, setIsValidTitle] = useState(true);

    const navigate = useNavigate();

    const validateTitle = () => {
        if (title.length > 3) {
            setIsValidTitle(true);
            return true;
        }
        setIsValidTitle(false);
        return false;
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (validateTitle()) {
            categoryService
                .createCategory({ title: title })
                .then((_) => {
                    setAlert({ color: "green", text: "You successful create Category" });
                    navigate("/category/information");
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
    };

    return (
        <>
            <div className={style["create-container"]}>
                <div className={style.content}>
                    <h1>Create</h1>
                    <CategoryForm
                        isValidTitle={isValidTitle}
                        onSubmit={onSubmit}
                        title={title}
                        setTitle={setTitle}></CategoryForm>
                </div>
            </div>
        </>
    );
};
