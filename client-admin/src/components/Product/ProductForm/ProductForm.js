import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import * as brandServices from "../../../services/brand";
import * as categoryServices from "../../../services/category";
import * as productServices from "../../../services/product";

import style from "./ProductForm.module.css";

export const ProductForm = (params) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState("");
    const [gender, setGender] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [edit, setEdit] = useState(false);

    const p = useParams();
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        brandServices
            .getAllBrands()
            .then((res) => {
                setBrands(res.map((brand) => brand.name));
            })
            .catch((err) => setAlert({ color: "red", text: err.messages }));
        categoryServices
            .getAllCategories()
            .then((res) => {
                setCategories(res.map((cat) => cat.title));
            })
            .catch((err) => setAlert({ color: "red", text: err.messages }));
        if (params.shoe) {
            setTitle(params.shoe.title);
            setPrice(params.shoe.price);
            setDescription(params.shoe.description);
            setIsDeleted(params.shoe["is_deleted"]);
            setGender(params.shoe.gender);
            setBrand(params.shoe.brand.name);
            setCategory(params.shoe.category.title);
        }
    }, [params.shoe]);

    const submit = (e) => {
        e.preventDefault();
        if (edit) {
            productServices
                .editBaseById(p.id, {
                    title,
                    description,
                    price,
                    gender,
                    brand_name: brand,
                    category_title: category,
                    discount: 0,
                    is_deleted: isDeleted,
                })
                .then((res) => {
                    setAlert({ color: "green", text: "You successful edit product base information!" });
                })
                .catch((err) => {
                    setAlert({ color: "green", text: "You successful edit product base information!" });
                });
            setEdit(false);
        } else {
            setEdit(true);
        }
    };
    return (
        <>
            <Alert />
            <div className={style["form-background"]}>
                <form className={style["form"]}>
                    <div className={style["shoe-name"]}>
                        <h2>Shoe Information</h2>
                        <div className={style["deleted-div"]}>
                            <label htmlFor='deleted'>Is deleted: </label>
                            <input
                                className={style.deleted}
                                name='deleted'
                                type='checkbox'
                                onChange={() => setIsDeleted((prev) => !prev)}
                                checked={isDeleted}
                                disabled={edit ? null : true}></input>
                        </div>
                    </div>
                    <label htmlFor='title'>Title</label>
                    <input
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={edit ? null : true}
                        value={title}></input>
                    <div className={style["input-group"]}>
                        <div className={style["group-div"]}>
                            <label htmlFor='price'>Price:</label>
                            <div className={style.combine}>
                                <input
                                    className={`${style.price} ${style.input}`}
                                    name='price'
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    type='number'
                                    disabled={edit ? null : true}></input>
                                <p id={style.dollar}> $</p>
                            </div>
                        </div>
                        <div className={style["group-div"]}>
                            <label htmlFor='gender'>Gender:</label>
                            <div className={style.combine}>
                                <select
                                    className={`${style["select-menu"]} ${style.input}`}
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    name='gender'
                                    disabled={edit ? null : true}>
                                    <option key='1' value='man'>
                                        man
                                    </option>
                                    <option key='2' value='woman'>
                                        woman
                                    </option>
                                    <option key='3' value='kid'>
                                        kid
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={style["input-group"]}>
                        <div className={style["group-div"]}>
                            <label htmlFor='category'>Category:</label>
                            <div className={style.combine}>
                                <select
                                    className={`${style["select-menu"]} ${style.input}`}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    name='category'
                                    disabled={edit ? null : true}>
                                    {categories.map((cat) => (
                                        <option key={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={style["group-div"]}>
                            <label htmlFor='brand'>Brand:</label>
                            <div className={style.combine}>
                                <select
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className={`${style["select-menu"]} ${style.input}`}
                                    name='brand'
                                    disabled={edit ? null : true}>
                                    {brands.map((brand) => (
                                        <option key={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <label htmlFor='description'>Description</label>
                    <textarea
                        className={style.description}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name='description'
                        disabled={edit ? null : true}></textarea>

                    <button onClick={submit}>{edit ? "Save" : "Edit"}</button>
                </form>
            </div>
        </>
    );
};
