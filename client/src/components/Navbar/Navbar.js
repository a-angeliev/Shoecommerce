import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Alert } from "../Alert/Alert";
import { Auth } from "../Auth/Auth";

import "./Navbar.css";
import { ActiveIconContext } from "../../contexts/activeIconContext";
import { WishlistContext } from "../../contexts/wishlistContext";

import * as wishlistService from "../../services/wishlist";
import { AuthContext } from "../../contexts/Auth";
import { useNav } from "../../hooks/useNavigation";

export const Navbar = () => {
    const { activeIcon, setActiveIcon } = useContext(ActiveIconContext);
    // const [activeIcon, setActiveIcon] = useState("");
    const { cartState, removeFromCart } = useContext(CartContext);
    const { wishlistIds, wishlist, removeWishlistCtx } = useContext(WishlistContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navTo = useNav();
    window.onscroll = () => {
        setActiveIcon("");
    };

    const handleIconClick = (icon) => {
        if (icon === activeIcon) {
            setActiveIcon("");
        } else {
            setActiveIcon(icon);
        }
    };

    const removeCartIcon = () => {
        setActiveIcon("");
    };

    const remove = (e, index) => {
        e.preventDefault();
        removeFromCart(index);
    };

    const removeFromWishlist = (shoeId) => {
        wishlistService
            .removeWish({ id: shoeId })
            .then((res) => {
                removeWishlistCtx(shoeId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const item = (shoe, index) => {
        return (
            <div className='box'>
                <img
                    src={shoe[1]["image"]}
                    alt=''
                    onClick={() => {
                        navTo(`/product/${shoe[1]["id"]}`);
                    }}
                />
                <div
                    className='text'
                    onClick={() => {
                        navTo(`/product/${shoe[1]["id"]}`);
                    }}>
                    <h3>{shoe[1]["title"]}</h3>
                    <span>$ {shoe[1]["price"]}</span>
                    <span>
                        {" "}
                        {shoe[1]["color"]}, {shoe[1]["size"]}
                    </span>
                </div>

                <i onClick={(e) => remove(e, index)} className='bx bxs-trash-alt'></i>
            </div>
        );
    };

    const wishlistItem = (shoe) => {
        console.log(shoe);
        return (
            <div className='box'>
                <img
                    src={shoe.images[0].img_url}
                    alt=''
                    onClick={() => {
                        navTo(`/product/${shoe.id}`);
                    }}
                />
                <div
                    className='text'
                    onClick={() => {
                        navTo(`/product/${shoe.id}`);
                    }}>
                    <h3>{shoe["title"]}</h3>
                    <span>$ {shoe["price"]}</span>
                </div>
                <i
                    className='bx bxs-heart wishlist-remove-icon'
                    id='heart-icon'
                    onClick={() => removeFromWishlist(shoe.id)}
                />
            </div>
        );
    };

    const openWishlist = () => {
        if (isAuthenticated) {
            handleIconClick("wishlist");
        } else {
            handleIconClick("user");
        }
    };

    return (
        <header>
            <Alert></Alert>
            <Link to='/#' className='logo'>
                {" "}
                <i className='bx bxs-shopping-bag-alt'></i>
                ShoeCommerce
            </Link>
            <ul className={`navbar ${activeIcon === "menu" && "active"}`}>
                <li key='home'>
                    <Link to='/'>Home</Link>
                </li>
                <li key='Men'>
                    <Link to='/products/man'>Men</Link>
                </li>
                <li key='Women'>
                    <Link to='/products/woman'>Women</Link>
                </li>
                <li key='Kids'>
                    <Link to='/products/kid'>Kids</Link>
                </li>
            </ul>

            <ul className='header-icons'>
                <li key='menu'>
                    <i className='bx bx-menu' id='menu-icon' onClick={() => handleIconClick("menu")} />
                </li>
                <li key='search'>
                    <i className='bx bx-heart' id='heart-icon' onClick={() => openWishlist()} />
                </li>
                <li key='cart'>
                    <i className='bx bx-cart-alt' id='cart-alt-icon' onClick={() => handleIconClick("cart")} />
                </li>
                <li key='user'>
                    <i className='bx bxs-user' id='user-icon' onClick={() => handleIconClick("user")} />
                </li>
            </ul>

            <div className={`wishlist ${activeIcon === "wishlist" && "active"}`}>
                {wishlist.length != 0 ? wishlist.map((shoe) => wishlistItem(shoe)) : <div>Empty wishlist</div>}
            </div>

            <div className={`cart ${activeIcon === "cart" && "active"}`}>
                {cartState ? Object.entries(cartState).map((x, y) => item(x, y)) : ""}
                {cartState.length !== 0 ? (
                    <Link to='/checkout' onClick={removeCartIcon} className='btn'>
                        Checkout
                    </Link>
                ) : (
                    <div>Empty cart</div>
                )}
            </div>

            <Auth activeIcon={activeIcon} />
        </header>
    );
};
