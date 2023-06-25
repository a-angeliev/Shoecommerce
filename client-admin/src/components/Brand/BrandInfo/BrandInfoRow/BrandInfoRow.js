import style from "./BrandInfoRow.module.css";

export const BrandInfoRow = (props) => {
    const brand = props.brand;
    // console.log(brand);
    return (
        <tr>
            <td className={style["cl-1"]}>{brand.id}</td>
            <td className={style["cl-2"]}>{brand.name}</td>
            <td className={style["cl-3"]}>
                <div className={style["brand-description"]}>{brand.description}</div>
            </td>
            <td className={style["cl-4"]}>
                <img className={style["brand-logo"]} src={brand.logo_url}></img>
            </td>
        </tr>
    );
};
