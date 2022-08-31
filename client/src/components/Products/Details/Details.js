import { Recommended } from './Recommended/Recommended';

import './Details.css';

export const Details = () => {
    return (
        <main className="main-details">
            <div className="main-wrapper">
                <section className="main-shoe-content scn">
                    <img className="main-shoe"
                        src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f999338b-b2e7-40bc-8737-1b3a93dc5706/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                        alt="Nike Jordan" />
                    <article className="main-shoe-info">
                        <h1 className="main-shoe-name">
                            Air Jordan XXXVI FS
                        </h1>
                        <h2 className="main-shoe-second-title">
                            Men's Basketball Shoes
                        </h2>
                        <h3 className="main-shoe-price">
                            $369.99
                        </h3>
                        <p className="main-shoe-description">
                            Next up in the iconic AJ franchise: a wearable expression of the drive and energy that sparked a
                            basketball revolution. Its design is minimal but durable, resulting in one of the lightest Air
                            Jordan game shoes to date. Equipped with a full-length Zoom Air Strobel unit stacked over a Zoom
                            Air unit in the forefoot, you'll get energy return and elite responsiveness when you need it.
                            Step on the court with the confidence that whatever you do—it's light work.
                        </p>
                        <section className="main-shoe-colors scn">
                            <span className="main-shoe-size">
                                <label htmlFor="size">Choose a size:</label>

                                <select className="main-shoe-sizes" name="size" id="size">
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                    <option value="45">45</option>
                                </select>
                            </span>
                            <ul className="main-shoe-color-list">
                                <li className="main-shoe-color">white</li>
                                <li className="main-shoe-color">red</li>
                                <li className="main-shoe-color">blue</li>
                                <li className="main-shoe-color">black</li>
                            </ul>
                        </section>
                        <button className="main-shoe-button">
                            Add to Cart
                        </button>
                    </article>
                </section>
                <section className="main-shoe-more--images scn">
                    <ul className="main-shoe-images-list">
                        <li className="main-shoe-img-item">
                            <img src="https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/b3862d6f-d51b-4a56-b9e9-b3d10f37acce/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                                alt="Air Jordan XXXVI FS" />
                        </li>
                        <li className="main-shoe-img-item">
                            <img src="https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/73a3c686-bcfc-4d35-8c07-f3fef164705d/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                                alt="Air Jordan XXXVI FS" />
                        </li>
                        <li className="main-shoe-img-item">
                            <img src="https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/bdb9a600-174d-428e-a981-f6b7233d7cd1/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                                alt="Air Jordan XXXVI FS" />
                        </li>
                        <li className="main-shoe-img-item">
                            <img src="https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/572ea72c-66d3-4be4-a940-f161fda01e1a/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                                alt="Air Jordan XXXVI FS" />
                        </li>
                        <li className="main-shoe-img-item">
                            <img src="https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/9ee28f6b-be55-400e-af9c-d6419676be5a/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                                alt="Air Jordan XXXVI FS" />
                        </li>
                        <li className="main-shoe-img-item">
                            <img src="https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,q_80,w_440/a427af8a-b5fa-43c2-964c-743aae124d9c/air-jordan-xxxvi-fs-basketball-shoes-BdpjNf.png"
                                alt="Air Jordan XXXVI FS" />
                        </li>
                    </ul>
                </section>
                <section className="main-shoe-more-info scn">
                    <h2 className="main-more-title">
                        It's Light Work
                    </h2>
                    <p className="main-more-text-content">
                        The Air Jordan XXXVI isn't just the next up in the iconic franchise; it's an expression of the drive
                        and energy that sparked a basketball revolution. It's one of the lightest Air Jordan game shoes to
                        date, featuring a minimal but durable Leno-Weave upper reinforced with a TPU ribbon. It also comes
                        equipped with a full-length Zoom Air Strobel unit stitched directly to the upper, stacked over a
                        Zoom Air unit in the forefoot, providing a sensation of energy return and elite responsiveness. Step
                        on the court with the confidence that whatever you do—it's light work.
                    </p>
                    <img src="https://static.nike.com/a/images/w_1920,c_limit,f_auto,q_auto/6a6f0afc-1bc0-4742-8772-02e4068de99e/image.jpg"
                        alt="Jordan" />
                </section>
                <Recommended />
                <section className="main-shoe-reviews scn">
                </section>
            </div>
        </main>
    );
}

export default Details;