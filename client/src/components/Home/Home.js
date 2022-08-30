import "./Home.css"

export const Home = () => {


    return (
        <section className="home" id="home">
            <div className="home-text">
                <span>Shop Now</span>
                <h1>New Arrival of <br /> Fresh Products</h1>
                <a href="/Shop" className="btn">Shop Now</a>
            </div>
            <div className="home-img">
                <img src="/images/image-1600-14.jpg" alt="" />
            </div>
        </section>
    )
}