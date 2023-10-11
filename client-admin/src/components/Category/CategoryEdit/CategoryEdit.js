import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AlertContext } from "../../../contexts/AlertContext";
import { CategoryForm } from "../CategoryForm/CategoryForm";
import * as categoryService from "../../../services/category";

import style from "./CategoryEdit.module.css";

export const CategoryEdit = () => {
    const { setAlert } = useContext(AlertContext);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(null);
    const [isValidTitle, setIsValidTitle] = useState(true);

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        categoryService
            .getCategoryById(param.id)
            .then((category) => setCategory(JSON.parse(category)))
            .catch((err) => setAlert({ color: "red", text: err.message }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (category) setTitle(category.title);
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
                .then((_) => {
                    setAlert({ color: "green", text: "You successfully edited the category!" });
                    navigate("/category/information");
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
    };
    return (
        <>
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
