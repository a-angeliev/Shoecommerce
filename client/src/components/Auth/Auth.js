import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/Auth";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu";
import * as authService from "../../services/user";

import "./Auth.css";
import { useNavigationWithHistory } from "../../hooks/useNavigation";

export const Auth = ({ activeIcon }) => {
    const { userLogin, isAuthenticated } = useContext(AuthContext);

    const [inputData, setInputData] = useState({
        email: "",
        password1: "",
        password2: "",
        fname: "",
        lname: "",
        phone: "",
    });
    const [isSignIn, setIsSignIn] = useState(true);
    const [loginError, setLoginError] = useState([]);
    const [localActiveIcon, setLocalActiveIcon] = useState("");

    const navigate = useNavigationWithHistory();

    useEffect(() => {
        setLocalActiveIcon(activeIcon);
    }, [activeIcon]);

    useEffect(() => {
        setLoginError([]);
    }, []);

    const handleSwitchMode = () => {
        setIsSignIn((prevState) => !prevState);
        setLoginError([]);
    };

    const inputHandler = (e) => {
        const updatedInputData = { ...inputData };
        updatedInputData[e.target.name] = e.target.value;
        setInputData(updatedInputData);
    };

    const errors = [];
    const collectErrors = (err) => {
        Object.values(err).forEach((element) => {
            if (typeof element === "object") {
                return collectErrors(element);
            } else {
                if (element.slice(0, 1) == "L") {
                    element = "Password " + element;
                }
                errors.push(element);
            }
            setLoginError(errors);
        });
    };

    const checkAllFieldsFilled = (operation) => {
        if (operation === "login") {
            if (inputData.email && inputData.password1) return true;
            setLoginError(["Fill email and password first"]);
            return false;
        } else {
            if (
                inputData.email &&
                inputData.password1 &&
                inputData.password2 &&
                inputData.fname &&
                inputData.lname &&
                inputData.phone
            )
                return true;
            setLoginError(["Fill all fields first"]);
            return false;
        }
    };

    const checkIsValidEmail = () => {
        const result =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                inputData.email
            );
        if (!result) setLoginError(["Wrong email or password!"]);
        return result;
    };

    const checkIsSamePasswords = () => {
        if (inputData.password1 === inputData.password2) return true;
        setLoginError(["Both passwords should be same"]);
        return false;
    };

    const login = () => {
        if (checkAllFieldsFilled("login")) {
            authService
                .login({ email: inputData.email, password: inputData.password1 })
                .then((authData) => {
                    console.log(123, JSON.parse(authData));
                    userLogin(JSON.parse(authData));
                    navigate("/");
                })
                .catch((err) => {
                    console.log(321, err);
                    collectErrors(err);
                });
        }
    };

    const register = () => {
        if (checkAllFieldsFilled("register") && checkIsSamePasswords() && checkIsValidEmail()) {
            authService
                .register({
                    email: inputData.email,
                    password: inputData.password1,
                    user_data: { f_name: inputData.fname, l_name: inputData.lname, phone: inputData.phone },
                })
                .then((authData) => {
                    userLogin(JSON.parse(authData));
                    setLocalActiveIcon("");
                    navigate("/");
                })
                .catch((err) => {
                    console.log("asd");
                    collectErrors(err);
                });
        }
    };

    const displayErrors = () => {
        const errors = [];
        loginError.forEach((err) => errors.push(<p className='error-message'>{err}</p>));
        return <>{errors}</>;
    };

    return (
        <div className={`user ${localActiveIcon === "user" && "active"}`}>
            {isAuthenticated ? (
                <ProfileMenu />
            ) : (
                <>
                    <h2>{isSignIn ? "Login Now" : "Register Now"}</h2>

                    <input
                        onChange={inputHandler}
                        type='email'
                        name='email'
                        value={inputData.email}
                        placeholder='Your Email'
                    />
                    <input
                        onChange={inputHandler}
                        type='password'
                        name='password1'
                        value={inputData.password1}
                        placeholder='Your Password'
                    />
                    {!isSignIn && (
                        <>
                            <input
                                type='password'
                                name='password2'
                                onChange={inputHandler}
                                value={inputData.password2}
                                placeholder='Repeat Password'
                            />
                            <input
                                type='string'
                                name='fname'
                                onChange={inputHandler}
                                value={inputData.fname}
                                placeholder='First Name'
                            />
                            <input
                                type='string'
                                name='lname'
                                onChange={inputHandler}
                                value={inputData.lname}
                                placeholder='Last Name'
                            />
                            <input
                                type='number'
                                name='phone'
                                onChange={inputHandler}
                                value={inputData.phone}
                                placeholder='phone'
                            />
                        </>
                    )}
                    {isSignIn ? (
                        <input type='submit' onClick={login} value='Login' className='login-btn' />
                    ) : (
                        <input type='submit' onClick={register} value='Register' className='login-btn' />
                    )}
                    {loginError.length !== 0 ? displayErrors() : null}
                    <p>
                        Forgot Password <a href='/#'>Reset Now</a>
                    </p>
                    <p className='user-auth-question'>
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}
                        <Link to={""} onClick={handleSwitchMode}>
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </Link>
                    </p>
                </>
            )}
        </div>
    );
};
