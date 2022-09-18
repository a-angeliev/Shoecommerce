import { useState } from "react";
import { Link } from "react-router-dom";

import { Auth } from "../Auth/Auth";

import "./Navbar.css";

export const Navbar = () => {
    const [activeIcon, setActiveIcon] = useState('');

    window.onscroll = () => {
        setActiveIcon('');
    }

    const handleIconClick = (icon) => {
        if (icon === activeIcon) {
            setActiveIcon('');
        } else {
            setActiveIcon(icon);
        }
    }
    return (
        <header>
            <Link to="/#" className="logo"> <i className='bx bxs-shopping-bag-alt'>
            </i>
                ShoeCommerce
            </Link>
            <ul className={`navbar ${activeIcon === 'menu' && 'active'}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products?gender=man">Men</Link></li>
                <li><Link to="/products?gender=woman">Women</Link></li>
                <li><Link to="/products?gender=kid">Kids</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
            </ul>

            <ul className="header-icons">
                <li>
                    <i
                        className='bx bx-menu'
                        id="menu-icon"
                        onClick={() => handleIconClick('menu')}
                    />
                </li>
                <li>
                    <i
                        className='bx bx-search'
                        id="search-icon"
                        onClick={() => handleIconClick('search-box')}
                    />
                </li>
                <li>
                    <i
                        className='bx bx-cart-alt'
                        id="cart-alt-icon"
                        onClick={() => handleIconClick('cart')}
                    />
                </li>
                <li>
                    <i
                        className='bx bxs-user'
                        id="user-icon"
                        onClick={() => handleIconClick('user')}
                    />
                </li>
            </ul>

            <div className={`search-box ${activeIcon === 'search-box' && 'active'}`}>
                <input type="search" name="" id="" placeholder="Search Here" />
            </div>

            <div className={`cart ${activeIcon === 'cart' && 'active'}`}>
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                    <div className="text">
                        <h3>Sneaker 12B</h3>
                        <span>$230</span>
                        <span>x1</span>
                    </div>
                    <i className='bx bxs-trash-alt'></i>
                </div>
                <h2>Total: $230</h2>
                <Link to="/" className="btn">Checkout</Link>
            </div>

            <Auth activeIcon={activeIcon} />
        </header>
    );
}