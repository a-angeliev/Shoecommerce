import { Summary } from "../summary/Summary";
import "./Checkout-data.css";

export const CheckoutData = () => {
    return (
        <div className='checkout-data'>
            <div className='form'>
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
            <div className='summary'>
                <Summary></Summary>
            </div>
        </div>
    );
};
