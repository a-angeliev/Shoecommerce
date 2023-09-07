import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../../../contexts/productContext";
import "./Recommended.css";
import { useNavigationWithHistory } from "../../../../hooks/useNavigation";

export const Recommended = (props) => {
    const gender = props.gender;
    const [recommendedProducts, setRecommenderProducts] = useState([]);
    const [path, setPath] = useState("");
    const { products } = useContext(ProductContext);
    const navigate = useNavigationWithHistory();

    useEffect(() => {
        if (typeof products !== "string") {
            const filteredProducts = products.filter((product) => product.gender === gender);
            filteredProducts.sort(() => Math.random() - 0.5);
            setRecommenderProducts(filteredProducts.slice(0, 6));
        }
    }, [products, path]);

    const goToShoeDetailPage = (id) => {
        // window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        let path = "/product/" + id;
        setPath(path);
        navigate(path);
    };

    const listRecommendedProduct = (product) => {
        return (
            <li className='main-recommended-item'>
                <img src={product.images[0].img_url} alt='shoe picture' />
                <h4 className='main-shoe-name'>{product.title}</h4>
                <h5 className='main-shoe-price'>{product.price} USD</h5>
                <button onClick={() => goToShoeDetailPage(product.id)} className='main-shoe-button'>
                    Find More
                </button>
            </li>
        );
    };

    return (
        <section className='main-shoes-recommended scn'>
            <h2 className='main-recommended-title'>You may also like</h2>
            <ul className='main-recommended-list'>
                {recommendedProducts.length !== 0
                    ? recommendedProducts.map((product) => listRecommendedProduct(product))
                    : null}
            </ul>
        </section>
    );
};
