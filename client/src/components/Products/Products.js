import { Link } from "react-router-dom";

import "./Products.css";

export const Products = () => {

    return (
        <section className="catalog">
            <div className="catalog-menu">
                <div className="catalog-search">
                    <input type="text" placeholder="Search Here" />
                </div>
                <div className="catalog-options">
                    <ul>
                        <li><Link to="">Male</Link></li>
                        <li><Link to="">Female</Link></li>
                        <li><Link to="">Children</Link></li>
                    </ul>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className="catalog-items-container">
                <div className="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div className="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
        </section>
    )
}