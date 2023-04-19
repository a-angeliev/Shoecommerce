import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as authService from "../../services/user";
import "./Auth.css";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu";

export const Auth = ({ activeIcon }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");

    const [loginError, setLoginError] = useState("");
    const [localActiveIcon, setLocalActiveIcon] = useState("");
    const { userLogin, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLocalActiveIcon(activeIcon);
    }, [activeIcon]);

    const handleSwitchMode = () => {
        setIsSignIn((prevState) => !prevState);
    };

    const inputHandler = (e) => {
        const input = {
            email: () => setEmail(e.target.value),
            password1: () => setPassword1(e.target.value),
            password2: () => setPassword2(e.target.value),
            fname: () => setFname(e.target.value),
            lname: () => setLname(e.target.value),
            phone: () => setPhone(e.target.value),
        };
        if (Object.keys(input).includes(e.target.name)) {
            input[e.target.name]();
        }
        // if (e.target.name === "email") {
        //     setEmail(e.target.value);
        // } else if (e.target.name === "password1") {
        //     setPassword1(e.target.value);
        // } else if (e.target.name === "password2") {
        //     setPassword2(e.target.value);
        // } else if (e.target.name === "fname") {
        //     setFname(e.target.value);
        // } else if (e.target.name === "lname") {
        //     setLname(e.target.value);
        // } else if (e.target.name === "phone") {
        //     setPhone(e.target.value);
        // }
    };

    function isValidEmail(email) {
        const result = /\S+@\S+\.\S+/.test(email);
        return !result;
    }

    const onSubmit = (e) => {
        if (isSignIn) {
            if (email && password1) {
                if (!isValidEmail(email)) {
                    authService
                        .login({ email: email, password: password1 })
                        .then((authData) => {
                            const result = JSON.parse(authData);
                            if (result.token) {
                                userLogin(authData);
                                setLocalActiveIcon("");
                                navigate("/");
                            } else {
                                alert(JSON.stringify(authData["message"]));
                            }
                        })
                        .catch((err) => {
                            console.dir(err.message);
                            // setLoginError(err.message);
                        });
                } else {
                    setLoginError("Wrong email or password!");
                }
            } else {
                setLoginError("Fill email and password first");
            }
        } else {
            if (email && password1 && password2 && fname && lname && phone) {
                if (isValidEmail(email)) {
                    setLoginError("Is not a valid email.");
                } else if (fname.length < 2 || fname.length > 60) {
                    setLoginError("First name length must be between 2 and 60.");
                } else if (lname.length < 2 || lname.length > 60) {
                    setLoginError("Last name length must be between 2 and 60.");
                } else if (password1 === password2) {
                    authService
                        .register({
                            email: email,
                            password: password1,
                            user_data: { f_name: fname, l_name: lname, phone: phone },
                        })
                        .then((authData) => {
                            const result = JSON.parse(authData);
                            if (result.token) {
                                userLogin(authData);
                                setLocalActiveIcon("");
                                navigate("/");
                            } else {
                                alert(JSON.stringify(authData["message"]));
                            }
                        })
                        .catch((err) => {
                            console.dir(err);
                            setLoginError(err.message);
                        });
                } else {
                    setLoginError("Both passwords should be same");
                }
            } else {
                setLoginError("Fill all fields first");
            }
        }
    };
    return (
        <div className={`user ${localActiveIcon === "user" && "active"}`}>
            {isAuthenticated ? (
                <ProfileMenu />
            ) : (
                <>
                    <h2>{isSignIn ? "Login Now" : "Register Now"}</h2>

                    <input onChange={inputHandler} type='email' name='email' value={email} placeholder='Your Email' />
                    <input
                        onChange={inputHandler}
                        type='password'
                        name='password1'
                        value={password1}
                        placeholder='Your Password'
                    />
                    {!isSignIn && (
                        <>
                            <input
                                type='password'
                                name='password2'
                                onChange={inputHandler}
                                value={password2}
                                placeholder='Repeat Password'
                            />
                            <input
                                type='string'
                                name='fname'
                                onChange={inputHandler}
                                value={fname}
                                placeholder='First Name'
                            />
                            <input
                                type='string'
                                name='lname'
                                onChange={inputHandler}
                                value={lname}
                                placeholder='Last Name'
                            />
                            <input
                                type='number'
                                name='phone'
                                onChange={inputHandler}
                                value={phone}
                                placeholder='phone'
                            />
                        </>
                    )}
                    {isSignIn ? (
                        <input type='submit' onClick={onSubmit} value='Login' className='login-btn' />
                    ) : (
                        <input type='submit' onClick={onSubmit} value='Register' className='login-btn' />
                    )}
                    {loginError ? <p className='error-message'>{loginError}</p> : null}
                    <p>
                        Forget Password <a href='/#'>Reset Now</a>
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
