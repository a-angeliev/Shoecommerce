import "./Footer.css";
import { Copyright } from "../Copyright/Copyright";

export const Footer = () => {
    return (
        <footer className='foot'>
            <div className='footer'>
                <ul className='footer-box'>
                    <h2>Shoecommerce</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolore facere ut. Id, magnam
                        architecto?
                    </p>
                    <ul className='social'>
                        <a href='/'>
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href='/'>
                            <i className='bx bxl-twitter'></i>
                        </a>
                        <a href='/'>
                            <i className='bx bxl-tiktok'></i>
                        </a>
                        <a href='/'>
                            <i className='bx bxl-pinterest'></i>
                        </a>
                    </ul>
                </ul>
                <ul className='footer-box'>
                    <h3>Support</h3>
                    <li>
                        <a href='/'>Product</a>
                    </li>
                    <li>
                        <a href='/'>Help & Support</a>
                    </li>
                    <li>
                        <a href='/'>Return Policy</a>
                    </li>
                    <li>
                        <a href='/'>Terms of Use</a>
                    </li>
                    <li>
                        <a href='/'>FAQ</a>
                    </li>
                </ul>
                <ul className='footer-box'>
                    <h3>Our Branches</h3>
                    <li>
                        <a href='/'>United States</a>
                    </li>
                    <li>
                        <a href='/'>Arab Emirates</a>
                    </li>
                    <li>
                        <a href='/'>Canada</a>
                    </li>
                </ul>
            </div>
            <Copyright />
        </footer>
    );
};
