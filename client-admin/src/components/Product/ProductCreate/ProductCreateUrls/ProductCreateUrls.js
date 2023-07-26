import style from "./ProductCreateUrls.module.css";

export const ProductCreateUrls = () => {
    return (
        <>
            <div className={style.content}>
                <label htmlFor='url1'>Picture 1</label>
                <input name='url1'></input>

                <label htmlFor='url2'>Picture 2</label>
                <input name='url2'></input>

                <label htmlFor='url3'>Picture 3</label>
                <input name='url3'></input>

                <label htmlFor='url4'>Picture 4</label>
                <input name='url4'></input>

                <label htmlFor='url5'>Picture 5</label>
                <input name='url5'></input>

                <label htmlFor='url6'>Picture 6</label>
                <input name='url6'></input>

                <label htmlFor='url7'>Picture 7</label>
                <input name='url7'></input>
            </div>
        </>
    );
};
