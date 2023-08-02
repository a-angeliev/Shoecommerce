import { useContext, useEffect, useState } from "react";

import { AlertContext } from "../../../../contexts/AlertContext";
import * as brandServices from "../../../../services/brand";
import * as categoryServices from "../../../../services/category";

import style from "./ProductCreateForm.module.css";

export const ProductCreateForm = (props) => {
    const { setAlert } = useContext(AlertContext);

    const [isDeleted, setIsDeleted] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [gender, setGender] = useState("man");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        brandServices
            .getAllBrands()
            .then((allBrands) => {
                setBrands(JSON.parse(allBrands));
                setBrand(JSON.parse(allBrands)[0].name);
            })
            .catch((err) => setAlert({ color: "red", text: err.message }));
        categoryServices
            .getAllCategories()
            .then((alLCategories) => {
                setCategories(JSON.parse(alLCategories));
                setCategory(JSON.parse(alLCategories)[0].title);
            })
            .catch((err) => setAlert({ color: "red", text: err.message }));
    }, []);

    useEffect(() => {
        props.setMainData({
            // isDeleted: isDeleted,
            title: title,
            price: price,
            gender: gender,
            category_title: category,
            brand_name: brand,
            description: description,
            discount: 0,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted, title, price, gender, category, brand, description]);

    return (
        <>
            <div className={style["form-background"]}>
                <form className={style.form}>
                    <div className={style["shoe-name"]}>
                        <h2>Shoe Information</h2>
                        <div className={style["deleted-div"]}>
                            <label htmlFor='deleted'>Is deleted: </label>
                            <input
                                className={style.deleted}
                                name='deleted'
                                type='checkbox'
                                onChange={() => setIsDeleted((prev) => !prev)}
                                checked={isDeleted}></input>
                        </div>
                    </div>
                    <label className={style["title-label"]} htmlFor='title'>
                        Title
                    </label>
                    <input name='title' onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    <div className={style["input-group"]}>
                        <div className={style["group-div"]}>
                            <label htmlFor='price'>Price:</label>
                            <div className={style.combine}>
                                <input
                                    className={`${style.price} ${style.input}`}
                                    name='price'
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    type='number'></input>
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
                                    name='gender'>
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
                                    name='category'>
                                    {categories.map((cat) => (
                                        <option key={cat.title}>{cat.title}</option>
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
                                    name='brand'>
                                    {brands.map((brand) => (
                                        <option key={brand.name}>{brand.name}</option>
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
                        name='description'></textarea>
                </form>
            </div>
        </>
    );
};
