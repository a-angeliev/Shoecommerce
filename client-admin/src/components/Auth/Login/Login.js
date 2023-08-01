import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../Alert/Alert";
import { AlertContext } from "../../../contexts/AlertContext";
import { AuthContext } from "../../../contexts/AuthContext";
import * as userService from "../../../services/user";

import style from "./Login.module.css";

export const Login = () => {
    const { isAuthenticated, userLogin, isAdmin } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [shake, setShake] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(setShake, 1000, "");
    }, [shake]);

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const login = () => {
        if (emailInput === "" || passwordInput === "") {
            setShake("horizontal-shake");
        } else {
            userService
                .login({ password: passwordInput, email: emailInput })
                .then((userData) => {
                    if (JSON.parse(userData).role === "admin") {
                        userLogin(JSON.parse(userData));
                    } else {
                        setAlert({ color: "red", text: "You don't have permissions. Need to be admin!" });
                    }
                })
                .catch((err) => setAlert({ color: "red", text: err.message }));
        }
    };

    return (
        <div className={style["login-page"]}>
            <Alert></Alert>
            <div className={style["login-form"]}>
                <div className={style.logo}>
                    <h1>Shoecommerce</h1>
                </div>
                <div className={style.title}>
                    <h2>Admin panel</h2>
                </div>
                <div className={style["login-text"]}>Login</div>
                <div className={style.login}>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        className={emailInput === "" ? style[shake] : ""}
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={emailInput}
                        onChange={(e) => {
                            setEmailInput(e.target.value);
                        }}></input>

                    <label htmlFor='password'>Password</label>
                    <input
                        className={passwordInput === "" ? style[shake] : ""}
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={passwordInput}
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}></input>
                </div>
                <button id={style["login-btn"]} onClick={login}>
                    Sigh in
                </button>
            </div>
        </div>
    );
};
