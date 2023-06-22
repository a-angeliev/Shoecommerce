import style from "./Login.module.css";

import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

export const Login = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={style["login-page"]}>
            <div className={style["login-form"]}>
                <div className={style.logo}>
                    <h1>Shoecommerce</h1>
                </div>
                <div className={style.title}>
                    <h2>Admin panel</h2>
                </div>
                <div className={style["login-text"]}>Login</div>
                <div className={style.login}>
                    <label for='email'>Your Email</label>
                    <input name='email' placeholder='Email'></input>

                    <label for='password'>Password</label>
                    <input name='password' placeholder='Password'></input>
                </div>
                <button id={style["login-btn"]}>Sigh in</button>
            </div>
        </div>
    );
};
