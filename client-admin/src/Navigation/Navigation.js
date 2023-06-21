import { useState } from "react";
import style from "./Navigation.module.css";
import { NavSection } from "./NavSection/NavSection";

export const NavigationBar = () => {
    const [expandMenu, setExpandMenu] = useState(false);

    const brandUrls = {
        "Brand info": "/brand/information",
        "Create brand": "/brand/create",
    };

    const categoryUrls = {
        "Category info": "/category/information",
        "Create category": "/category/create",
    };

    const orderUrls = {
        "Orders info": "/orders/information",
        "Pending orders": "/orders/pending",
    };

    const discountUrls = {
        "Discount info": "/discount/information",
        "Create code": "/discount/create",
        "Delete code": "/discount/delete",
    };

    return (
        <div className={style.nav}>
            <div className={style.logo}>Shoecommerce</div>
            <div className={style["group-title"]}>MENU</div>
            <NavSection links={brandUrls} name='Brand' icon='brand'></NavSection>
            <NavSection links={categoryUrls} name='Category' icon='category'></NavSection>
            <NavSection links={orderUrls} name='Order' icon='order'></NavSection>
            <NavSection links={discountUrls} name='Discount' icon='discount'></NavSection>
        </div>
    );
};
