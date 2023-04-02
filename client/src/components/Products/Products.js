import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/productContext";

import "./Products.css";

export const Products = () => {
    const { gender } = useParams();
    const { products } = useContext(ProductContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
	const [availableBrands, setAvailableBrands] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        if (products) {
            setFilteredProducts(
                products.filter((product) => product.gender === gender)
            );
        }
    }, [gender]);

    const goToShoeDetailPage = (id) => {
        let path = "/product/" + id;
        navigate(path);
    };

    const displayProduct = (product) => {
        return (
            <div className='catalog-items-container'>
                <div className='box'>
                    <img src={product.images[0].img_url} alt='' />
                </div>
                <div className='content'>
                    <h1>{product.title}</h1>
                    <div className='priceB'>
                        <span>{product.price} USD</span>
                        <i
                            onClick={() => goToShoeDetailPage(product.id)}
                            className='bx bx-cart-alt'></i>
                    </div>
                </div>
            </div>
        );
    };

    if (!filteredProducts) {
        return <div></div>;
    }

    return (
        <section className='catalog'>
            <div className='catalog-menu'>
                <div className='catalog-options'>
                    {/* <ul>
							<li><Link to="">Male</Link></li>
							<li><Link to="">Female</Link></li>
							<li><Link to="">Children</Link></li>
						</ul> */}
                </div>
            </div>
            {filteredProducts.map((product) => displayProduct(product))}
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <div className='priceB'>
                        <span>240.99 USD</span>
                        <i className='bx bx-cart-alt'></i>
                    </div>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
            <div className='catalog-items-container'>
                <div className='box'>
                    <img
                        src='/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png'
                        alt=''
                    />
                </div>
                <div className='content'>
                    <h1>Nike Air Jordan 1</h1>
                    <span>$240</span>
                    <i className='bx bx-info-circle'></i>
                    <i className='bx bx-cart-alt'></i>
                </div>
            </div>
        </section>
    );
};
