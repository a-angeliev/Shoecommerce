export const Auth = () => {
    return (
        <div className="user" ref={userRef}>
            <h2>Login Now</h2>
            <input type="email" placeholder="Your Email" />
            <input type="password" name="" id="" placeholder="Your Password" />
            <input type="submit" value="Login" className="login-btn" />
            <p>Forget Password <a href="/#">Reset Now</a></p>
            <p>Don't have an account? <a href="/#">Sign Up</a></p>
        </div>
    );
}