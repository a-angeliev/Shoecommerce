import style from "./CategoryCreate.module.css";

import { CategoryForm } from "../CategoryForm/CategoryForm";
import * as categoryService from "../../../services/category";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";

export const CategoryCreate = () => {
    const [title, setTitle] = useState("");
    const [isValidTitle, setIsValidTitle] = useState(true);
    const { setAlert } = useContext(AlertContext);
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
                .then((res) => {
                    setAlert({ color: "green", text: "You successful create Category" });
                    navigate("/category/information");
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
    };

    return (
        <>
            <Alert></Alert>
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
