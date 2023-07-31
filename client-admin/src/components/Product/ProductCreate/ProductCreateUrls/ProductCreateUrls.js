import { useEffect, useState } from "react";

import style from "./ProductCreateUrls.module.css";

export const ProductCreateUrls = (props) => {
    const [urlData, setUrlData] = useState({ url1: "", url2: "", url3: "", url4: "", url5: "", url6: "", url7: "" });

    useEffect(() => {
        props.setUrlData(urlData);
    }, [urlData]);

    const urlHandler = (e) => {
        const urlObject = { ...urlData };
        urlObject[e.target.name] = e.target.value;
        setUrlData(urlObject);
    };

    return (
        <>
            <div className={style.content}>
                <label htmlFor='url1'>Picture 1</label>
                <input
                    name='url1'
                    type='url'
                    value={urlData["url1"]}
                    onChange={(e) => urlHandler(e)}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>

                <label htmlFor='url2'>Picture 2</label>
                <input
                    name='url2'
                    type='url'
                    value={urlData["url2"]}
                    onChange={urlHandler}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>

                <label htmlFor='url3'>Picture 3</label>
                <input
                    name='url3'
                    type='url'
                    value={urlData["url3"]}
                    onChange={urlHandler}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>

                <label htmlFor='url4'>Picture 4</label>
                <input
                    name='url4'
                    type='url'
                    value={urlData["url4"]}
                    onChange={urlHandler}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>

                <label htmlFor='url5'>Picture 5</label>
                <input
                    name='url5'
                    type='url'
                    value={urlData["url5"]}
                    onChange={urlHandler}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>

                <label htmlFor='url6'>Picture 6</label>
                <input
                    name='url6'
                    type='url'
                    value={urlData["url6"]}
                    onChange={urlHandler}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>

                <label htmlFor='url7'>Picture 7</label>
                <input
                    name='url7'
                    type='url'
                    value={urlData["url7"]}
                    onChange={urlHandler}
                    placeholder='https://example.com'
                    pattern='https://.*'></input>
            </div>
        </>
    );
};
