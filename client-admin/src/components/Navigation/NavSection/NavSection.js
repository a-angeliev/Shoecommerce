import { Link } from "react-router-dom";
import { useState } from "react";

import style from "./NavSection.module.css";

export const NavSection = (props) => {
    const [expandMenu, setExpandMenu] = useState(false);
    const links = Object.entries(props.links);

    const icons = {
        brand: "gg-menu-grid-o",
        category: "gg-atlasian",
        order: "gg-shopping-cart",
        discount: "gg-calculator",
        product: "gg-product-hunt",
        profile: "gg-profile",
    };

    console.log(icons[props.icon]);
    return (
        <div className={style["nav-section"]}>
            <div
                className={`${style["nav-section-title"]} ${expandMenu ? style["title-expanded"] : ""}`}
                onClick={() => setExpandMenu((prev) => !prev)}>
                <i className={`${style["nav-section-title-icon"]} ${icons[props.icon]}`}></i>
                <span>{props.name}</span>
                <div className={style["arrow-container"]}>
                    <i className={`${style.arrow} ${expandMenu ? style.up : style.down}`}></i>
                </div>
            </div>
            <div className={`${style["nav-section-links"]} ${expandMenu ? style["expanded"] : ""}`}>
                {links.map((link) => (
                    // <p key={link[0]}>
                    //     {link[0]}
                    //     {/* - {link[1]} */}
                    // </p>
                    <Link className={style.link} to={link[1]}>
                        {link[0]}
                    </Link>
                ))}
            </div>
        </div>
    );
};
