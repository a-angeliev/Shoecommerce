import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import * as productServices from "../../../services/product";

import style from "./ProductImages.module.css";

export const ProductImages = (props) => {
    const { setAlert } = useContext(AlertContext);

    const [inputContent, setInputContent] = useState({
        url1: "",
        url2: "",
        url3: "",
        url4: "",
        url5: "",
        url6: "",
        url7: "",
    });
    const [oldImages, setOldImages] = useState({});
    const [edit, setEdit] = useState(false);
    const [images, setImages] = useState([]);

    const param = useParams();

    useEffect(() => {
        setOldImages(props.images);
        if (props.images.length > 0) {
            setInputContent({
                url1: props.images[0].img_url,
                url2: props.images[1].img_url,
                url3: props.images[2].img_url,
                url4: props.images[3].img_url,
                url5: props.images[4].img_url,
                url6: props.images[5].img_url,
                url7: props.images[6].img_url,
            });
            setImages(props.images);
        }
    }, [props.images, param.id]);

    const inputHandler = (e) => {
        const input = { ...inputContent };
        input[e.target.name] = e.target.value;
        setInputContent(input);
    };

    const validateInput = () => {
        if (
            Object.values(inputContent)
                .map((x) => (x.length >= 0 ? true : false))
                .includes(false)
        ) {
            setAlert({ color: "red", text: "Can't upload empty url" });
            return false;
        }
        return true;
    };

    const onSubmit = () => {
        if (edit && validateInput) {
            const idForDelete = [];
            const urlsForAdd = [];
            const newUrls = Object.values(inputContent);

            Object.values(inputContent).map((x) =>
                oldImages.map((i) => i.img_url).includes(x) ? null : urlsForAdd.push(x)
            );

            oldImages.map((x) => (newUrls.includes(x.img_url) ? null : idForDelete.push(x.id)));

            productServices
                .editProductImages(param.id, { ids: idForDelete, urls: urlsForAdd })
                .then((_) => {
                    setAlert({ color: "green", text: "You successfully edited the product images" });
                    props.setReload((pr) => !pr);
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
        setEdit((prev) => !prev);
    };
    if (images.length > 0) {
        return (
            <>
                <Alert />
                <div className={style.background}>
                    <div className={style.content}>
                        <div className={style["link-container-top"]}>
                            <div className={style["image-div-left"]}>
                                <img className={style["shoe-img-left"]} alt='shoe' src={images[0].img_url}></img>
                            </div>
                            <div className={style["input-div-left"]}>
                                <label htmlFor='url1'>Picture 1</label>
                                <input
                                    name='url1'
                                    value={inputContent.url1}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                        </div>
                        <div className={style["link-container-right"]}>
                            <div className={style["input-div-right"]}>
                                <label htmlFor='url2'>Picture 2</label>
                                <input
                                    name='url2'
                                    value={inputContent.url2}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                            <div className={style["image-div-right"]}>
                                <img alt='shoe' className={style["shoe-img-right"]} src={images[1].img_url}></img>
                            </div>
                        </div>
                        <div className={style["link-container-left"]}>
                            <div className={style["image-div-left"]}>
                                <img alt='shoe' className={style["shoe-img-left"]} src={images[2].img_url}></img>
                            </div>
                            <div className={style["input-div-left"]}>
                                <label htmlFor='url3'>Picture 3</label>
                                <input
                                    name='url3'
                                    value={inputContent.url3}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                        </div>
                        <div className={style["link-container-right"]}>
                            <div className={style["input-div-right"]}>
                                <label htmlFor='url4'>Picture 4</label>
                                <input
                                    name='url4'
                                    value={inputContent.url4}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                            <div className={style["image-div-right"]}>
                                <img alt='shoe' className={style["shoe-img-right"]} src={images[3].img_url}></img>
                            </div>
                        </div>
                        <div className={style["link-container-left"]}>
                            <div className={style["image-div-left"]}>
                                <img alt='shoe' className={style["shoe-img-left"]} src={images[4].img_url}></img>
                            </div>
                            <div className={style["input-div-left"]}>
                                <label htmlFor='url5'>Picture 5</label>
                                <input
                                    name='url5'
                                    value={inputContent.url5}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                        </div>
                        <div className={style["link-container-right"]}>
                            <div className={style["input-div-right"]}>
                                <label htmlFor='url6'>Picture 6</label>
                                <input
                                    name='url6'
                                    value={inputContent.url6}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                            <div className={style["image-div-right"]}>
                                <img alt='shoe' className={style["shoe-img-right"]} src={images[5].img_url}></img>
                            </div>
                        </div>
                        <div className={style["link-container-left"]}>
                            <div className={style["image-div-left"]}>
                                <img alt='shoe' className={style["shoe-img-left"]} src={images[6].img_url}></img>
                            </div>
                            <div className={style["input-div-left"]}>
                                <label htmlFor='url7'>Picture 7</label>
                                <input
                                    name='url7'
                                    value={inputContent.url7}
                                    onChange={inputHandler}
                                    disabled={edit ? null : true}></input>
                            </div>
                        </div>
                        <button onClick={onSubmit} className={style["submit-button"]}>
                            {edit ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>
            </>
        );
    }
};
