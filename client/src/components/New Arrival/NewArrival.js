import "./NewArrival.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/productContext";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { useNavigationWithHistory } from "../../hooks/useNavigation";

export const NewArrival = () => {
    const { products } = useContext(ProductContext);
    const [newArrival, setNewArrival] = useState([]);
    const navigate = useNavigationWithHistory();
    useEffect(() => {
        if (products) {
            products.sort((product1, product2) => product2.id - product1.id);
        }
        setNewArrival(products.slice(0, 6));
    }, [products]);

    const goToShoeDetailPage = (id) => {
        let path = "/product/" + id;
        navigate(path);
    };

    const listNewProduct = (product) => {
        return (
            <SwiperSlide className='swiper-slide box'>
                <img src={product.images[0].img_url} alt='' />
                <div className='content'>
                    <a onClick={() => goToShoeDetailPage(product.id)} className='btn'>
                        Buy Now
                    </a>
                </div>
            </SwiperSlide>
        );
    };
    const dummyShoes = () => {
        return (
            <SwiperSlide className='swiper-slide box'>
                <img src='/images/982c8911d38400285bc5a426034c360c-removebg-preview.png' alt='' />
                <div className='content'>
                    <a href='/#' className='btn'>
                        Buy Now
                    </a>
                </div>
            </SwiperSlide>
        );
    };

    return (
        <section className='new' id='new'>
            <div className='heading'>
                <h1>
                    New <span>Arrival</span>
                </h1>
            </div>

            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar]}
                spaceBetween={20}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                loop={true}
                autoplay={{
                    // start: true,
                    delay: 2000,
                    // disableOnInteraction: false,
                }}
                onSlideChange={() => console.log("slide change")}
                centeredSlides={true}
                breakpoints={{
                    0: {
                        slidesPerView: 0,
                    },
                    568: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1020: {
                        slidesPerView: 3,
                    },
                }}
                className='swiper new-arrival'>
                <div className='swiper wrapper'>
                    {newArrival.length !== 0
                        ? newArrival.map((product) => listNewProduct(product))
                        : Array.from({ length: 3 }, () => dummyShoes())}
                </div>
            </Swiper>
        </section>
    );
};
