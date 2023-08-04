import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertContext } from "../../../contexts/alertContext";
import { CartContext } from "../../../contexts/cartContext";
import * as ordersRequest from "../../../services/orders.js";

import "./CheckoutForm.css";

export const CheckoutForm = () => {
    const { cartState, emptyCart } = useContext(CartContext);
    const { setAlert } = useContext(AlertContext);

    const [termsCheckbox, setTermsCheckbox] = useState(false);
    const [termsValidation, setTermsValidation] = useState("incorrect");
    const [termsShaking, setTermsShaking] = useState("");
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
    const validationAction = {
        email: (e) => validateEmail(e),
        phone: (e) => validateByLength(e, 8),
        fName: (e) => validateByLength(e, 2),
        lName: (e) => validateByLength(e, 2),
        address1: (e) => validateByLength(e, 2),
        address2: () => {},
        pCode: (e) => validateByLength(e, 2),
        city: (e) => validateByLength(e, 2),
        country: (e) => validateByLength(e, 2),
    };

    const navigate = useNavigate();

    const validateEmail = (e) => {
        const result =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                e.target.value
            );
        if (result) setInputValidation(e, "");
        else setInputValidation(e, "incorrect");
    };

    const validateByLength = (e, length) => {
        if (e.target.value.length >= length) setInputValidation(e, "");
        else setInputValidation(e, "incorrect");
    };

    const validateFiled = (e) => validationAction[e.target.name](e);

    const setInputValidation = (e, state) => {
        let newFormValidation = { ...formValidation };
        newFormValidation[e.target.name] = state;
        setFormValidation(newFormValidation);
    };

    const inputHandler = (e) => {
        let newData = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
        validateFiled(e);
    };

    const checkInputValidation = () => {
        if (termsValidation === "incorrect") setTermsShaking("horizontal-shake");
        else if (!Object.values(formValidation).includes("incorrect")) return true;
        return false;
    };

    const toggleTermsCheckboxHandler = (e) => {
        setTermsCheckbox(e.target.checked);
        const toggleAction = {
            true: () => setTermsValidation(""),
            false: () => setTermsValidation("incorrect"),
        };
        toggleAction[e.target.checked]();
    };

    const makePurchase = () => {
        if (checkInputValidation()) {
            let cartItems = cartState.map((shoe) => ({
                product_id: JSON.parse(shoe.id),
                pair_id: JSON.parse(shoe.pair_id),
            }));
            const data = {
                order_items: cartItems,
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

            ordersRequest
                .createOrder(data)
                .then((_) => {
                    emptyCart();
                    setAlert({ color: "green", text: "Your order is created!" });
                    navigate("/user/orders");
                })
                .catch((res) => {
                    console.log(res);
                    setAlert({ color: "red", text: "Some of the products in your order are not available!" });
                });
        }
    };

    return (
        <>
            <div className='name-form'>
                <p className='title'>Enter your name and address:</p>

                <input
                    className={formValidation["fName"]}
                    name='fName'
                    type='text'
                    placeholder='First Name'
                    onChange={inputHandler}
                    value={formData["fName"]}
                />
                <input
                    className={formValidation["lName"]}
                    name='lName'
                    type='text'
                    placeholder='Last Name'
                    onChange={inputHandler}
                    value={formData["lName"]}
                />
                <input
                    className={formValidation["address1"]}
                    name='address1'
                    type='text'
                    placeholder='Address Line 1'
                    onChange={inputHandler}
                    value={formData["address1"]}
                />
                <input
                    name='address2'
                    type='text'
                    placeholder='Address Line 2'
                    onChange={inputHandler}
                    value={formData["address2"]}
                />
                <div className='city-input'>
                    <input
                        className={formValidation["pCode"]}
                        name='pCode'
                        type='number'
                        placeholder='Postal Code'
                        onChange={inputHandler}
                        value={formData["pCode"]}
                    />
                    <input
                        className={formValidation["city"]}
                        name='city'
                        type='text'
                        placeholder='City'
                        onChange={inputHandler}
                        value={formData["city"]}
                    />
                </div>
                <input
                    className={formValidation["country"]}
                    name='country'
                    type='text'
                    placeholder='Country'
                    onChange={inputHandler}
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
                    onChange={inputHandler}
                    value={formData["email"]}
                />
                <label htmlFor='email' className='note'>
                    A confirmation email will be sent after checkout.
                </label>

                <input
                    className={formValidation["phone"]}
                    name='phone'
                    type='number'
                    placeholder='Phone Number'
                    onChange={inputHandler}
                    value={formData["phone"]}
                />
                <label htmlFor='phone' className='note'>
                    A carrier might contact you to confirm delivery.
                </label>
            </div>
            <div className='terms'>
                <input
                    name='terms'
                    type='checkbox'
                    className={"checkbox-terms" + " " + termsShaking + " " + termsValidation}
                    onChange={toggleTermsCheckboxHandler}
                    value={termsCheckbox}
                />
                <p>
                    I have read and consent to eShopWorld processing my information in accordance with the
                    <span>
                        {" "}
                        <a
                            href='https://www.eshopworld.com/privacy-policy/'
                            className='link-privacy'
                            target='_blank'
                            rel='noreferrer'>
                            Privacy Statement
                        </a>{" "}
                    </span>
                    and{" "}
                    <span>
                        <a
                            href='https://www.eshopworld.com/cookie-policy/'
                            className='link-cookie'
                            target='_blank'
                            rel='noreferrer'>
                            Cookie Policy
                        </a>
                    </span>
                    {""}. eShopWorld is a trusted ShoeCommerce partner.{" "}
                </p>
            </div>
            <div className='btn purchase-btn' onClick={makePurchase}>
                Purchase
            </div>
        </>
    );
};
