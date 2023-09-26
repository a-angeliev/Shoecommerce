import { Copyright } from "../Copyright/Copyright";

import "./Footer.css";

export const Footer = () => {
    return (
        <footer className='foot'>
            <div className='footer'>
                <ul className='footer-box'>
                    <h2>Shoecommerce</h2>
                    <p>
                        Step into style with our exclusive collection of footwear, crafted to elevate your every stride.
                    </p>
                    <ul className='social'>
                        <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href='https://twitter.com/?lang=en' target='_blank' rel='noopener noreferrer'>
                            <i className='bx bxl-twitter'></i>
                        </a>
                        <a href='https://www.tiktok.com/en/' target='_blank' rel='noopener noreferrer'>
                            <i className='bx bxl-tiktok'></i>
                        </a>
                        <a href='https://www.pinterest.com/' target='_blank' rel='noopener noreferrer'>
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
                        <a
                            href='https://www.google.com/search?q=unated+states&oq=unated+states&aqs=chrome..69i57j46i10i512j0i10i512l7.3389j0j4&sourceid=chrome&ie=UTF-8'
                            target='_blank'
                            rel='noopener noreferrer'>
                            United States
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://www.google.com/search?q=arab+emirates&sxsrf=APwXEdfYKqccgQLz9TwOdEUUK5x2Agg2oA%3A1687255689658&ei=iXqRZIvYJ56Fxc8Pn9iCoA0&ved=0ahUKEwjLwJugzdH_AhWeQvEDHR-sANQQ4dUDCA8&uact=5&oq=arab+emirates&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIICC4QigUQkQIyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyFgguEIoFEJECEJcFENwEEN4EEOAEGAM6CggAEEcQ1gQQsAM6CggAEIoFELADEEM6DQgAEOQCENYEELADGAE6DwguEIoFEMgDELADEEMYAjoHCCMQigUQJzoHCAAQigUQQzoFCC4QgAQ6CwguEIAEEMcBEK8BOgcILhCKBRBDOg0ILhCKBRDHARDRAxBDOhUILhCKBRBDEJcFENwEEN4EEOAEGAM6BAgjECc6BwgjEOoCECc6DwguEIoFEOoCELQCEEMYBDoPCAAQigUQ6gIQtAIQQxgEOgsILhCABBDHARDRAzoKCC4QigUQ1AIQQzoICAAQgAQQywE6CAguEIAEEMsBOgsILhCvARDHARCABDoKCAAQgAQQChDLAUoECEEYAFCRDFj6N2DzOGgCcAF4AIABigGIAd4NkgEEMTQuNJgBAKABAbABFMABAcgBE9oBBggBEAEYCdoBBggCEAEYCNoBBggDEAEYFNoBBggEEAEYAQ&sclient=gws-wiz-serp'
                            target='_blank'
                            rel='noopener noreferrer'>
                            Arab Emirates
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://www.google.com/search?q=canada&sxsrf=APwXEdeeEszQRbyANDFi1wvRI2Z4Nqhrug%3A1687255645085&ei=XXqRZODbBILw6AOG9JtY&ved=0ahUKEwig_vqKzdH_AhUCOHoKHQb6BgsQ4dUDCA8&uact=5&oq=canada&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIICC4QigUQkQIyCAgAEIoFEJECMgcIABCKBRBDMgcIABCKBRBDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMhYILhCKBRCRAhCXBRDcBBDeBBDgBBgBOgcIIxCKBRAnOgQIIxAnOgUILhCABDoLCC4QgAQQxwEQ0QM6CwguEIAEEMcBEK8BSgQIQRgAUABYyAdgpgloAHABeACAAYwBiAGKBZIBAzEuNZgBAKABAcABAdoBBggBEAEYFA&sclient=gws-wiz-serp'
                            target='_blank'
                            rel='noopener noreferrer'>
                            Canada
                        </a>
                    </li>
                </ul>
            </div>
            <Copyright />
        </footer>
    );
};
