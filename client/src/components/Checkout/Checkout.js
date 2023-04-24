import { useContext } from "react";
import "./Checkout.css";
import { CartContext } from "../../contexts/cartContext";

export const Checkout = () => {
    const { cartState, removeFromCart } = useContext(CartContext);

    const remove = (e, index) => {
        e.preventDefault();
        removeFromCart(index);
    };

    const shoeList = (shoe, index) => {
        return (
            <>
                <div className='shoe'>
                    {console.dir(shoe)}
                    <div className='image'>
                        <img className='img' src={shoe[1]["image"]}></img>
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
                            <i onClick={(e) => remove(e, index)} className='bx bxs-trash-alt'></i>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
            </>
        );
    };
    let sum = 0;
    return (
        <div className='checkout'>
            <div className='bag'>
                <div className='title'>
                    <p>Bag</p>
                    <p className='number-of-items gray-f'>{Object.entries(cartState).length} items</p>
                </div>

                {cartState ? Object.entries(cartState).map((x, y) => shoeList(x, y)) : ""}
            </div>

            <div className='summary'>
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
                <div className='btn-co'>
                    <div className='btn btn-1'>Checkout</div>
                </div>
            </div>
        </div>
    );
};
