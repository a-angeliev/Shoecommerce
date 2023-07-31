import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { NavSection } from "./NavSection/NavSection";

import style from "./Navigation.module.css";

export const NavigationBar = () => {
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

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
        // "Pending orders": "/orders/pending",
    };

    const discountUrls = {
        "Discount info": "/discount/information",
        "Create code": "/discount/create",
        "Delete code": "/discount/delete",
    };

    const productsUrls = {
        "Product info": "/products/information",
        "Create product": "/products/create",
    };

    const profile = {
        Logout: "/logout",
    };
    if (isAdmin) {
        return (
            <div className={style.nav}>
                <div className={style.logo} onClick={() => navigate("/")}>
                    Shoecommerce
                </div>
                <div className={style["group-title"]}>MENU</div>
                <NavSection links={brandUrls} name='Brand' icon='brand'></NavSection>
                <NavSection links={categoryUrls} name='Category' icon='category'></NavSection>
                <NavSection links={productsUrls} name='Products' icon='product'></NavSection>
                <NavSection links={orderUrls} name='Order' icon='order'></NavSection>
                {/* <NavSection links={discountUrls} name='Discount' icon='discount'></NavSection> */}
                <NavSection links={profile} name='Profile' icon='profile'></NavSection>
            </div>
        );
    }

    return <></>;
};
