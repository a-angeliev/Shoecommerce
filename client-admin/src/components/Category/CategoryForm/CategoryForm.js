import style from "./CategoryForm.module.css";

export const CategoryForm = (props) => {
    return (
        <>
            <div className={style["form-content"]}>
                <div className={style.title}>
                    <h2>Category Form</h2>
                </div>
                <div className={style.form}>
                    <form onSubmit={props.onSubmit}>
                        <label htmlFor='title'>Title</label>
                        <input
                            className={props.isValidTitle ? "" : style.error}
                            name='title'
                            placeholder='Outdoor'
                            value={props.title}
                            onChange={(e) => props.setTitle(e.target.value)}></input>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};
