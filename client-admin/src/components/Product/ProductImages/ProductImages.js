import style from "./ProductImages.module.css";

export const ProductImages = (props) => {
    return (
        <div className={style.background}>
            <div className={style.content}>
                <div className={style["link-container-top"]}>
                    <div className={style["image-div-left"]}>
                        <img className={style["shoe-img-left"]} alt='shoe' src={props.images[0].img_url}></img>
                    </div>
                    <div className={style["input-div-left"]}>
                        <label htmlFor='url1'>Picture 1</label>
                        <input name='url1' value></input>
                    </div>
                </div>
                <div className={style["link-container-right"]}>
                    <div className={style["input-div-right"]}>
                        <label htmlFor='url2'>Picture 2</label>
                        <input name='url2'></input>
                    </div>
                    <div className={style["image-div-right"]}>
                        <img
                            alt='shoe'
                            className={style["shoe-img-right"]}
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17e1c7ef-3ea9-4559-ab93-371bfc578df8/air-max-plus-shoes-nnTrAZe0.png'></img>
                    </div>
                </div>
                <div className={style["link-container-left"]}>
                    <div className={style["image-div-left"]}>
                        <img
                            alt='shoe'
                            className={style["shoe-img-left"]}
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17e1c7ef-3ea9-4559-ab93-371bfc578df8/air-max-plus-shoes-nnTrAZe0.png'></img>
                    </div>
                    <div className={style["input-div-left"]}>
                        <label htmlFor='url3'>Picture 3</label>
                        <input name='url3'></input>
                    </div>
                </div>
                <div className={style["link-container-right"]}>
                    <div className={style["input-div-right"]}>
                        <label htmlFor='url4'>Picture 4</label>
                        <input name='url4'></input>
                    </div>
                    <div className={style["image-div-right"]}>
                        <img
                            alt='shoe'
                            className={style["shoe-img-right"]}
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17e1c7ef-3ea9-4559-ab93-371bfc578df8/air-max-plus-shoes-nnTrAZe0.png'></img>
                    </div>
                </div>
                <div className={style["link-container-left"]}>
                    <div className={style["image-div-left"]}>
                        <img
                            alt='shoe'
                            className={style["shoe-img-left"]}
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17e1c7ef-3ea9-4559-ab93-371bfc578df8/air-max-plus-shoes-nnTrAZe0.png'></img>
                    </div>
                    <div className={style["input-div-left"]}>
                        <label htmlFor='url5'>Picture 5</label>
                        <input name='url5'></input>
                    </div>
                </div>
                <div className={style["link-container-right"]}>
                    <div className={style["input-div-right"]}>
                        <label htmlFor='url6'>Picture 6</label>
                        <input name='url6'></input>
                    </div>
                    <div className={style["image-div-right"]}>
                        <img
                            alt='shoe'
                            className={style["shoe-img-right"]}
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17e1c7ef-3ea9-4559-ab93-371bfc578df8/air-max-plus-shoes-nnTrAZe0.png'></img>
                    </div>
                </div>
                <div className={style["link-container-left"]}>
                    <div className={style["image-div-left"]}>
                        <img
                            alt='shoe'
                            className={style["shoe-img-left"]}
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/17e1c7ef-3ea9-4559-ab93-371bfc578df8/air-max-plus-shoes-nnTrAZe0.png'></img>
                    </div>
                    <div className={style["input-div-left"]}>
                        <label htmlFor='url7'>Picture 7</label>
                        <input name='url7'></input>
                    </div>
                </div>
                <button className={style["edit-button"]}>Edit</button>
            </div>
        </div>
    );
};
