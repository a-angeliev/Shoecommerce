import style from "./ProductForm.module.css";

export const ProductForm = () => {
    return (
        <>
            <div>
                <form>
                    <div className={style["shoe-name"]}>
                        <h2>Shoe Information</h2>
                        <div className={style["deleted-div"]}>
                            <label htmlFor='deleted'>Is deleted: </label>
                            <input className={style.deleted} name='deleted' type='checkbox'></input>
                        </div>
                    </div>
                    <label htmlFor='title'>Title</label>
                    <input name='title'></input>
                    <div className={style["input-group"]}>
                        <div className={style["group-div"]}>
                            <label htmlFor='price'>Price:</label>
                            <div className={style.combine}>
                                <input className={`${style.price} ${style.input}`} name='price'></input>
                                <p id={style.dollar}> $</p>
                            </div>
                        </div>
                        <div className={style["group-div"]}>
                            <label htmlFor='gender'>Gender:</label>
                            <div className={style.combine}>
                                <select className={`${style["select-menu"]} ${style.input}`} name='gender'>
                                    <option>man</option>
                                    <option>women</option>
                                    <option>kid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={style["input-group"]}>
                        <div className={style["group-div"]}>
                            <label htmlFor='category'>Category:</label>
                            <div className={style.combine}>
                                <select className={`${style["select-menu"]} ${style.input}`} name='category'>
                                    <option>Outdoor</option>
                                    <option>Running</option>
                                    <option>Fitness</option>
                                </select>
                            </div>
                        </div>
                        <div className={style["group-div"]}>
                            <label htmlFor='brand'>Brand:</label>
                            <div className={style.combine}>
                                <select className={`${style["select-menu"]} ${style.input}`} name='brand'>
                                    <option>Nike</option>
                                    <option>Adidas</option>
                                    <option>Lacoste</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <label htmlFor='description'>Description</label>
                    <textarea className={style.description} name='description'></textarea>

                    <button>Submit</button>
                </form>
            </div>
        </>
    );
};
