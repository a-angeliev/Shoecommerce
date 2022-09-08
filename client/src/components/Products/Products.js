import { Link } from "react-router-dom";

import "./Products.css";

export const Products = () => {

    return (
        <section class="catalog">
            <div class="catalog-menu">
                <div class="catalog-search">
                    <input type="text" placeholder="Search Here" />
                </div>
                <div class="catalog-options">
                    <ul>
                        <li><Link to="">Male</Link></li>
                        <li><Link to="">Female</Link></li>
                        <li><Link to="">Children</Link></li>
                    </ul>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
            <div class="catalog-items-container">
                <div class="box">
                    <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
                        alt="" />
                </div>
                <div class="content">
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i class='bx bx-info-circle'></i>
                    <i class='bx bx-cart-alt'></i>
                </div>
            </div>
        </section>
    )
}