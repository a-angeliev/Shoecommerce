import { NewArrival } from "../New Arrival/NewArrival";
import { Reviews } from "../Reviews/Reviews";
import { useNav } from "../../hooks/useNavigation";

import "./Home.css";

export const Home = () => {
    const navTo = useNav();

    return (
        <>
            <section className='home' id='home'>
                <div className='home-text'>
                    <span>Step into Style</span>
                    <h1 className='home-title'>New Arrival of</h1>
                    <h1 className='home-title-2'>Fresh Products</h1>
                    <a
                        onClick={() => {
                            navTo("/products/woman");
                        }}
                        className='btn'>
                        Shop Now
                    </a>
                </div>
                <div className='home-img'>
                    <img src='/images/image-1600-14.jpg' alt='' />
                </div>
            </section>

            <NewArrival />
            <Reviews />
        </>
    );
};
