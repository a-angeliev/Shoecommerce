import style from "./BrandForm.module.css";

export const BrandForm = () => {
    return (
        <>
            <div className={style.container}>
                <div className={style.title}>
                    <h2>Brand Form</h2>
                </div>
                <div className={style.form}>
                    <label for='name'>Name</label>
                    <input name='name' type='text'></input>

                    <label for='logo-url'>Logo URL</label>
                    <input name='logo-url' type='url'></input>

                    <label for='description'>Description</label>
                    <textarea name='description' className={style.description} type='textarea'></textarea>

                    <button name='button'>Submit</button>
                </div>
            </div>
        </>
    );
};
