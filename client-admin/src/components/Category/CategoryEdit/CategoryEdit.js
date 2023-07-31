import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import { CategoryForm } from "../CategoryForm/CategoryForm";
import * as categoryService from "../../../services/category";

import style from "./CategoryEdit.module.css";

export const CategoryEdit = () => {
    const { setAlert } = useContext(AlertContext);
    const [category, setCategory] = useState("");
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [title, setTitle] = useState("");
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        categoryService
            .getCategoryById(param.id)
            .then((res) => setCategory(res))
            .catch((err) => setAlert({ color: "red", text: err.message }));
    }, []);

    useEffect(() => {
        if (category !== "") {
            setTitle(category.title);
        }
    }, [category]);

    const validate = () => {
        if (title.length > 3) {
            setIsValidTitle(true);
            return true;
        }
        setIsValidTitle(false);
        return false;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            categoryService
                .editCategory(param.id, { title: title })
                .then((res) => {
                    setAlert({ color: "green", text: "You successful edit the Category!" });
                    navigate("/category/information");
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
    };
    return (
        <>
            <Alert></Alert>
            <div className={style["edit-container"]}>
                <div className={style.content}>
                    <h1>Edit</h1>
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
