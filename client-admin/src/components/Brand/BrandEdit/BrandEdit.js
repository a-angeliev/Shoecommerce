import style from "./BrandEdit.module.css";
import { BrandForm } from "../BrandForm/BrandForm";

export const BrandEdit = () => {
    return (
        <>
            <div className={style.edit}>
                <div className={style.form}>
                    <h1>Edit</h1>
                    <BrandForm></BrandForm>
                </div>
            </div>
        </>
    );
};
