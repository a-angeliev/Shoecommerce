import "./Navbar.css";

import { useRef } from "react";
export const Navbar = () => {

    const menuRef = useRef();
    const searchRef = useRef();
    const cartRef = useRef();
    const userRef = useRef();

    const showMenu = () => {
        menuRef.current.classList.toggle('active');
        searchRef.current.classList.remove('active');
        cartRef.current.classList.remove('active');
        userRef.current.classList.remove('active');
    }
    const showSearch = () => {
        searchRef.current.classList.toggle('active');
        menuRef.current.classList.remove('active');
        cartRef.current.classList.remove('active');
        userRef.current.classList.remove('active');
    }
    const showCart = () => {
        cartRef.current.classList.toggle('active');
        menuRef.current.classList.remove('active');
        searchRef.current.classList.remove('active');
        userRef.current.classList.remove('active');
    }
    const showUser = () => {
        userRef.current.classList.toggle('active');
        menuRef.current.classList.remove('active');
        cartRef.current.classList.remove('active');
        searchRef.current.classList.remove('active');
    }

    window.onscroll = () => {
        menuRef.current.classList.remove('active');
        searchRef.current.classList.remove('active');
        cartRef.current.classList.remove('active');
        userRef.current.classList.remove('active');
    }


    return (
        // Navbar

        < header>
            <a href="/#" className="logo"> <i className='bx bxs-shopping-bag-alt'></i>ShoeCommerce</a>

            <ul className="navbar" ref={menuRef}>
                <li><a href="/home">Home</a></li>
                <li><a href="/new">New Arrival</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/reviews">Reviews</a></li>
            </ul>

            {/* <!-- Icons --> */}

            <div className="header-icons">
                <i className='bx bx-menu' id="menu-icon" onClick={showMenu}></i>
                <i className='bx bx-search' id="search-icon" onClick={showSearch}></i>
                <i className='bx bx-cart-alt' id="cart-alt-icon" onClick={showCart}></i>
                <i className='bx bxs-user' id="user-icon" onClick={showUser}></i>
            </div>

            {/* <!-- Search Box --> */}

            <div className="search-box" ref={searchRef}>
                <input type="search" name="" id="" placeholder="Search Here" />
            </div>

            {/* <!-- Cart Box --> */}

            <div className="cart" ref={cartRef}>

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

            <div className="user" ref={userRef}>
                <h2>Login Now</h2>
                <input type="email" placeholder="Your Email" />
                <input type="password" name="" id="" placeholder="Your Password" />
                <input type="submit" value="Login" className="login-btn" />
                <p>Forget Password <a href="#">Reset Now</a></p>
                <p>Don't have an account? <a href="#">Sign Up</a></p>
            </div>

        </header>
    );
}