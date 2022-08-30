import "./Footer.css";


export const Footer = () => {

    return (
        <section className="footer">
            <div className="footer-box">
                <h2>Shoecommerce</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolore facere ut. Id, magnam
                    architecto?</p>
                <div className="social">
                    <a href="/"><i className='bx bxl-instagram'></i></a>
                    <a href="/"><i className='bx bxl-twitter'></i></a>
                    <a href="/"><i className='bx bxl-tiktok'></i></a>
                    <a href="/"><i className='bx bxl-pinterest'></i></a>
                </div>
            </div>
            <div className="footer-box">
                <h3>Support</h3>
                <li><a href="/">Product</a></li>
                <li><a href="/">Help & Support</a></li>
                <li><a href="/">Return Policy</a></li>
                <li><a href="/">Terms of Use</a></li>
                <li><a href="/">FAQ</a></li>
            </div>
            <div className="footer-box">
                <h3>Our Branches</h3>
                <li><a href="/">United States</a></li>
                <li><a href="/">Arab Emirates</a></li>
                <li><a href="/">Canada</a></li>
            </div>
        </section>
    )
}