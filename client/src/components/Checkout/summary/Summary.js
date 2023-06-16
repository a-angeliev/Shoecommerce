import { useContext } from "react";
import { CartContext } from "../../../contexts/cartContext";

import "./Summary.css";

export const Summary = () => {
    const { cartState } = useContext(CartContext);
    let sum = 0;

    return (
        <>
            <p>Summary</p>
            <div className='total-price'>
                <p>Subtotal</p>
                <p>
                    BGN{" "}
                    {cartState
                        ? Object.entries(cartState).map((x, y) => {
                              //   console.dir(x[1].price);
                              sum += x[1]["price"];
                          })
                        : null}
                    {sum}
                </p>
            </div>
            <div className='delivery'>
                <p>Delivery</p>
                <p>Free</p>
            </div>
            <div className='divider-co'></div>
            <div className='total'>
                <p>Total</p>
                <p>BGN {sum}</p>
            </div>
            <div className='divider-co'></div>
        </>
    );
};
