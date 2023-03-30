import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { Auth } from "../Auth/Auth";

import "./Navbar.css";

export const Navbar = () => {
    const [activeIcon, setActiveIcon] = useState('');
    const {cartState, removeFromCart} = useContext(CartContext)
    // const [cart, setToCart] = useLocalStorage("cart", [])
    window.onscroll = () => {
        setActiveIcon('');
    }
    // let cart = JSON.parse(localStorage.getItem("cart"))

    // const refresh = () => {
    //     const [cart, setToCart] = useLocalStorage("cart", [])
    // }
    const handleIconClick = (icon) => {
        if (icon === activeIcon) {
            setActiveIcon('');
        } else {
            setActiveIcon(icon);
        }
    }

    const remove = (e, index) => {
        e.preventDefault()
        // let cart = JSON.parse(localStorage.getItem("cart"))
        // index = index.toString()
        // cart.pop(index)
        // localStorage.setItem('cart', JSON.stringify(cart))
        removeFromCart(index)
    }
    const item =  (shoe, index) => {
        console.log(shoe, index);
    return (  
    <div className="box">
        <img src= {shoe[1]['image']}
            alt="" />
        <div className="text">
            <h3>{shoe[1]["title"]}</h3>
            <span>$ {shoe[1]['price']}</span>
            <span> {shoe[1]["color"]}, {shoe[1]["size"]}</span>
        </div>
        <i onClick={(e)=>remove(e, index)} className='bx bxs-trash-alt'></i>
    </div>
    )
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
                {cartState ? Object.entries(cartState).map((x,y)=> item(x,y)): ""}
                
                <Link to="/" className="btn">Checkout</Link>
            </div>

            <Auth activeIcon={activeIcon} />
        </header>
    );
}