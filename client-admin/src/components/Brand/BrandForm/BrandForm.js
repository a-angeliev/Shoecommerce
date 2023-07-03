import style from "./BrandForm.module.css";

export const BrandForm = (params) => {
    console.log(params);
    return (
        <>
            <div className={style["page-content"]}>
                <div className={style.wrapper}>
                    <h1>{params.title}</h1>
                    <div className={style.container}>
                        <div className={style.title}>
                            <h2>Brand Form</h2>
                        </div>
                        <div className={style.form}>
                            <label htmlFor='name'>Name</label>
                            <input name='name' type='text'></input>

                            <label htmlFor='logo-url'>Logo URL</label>
                            <input name='logo-url' type='url'></input>

                            <label htmlFor='description'>Description</label>
                            <textarea name='description' className={style.description} type='textarea'></textarea>

                            <button name='button'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
