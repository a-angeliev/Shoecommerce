import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ActiveIconContext } from "../../contexts/activeIconContext";
import { AuthContext } from "../../contexts/Auth";
import { CartContext } from "../../contexts/cartContext";
import { Summary } from "./Summary/Summary";

import "./Checkout.css";

export const Checkout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { setActiveIcon } = useContext(ActiveIconContext);
    const { cartState, removeFromCart } = useContext(CartContext);

    const [checkoutShaking, setCheckoutShaking] = useState("");

    const navigator = useNavigate();

    useEffect(() => {
        setTimeout(setCheckoutShaking, 1000, "");
    }, [checkoutShaking]);

    const checkForLogin = (e) => {
        e.preventDefault();
        setActiveIcon("");
        if (isAuthenticated) {
            navigator("/checkout-data");
        } else {
            setCheckoutShaking("horizontal-shake");
            setActiveIcon("user");
        }
    };

    const shoeList = (shoe, index) => {
        return (
            <>
                <div className='shoe'>
                    <div className='image'>
                        <img className='img' src={shoe[1]["image"]} alt='shoe img'></img>
                    </div>
                    <div className='shoe-info'>
                        <div className='title-price'>
                            <p>{shoe[1]["title"]}</p>
                            <p>$ {shoe[1]["price"]}</p>
                        </div>
                        <div className='gender-title'>
                            <p className='gray-f'>
                                {shoe[1]["gender"].charAt(0).toUpperCase() + shoe[1]["gender"].slice(1)}'s Shoes
                            </p>
                        </div>
                        <div className='color'>
                            <p className='gray-f'>{shoe[1]["color"]}</p>
                        </div>
                        <div className='size'>
                            <p className='gray-f'>Size {shoe[1]["size"]}</p>
                        </div>
                        <div className='bin'>
                            <i onClick={(e) => removeFromCart(index)} className='bx bxs-trash-alt'></i>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
            </>
        );
    };

    return (
        <div className='checkout'>
            <div className='bag'>
                <div className='title'>
                    <p>Bag</p>
                    <p className='number-of-items gray-f'>{Object.entries(cartState).length} items</p>
                </div>
                {cartState
                    ? Object.entries(cartState).map((shoe, index) => <li key={index}>{shoeList(shoe, index)} </li>)
                    : ""}
            </div>

            <div className='summary'>
                <Summary />
                <div className='btn-co'>
                    <Link to='/checkout-data' onClick={checkForLogin} className={"btn btn-1" + " " + checkoutShaking}>
                        Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};
