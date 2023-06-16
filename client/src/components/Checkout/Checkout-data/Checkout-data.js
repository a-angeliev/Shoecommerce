import { Summary } from "../summary/Summary";
import { useContext, useState } from "react";
import { CartContext } from "../../../contexts/cartContext";
import "./Checkout-data.css";

export const CheckoutData = () => {
    const { cartState } = useContext(CartContext);
    const [toggleButton, setToggleButton] = useState("");
    const [toggleButtonClass, setToggleButtonClass] = useState("");

    const showList = () => {
        if (toggleButton == "toggle-list") {
            setToggleButton("");
            setToggleButtonClass("");
        } else {
            setToggleButton("toggle-list");
            setToggleButtonClass("active-button");
        }
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
                            {/* <p>$ {shoe[1]["price"]}</p> */}
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
            <div className='form'>
                <div className='summary top-summary'>
                    <Summary></Summary>
                    <div className='delivery-date'>
                        <p>{delivery()}</p>
                    </div>
                    <button className={"item-btn" + " " + toggleButtonClass} onClick={showList}>
                        Items
                    </button>
                    <div className={toggleButton + " " + "shoes-list"}>
                        {cartState ? Object.entries(cartState).map((x, y) => shoeList(x, y)) : ""}
                    </div>
                </div>
                <div className='delivery-options'>
                    <p className='title'>How would you like to get your order?</p>
                    <div className='deliver-btn'>
                        <img aria-hidden='true' alt='delivery icon' src='./images/7615749.png' />
                        Deliver It
                        <icon></icon>
                    </div>
                    <button className='login-btn'>Login</button>
                </div>
                <div className='name-form'>
                    <p className='title'>Enter your name and address:</p>

                    <input type='text' placeholder='First Name'></input>
                    <input type='text' placeholder='Last Name'></input>
                    <input type='text' placeholder='Address Line 1'></input>
                    <input type='text' placeholder='Address Line 2'></input>
                    <div className='city-input'>
                        <input type='text' placeholder='Postal Code'></input>
                        <input type='text' placeholder='City'></input>
                    </div>
                    <input type='text' placeholder='Country'></input>
                </div>
                <div className='contact-info'>
                    <p className='title'>What's your contact information?</p>

                    <input type='text' name='email' placeholder='Email'></input>
                    <label for='email' className='note'>
                        A confirmation email will be sent after checkout.
                    </label>

                    <input type='text' name='pnumber' placeholder='Phone Number'></input>
                    <label for='pnumber' className='note'>
                        A carrier might contact you to confirm delivery.
                    </label>
                </div>
                <div className='terms'>
                    <input type='checkbox' className='checkbox-terms'></input>
                    <p>
                        I have read and consent to eShopWorld processing my information in accordance with the
                        <span>
                            {" "}
                            <a href='https://www.eshopworld.com/privacy-policy/' class='link-privacy' target='_blank'>
                                Privacy Statement
                            </a>{" "}
                        </span>
                        and{" "}
                        <span>
                            <a href='https://www.eshopworld.com/cookie-policy/' class='link-cookie' target='_blank'>
                                Cookie Policy
                            </a>
                        </span>
                        {""}. eShopWorld is a trusted ShoeCommerce partner.{" "}
                    </p>
                </div>
                <div className='btn purchase-btn'>Purchase</div>
            </div>
            <div className='summary bottom-summary'>
                <Summary></Summary>
                <div className='delivery-date'>
                    <p>{delivery()}</p>
                </div>
                <div className='shoes-list'>
                    {cartState ? Object.entries(cartState).map((x, y) => shoeList(x, y)) : ""}
                </div>
            </div>
        </div>
    );
};
