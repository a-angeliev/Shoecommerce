import { CategoryForm } from "../CategoryForm/CategoryForm";
import style from "./CategoryEdit.module.css";

import * as categoryService from "../../../services/category";

import { useEffect, useState } from "react";

export const CategoryEdit = () => {
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [title, setTitle] = useState("");

    useEffect(() => {}, []);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(123);
    };
    return (
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
    );
};
