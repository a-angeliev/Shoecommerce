import { Summary } from "../summary/Summary";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../contexts/cartContext";
import * as ordersRequest from "../../../services/orders.js";
import "./Checkout-data.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/alertContext";

export const CheckoutData = () => {
    const { cartState, emptyCart } = useContext(CartContext);
    const { setAlert } = useContext(AlertContext);

    const [toggleButton, setToggleButton] = useState("");
    const [toggleButtonClass, setToggleButtonClass] = useState("");
    const [termsCheckbox, setTermsCheckbox] = useState(false);
    const [termsValidation, setTermsValidation] = useState("incorrect");
    const [termsShaking, setTermsShaking] = useState("");

    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        address1: "",
        address2: "",
        pCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
    });

    const [formValidation, setFormValidation] = useState({
        fName: "incorrect",
        lName: "incorrect",
        address1: "incorrect",
        pCode: "incorrect",
        city: "incorrect",
        country: "incorrect",
        email: "incorrect",
        phone: "incorrect",
    });

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(setTermsShaking, 1000, "");
    }, [termsShaking]);

    const setCorrectValidation = (e) => {
        let newFormValidation = { ...formValidation };
        newFormValidation[e.target.name] = "";
        setFormValidation(newFormValidation);
    };

    const setIncorrectValidation = (e) => {
        let newFormValidation = { ...formValidation };
        newFormValidation[e.target.name] = "incorrect";
        setFormValidation(newFormValidation);
    };

    const isValidEmail = (e) => {
        if (
            String(e.target.value)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            setCorrectValidation(e);
        } else {
            setIncorrectValidation(e);
        }
    };

    const isValidPhone = (e) => {
        if (e.target.value.length >= 8) {
            setCorrectValidation(e);
        } else {
            setIncorrectValidation(e);
        }
    };

    const validateFiled = (e) => {
        if (e.target.name == "address2") {
            return;
        } else {
            if (e.target.name == "email") {
                isValidEmail(e);
            } else if (e.target.name == "phone") {
                isValidPhone(e);
            } else {
                if (e.target.value.length >= 2) {
                    setCorrectValidation(e);
                } else {
                    setIncorrectValidation(e);
                }
            }
        }
    };

    const fillFormData = (e) => {
        let newData = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
        validateFiled(e);
    };

    const toggleTermsCheckbox = (e) => {
        setTermsCheckbox(e.target.checked);
        if (e.target.checked == true) {
            setTermsValidation("");
        } else {
            setTermsValidation("incorrect");
        }
    };

    const showList = () => {
        if (toggleButton == "toggle-list") {
            setToggleButton("");
            setToggleButtonClass("");
        } else {
            setToggleButton("toggle-list");
            setToggleButtonClass("active-button");
        }
    };

    const makePurchase = () => {
        if (termsValidation == "incorrect") {
            setTermsShaking("horizontal-shake");
        } else if (!Object.values(formValidation).includes("incorrect")) {
            let cartOrderData = cartState.map((shoe) => ({
                product_id: JSON.parse(shoe.id),
                pair_id: JSON.parse(shoe.pair_id),
            }));
            const data = {
                order_items: cartOrderData,
                comment: "",
                discount_code: "",
                address: {
                    address_1: formData.address1,
                    address_2: formData.address2,
                    first_name: formData.fName,
                    last_name: formData.lName,
                    post_code: formData.pCode,
                    city: formData.city,
                    country: formData.country,
                    email: formData.email,
                    phone: formData.phone,
                },
            };
            try {
                ordersRequest
                    .createOrder(data)
                    .then((res) => {
                        emptyCart();
                        navigate("/user/orders");
                    })
                    .catch((res) => {
                        console.log(res);
                        setAlert({ color: "red", text: "notAvailable" });
                    });
                // navigate("/");
            } catch (err) {
                console.log(err);
            }
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
                    {/* <button className='login-btn'>Login</button> */}
                </div>
                <div className='name-form'>
                    <p className='title'>Enter your name and address:</p>

                    <input
                        className={formValidation["fName"]}
                        name='fName'
                        type='text'
                        placeholder='First Name'
                        onChange={fillFormData}
                        value={formData["fName"]}
                    />
                    <input
                        className={formValidation["lName"]}
                        name='lName'
                        type='text'
                        placeholder='Last Name'
                        onChange={fillFormData}
                        value={formData["lName"]}
                    />
                    <input
                        className={formValidation["address1"]}
                        name='address1'
                        type='text'
                        placeholder='Address Line 1'
                        onChange={fillFormData}
                        value={formData["address1"]}
                    />
                    <input
                        name='address2'
                        type='text'
                        placeholder='Address Line 2'
                        onChange={fillFormData}
                        value={formData["address2"]}
                    />
                    <div className='city-input'>
                        <input
                            className={formValidation["pCode"]}
                            name='pCode'
                            type='number'
                            placeholder='Postal Code'
                            onChange={fillFormData}
                            value={formData["pCode"]}
                        />
                        <input
                            className={formValidation["city"]}
                            name='city'
                            type='text'
                            placeholder='City'
                            onChange={fillFormData}
                            value={formData["city"]}
                        />
                    </div>
                    <input
                        className={formValidation["country"]}
                        name='country'
                        type='text'
                        placeholder='Country'
                        onChange={fillFormData}
                        value={formData["country"]}
                    />
                </div>
                <div className='contact-info'>
                    <p className='title'>What's your contact information?</p>

                    <input
                        className={formValidation["email"]}
                        name='email'
                        type='text'
                        placeholder='Email'
                        onChange={fillFormData}
                        value={formData["email"]}
                    />
                    <label for='email' className='note'>
                        A confirmation email will be sent after checkout.
                    </label>

                    <input
                        className={formValidation["phone"]}
                        name='phone'
                        type='number'
                        placeholder='Phone Number'
                        onChange={fillFormData}
                        value={formData["phone"]}
                    />
                    <label for='phone' className='note'>
                        A carrier might contact you to confirm delivery.
                    </label>
                </div>
                <div className='terms'>
                    <input
                        name='terms'
                        type='checkbox'
                        className={"checkbox-terms" + " " + termsShaking + " " + termsValidation}
                        onChange={toggleTermsCheckbox}
                        value={termsCheckbox}
                    />
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
                <div className='btn purchase-btn' onClick={makePurchase}>
                    Purchase
                </div>
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
            <Alert></Alert>
        </div>
    );
};
