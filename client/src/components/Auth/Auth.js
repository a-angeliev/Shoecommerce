import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as authService from "../../services/user";
import "./Auth.css";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

export const Auth = ({ activeIcon }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
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
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password1") {
            setPassword1(e.target.value);
        } else if (e.target.name === "password2") {
            setPassword2(e.target.value);
        }
    };

    const onSubmit = (e) => {
        if (isSignIn) {
            if (email && password1) {
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
                        console.log(err.message);
                        setLoginError(err.message);
                    });
            } else {
                setLoginError("Fill email and password first");
            }
        }
    };
    return (
        <div className={`user ${localActiveIcon === "user" && "active"}`}>
            {isAuthenticated ? null : (
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
                        <input
                            type='password'
                            name='password2'
                            onChange={inputHandler}
                            value={password2}
                            placeholder='Repeat Password'
                        />
                    )}
                    <input type='submit' onClick={onSubmit} value='Login' className='login-btn' />
                    {loginError ? loginError : null}
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
