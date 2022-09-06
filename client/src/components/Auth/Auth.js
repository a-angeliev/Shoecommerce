import { useState } from "react";
import { Link } from 'react-router-dom'

export const Auth = ({ activeIcon }) => {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleSwitchMode = () => {
        setIsSignIn(prevState => !prevState);
    }

    return (
        <div className={`user ${activeIcon === 'user' && 'active'}`}>
            <h2>
                {isSignIn ? 'Login Now' : 'Register Now'}
            </h2>
            <input type="email" placeholder="Your Email" />
            <input type="password" name="" id="" placeholder="Your Password" />
            {!isSignIn &&
                <input type="password" name="" id="" placeholder="Repeat Password" />
            }
            <input type="submit" value="Login" className="login-btn" />
            <p>Forget Password <a href="/#">Reset Now</a></p>
            <p className="user-auth-question">
                {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}
                <Link
                    to={''}
                    onClick={handleSwitchMode}
                >
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                </Link>
            </p>
        </div>
    );
}