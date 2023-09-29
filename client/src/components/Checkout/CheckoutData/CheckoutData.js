/* eslint-disable no-useless-concat */
import { useContext, useState } from "react";

import { CartContext } from "../../../contexts/cartContext";
import { CheckoutForm } from "../CheckoutForm/CheckoutForm";
import { Summary } from "../Summary1/Summary";

import "./CheckoutData.css";

export const CheckoutData = () => {
    const { cartState } = useContext(CartContext);

    const [toggleItemList, setToggleItemList] = useState({ button: "", itemList: "" });

    const showList = (e) => {
        e.preventDefault();
        if (toggleItemList.itemList === "toggle-list") setToggleItemList({ button: "", itemList: "" });
        else setToggleItemList({ button: "active-button", itemList: "toggle-list" });
    };

    const delivery = () => {
        let firstDate = new Date();
        let secondDate = new Date();
        let todayDay = firstDate.getDate();
        firstDate.setDate(todayDay + 3);
        secondDate.setDate(todayDay + 6);

        let fDay = firstDate.getDate();
        let fMonth = firstDate.getMonth();
        let fYear = firstDate.getFullYear();

        let sDay = secondDate.getDate();
        let sMonth = secondDate.getMonth();
        let sYear = secondDate.getFullYear();
        let delivery = `Estimated delivery ${fDay}/${fMonth}/${fYear} - ${sDay}/${sMonth}/${sYear}  `;

        return delivery;
    };

    const shoeList = (shoe) => {
        return (
            <>
                <div className='shoe'>
                    <div className='image'>
                        <img className='img' src={shoe[1]["image"]} alt='shoe Img'></img>
                    </div>
                    <div className='shoe-info'>
                        <div className='title-price'>
                            <p>{shoe[1]["title"]}</p>
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
                    </div>
                </div>
                <div className='divider'></div>
            </>
        );
    };

    return (
        <div className='checkout-data'>
            <form className='form'>
                <div className='summary top-summary'>
                    <Summary></Summary>
                    <div className='delivery-date'>
                        <p>{delivery()}</p>
                    </div>
                    <button className={"item-btn" + " " + toggleItemList.button} onClick={showList}>
                        Items
                    </button>
                    <div className={toggleItemList.itemList + " " + "shoes-list"}>
                        {cartState
                            ? Object.entries(cartState).map((shoe, index) => (
                                  <li key={index}> {shoeList(shoe, index)} </li>
                              ))
                            : ""}
                    </div>
                </div>
                <div className='delivery-options'>
                    <p className='title'>How would you like to get your order?</p>
                    <div className='deliver-btn'>
                        <img aria-hidden='true' alt='delivery icon' src='./images/7615749.png' />
                        Deliver It
                    </div>
                    {/* <button className='login-btn'>Login</button> */}
                </div>
                <CheckoutForm></CheckoutForm>
            </form>
            <div className='summary bottom-summary'>
                <Summary></Summary>
                <div className='delivery-date'>
                    <p>{delivery()}</p>
                </div>
                <div className='shoes-list'>
                    {cartState
                        ? Object.entries(cartState).map((shoe, index) => <li key={index}> {shoeList(shoe, index)} </li>)
                        : ""}
                </div>
            </div>
        </div>
    );
};
