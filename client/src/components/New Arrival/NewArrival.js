import "./NewArrival.css";
import { Swiper, SwiperSlide } from "swiper/react"

export const NewArrival = () => {


    return (
        <section className="new" id="new">
            <div className="heading">
                <h1>New <span>Arrival</span></h1>
            </div>

            <Swiper
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
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

                <div className="swiper wrapper">
                    <SwiperSlide className="swiper-slide box">
                        <img src="/images/982c8911d38400285bc5a426034c360c-removebg-preview.png" alt="" />
                        <div class="content">
                            <a href="#" class="btn">Buy Now</a>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide box">
                        <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png" alt="" />
                        <div class="content">
                            <a href="#" class="btn">Buy Now</a>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide box">
                        <img src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png" alt="" />
                        <div class="content">
                            <a href="#" class="btn">Buy Now</a>
                        </div>
                    </SwiperSlide>
                </div>

            </Swiper>
        </section>
    )
}