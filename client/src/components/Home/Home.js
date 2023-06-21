import { useContext } from "react";
import { ProductContext } from "../../contexts/productContext";
import { NewArrival } from "../New Arrival/NewArrival";
import { Products } from "../Products/Products";
import { Reviews } from "../Reviews/Reviews";
import "./Home.css";

export const Home = () => {
    return (
        <>
            <section className='home' id='home'>
                <div className='home-text'>
                    <span>Step into Style</span>
                    <h1 className='home-title'>
                        {/* New Arrival of <br /> Fresh Products */}
                        New Arrival of
                    </h1>
                    <h1 className='home-title-2'>Fresh Products</h1>
                    <a href='#new' className='btn'>
                        Shop Now
                    </a>
                </div>
                <div className='home-img'>
                    <img src='/images/image-1600-14.jpg' alt='' />
                </div>
            </section>

            <NewArrival />
            {/* <Products /> */}
            <Reviews />
        </>
    );
};
