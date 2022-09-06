import { useState } from "react";

import { Auth } from "../Auth/Auth";

import "./Navbar.css";

export const Navbar = () => {
    const [activeIcon, setActiveIcon] = useState('');

    window.onscroll = () => {
        setActiveIcon('');
    }

    const handleClick = (icon) => {
        if (icon === activeIcon) {
            setActiveIcon('');
        } else {
            setActiveIcon(icon);
        }
    }
    return (
        // Navbar

        <header>
            <a href="/#" className="logo"> <i className='bx bxs-shopping-bag-alt'>
            </i>
                ShoeCommerce
            </a>
            <ul className={`navbar ${activeIcon === 'menu' && 'active'}`}>
                <li><a href="/home">Home</a></li>
                <li><a href="/new">New Arrival</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/reviews">Reviews</a></li>
            </ul>

            {/* <!-- Icons --> */}

            <div className="header-icons">
                <i className='bx bx-menu' id="menu-icon" onClick={() => handleClick('menu')}></i>
                <i className='bx bx-search' id="search-icon" onClick={() => handleClick('search-box')}></i>
                <i className='bx bx-cart-alt' id="cart-alt-icon" onClick={() => handleClick('cart')}></i>
                <i className='bx bxs-user' id="user-icon" onClick={() => handleClick('user')}></i>
            </div>

            {/* <!-- Search Box --> */}

            <div className={`search-box ${activeIcon === 'search-box' && 'active'}`}>
                <input type="search" name="" id="" placeholder="Search Here" />
            </div>

            {/* <!-- Cart Box --> */}

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
                <a href="/" className="btn">Checkout</a>
            </div>

            {/* <!-- User --> */}

            <Auth activeIcon={activeIcon} />
        </header>
    );
}