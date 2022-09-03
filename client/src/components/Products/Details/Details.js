import { MorePhotos } from './MorePhotos/MorePhotos';
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
                            <button className="main-shoe-button">
                                Add to Cart
                            </button>
                        </section>
                    </article>
                </section>

                <MorePhotos />
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