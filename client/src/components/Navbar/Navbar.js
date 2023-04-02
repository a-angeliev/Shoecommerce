import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { Auth } from "../Auth/Auth";

import "./Navbar.css";

export const Navbar = () => {
    const [activeIcon, setActiveIcon] = useState("");
    const { cartState, removeFromCart } = useContext(CartContext);

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

    const remove = (e, index) => {
        e.preventDefault();
        removeFromCart(index);
    };

    const item = (shoe, index) => {
        return (
            <div className='box'>
                <img src={shoe[1]["image"]} alt='' />
                <div className='text'>
                    <h3>{shoe[1]["title"]}</h3>
                    <span>$ {shoe[1]["price"]}</span>
                    <span>
                        {" "}
                        {shoe[1]["color"]}, {shoe[1]["size"]}
                    </span>
                </div>
                <i
                    onClick={(e) => remove(e, index)}
                    className='bx bxs-trash-alt'></i>
            </div>
        );
    };

    return (
        <header>
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
                    <Link to='/products/women'>Women</Link>
                </li>
                <li key='Kids'>
                    <Link to='/products/kid'>Kids</Link>
                </li>
            </ul>

            <ul className='header-icons'>
                <li key='menu'>
                    <i
                        className='bx bx-menu'
                        id='menu-icon'
                        onClick={() => handleIconClick("menu")}
                    />
                </li>
                <li key='search'>
                    <i
                        className='bx bx-search'
                        id='search-icon'
                        onClick={() => handleIconClick("search-box")}
                    />
                </li>
                <li key='cart'>
                    <i
                        className='bx bx-cart-alt'
                        id='cart-alt-icon'
                        onClick={() => handleIconClick("cart")}
                    />
                </li>
                <li key='user'>
                    <i
                        className='bx bxs-user'
                        id='user-icon'
                        onClick={() => handleIconClick("user")}
                    />
                </li>
            </ul>

            <div
                className={`search-box ${
                    activeIcon === "search-box" && "active"
                }`}>
                <input type='search' name='' id='' placeholder='Search Here' />
            </div>

            <div className={`cart ${activeIcon === "cart" && "active"}`}>
                {cartState
                    ? Object.entries(cartState).map((x, y) => item(x, y))
                    : ""}

                <Link to='/' className='btn'>
                    Checkout
                </Link>
            </div>

            <Auth activeIcon={activeIcon} />
        </header>
    );
};
