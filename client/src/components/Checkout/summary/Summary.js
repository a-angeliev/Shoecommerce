import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../../contexts/cartContext";

import "./Summary.css";

export const Summary = () => {
    const { cartState } = useContext(CartContext);

    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        let sum = 0;
        Object.entries(cartState).forEach((shoe) => (sum += shoe[1]["price"]));
        setTotalSum(sum);
    }, [cartState]);

    return (
        <>
            <p>Summary</p>
            <div className='total-price'>
                <p>Subtotal</p>
                <p>BGN {totalSum}</p>
            </div>
            <div className='delivery'>
                <p>Delivery</p>
                <p>Free</p>
            </div>
            <div className='divider-co'></div>
            <div className='total'>
                <p>Total</p>
                <p>BGN {totalSum}</p>
            </div>
            <div className='divider-co'></div>
        </>
    );
};
