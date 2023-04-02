import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/productContext";

import "./Products.css";

export const Products = () => {
    const { gender } = useParams();
    const { products } = useContext(ProductContext);
    const [filteredProductsByGender, setFilteredProductsByGender] = useState([]);
    const [availableBrands, setAvailableBrands] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [filteredProductsForDisplay, setFilteredProductsForDisplay] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (products) {
            const filteredProducts = products.filter((product) => product.gender === gender);
            const availableBrands = [...new Set(filteredProducts.map((product) => product.brand.name))];
            const availableCategories = [...new Set(filteredProducts.map((product) => product.category.title))];
            setFilteredProductsByGender(filteredProducts);
            setAvailableBrands(availableBrands);
            setAvailableCategories(availableCategories);
        }
        setBrandFilter([]);
        setCategoryFilter([]);
    }, [gender]);



    useEffect(() => {
        const products = [...filteredProductsByGender];
        const filteredProductsByBrands = products.filter((product) => filterProductByCategoryAndBrand(product));
        setFilteredProductsForDisplay(filteredProductsByBrands);
        setIsFilter(brandFilter.length == 0 && categoryFilter.length == 0 ? false : true);
    }, [brandFilter, categoryFilter]);

    const goToShoeDetailPage = (id) => {
        let path = "/product/" + id;
        navigate(path);
    };

    const filterProductByCategoryAndBrand = (product) => {
        let flag = true;
        if (brandFilter.length == 0 && categoryFilter.length == 0) {
            return product;
        }

        if (brandFilter.length != 0) {
            flag = brandFilter.includes(product.brand.name);
        }
        if (categoryFilter.length != 0 && flag) {
            flag = categoryFilter.includes(product.category.title);
        }
        if (flag) {
            return product;
        }
    };
    
    const handleBrandChanges = (brand) => {
        if (!brandFilter.includes(brand)) {
            setBrandFilter([...brandFilter, brand]);
        } else {
            const brands = [...brandFilter];
            brands.splice(brands.indexOf(brand), 1);
            setBrandFilter(brands);
        }
    };

    const handleCategoryChanges = (category) => {
        if (!categoryFilter.includes(category)) {
            setCategoryFilter([...categoryFilter, category]);
        } else {
            const categories = [...categoryFilter];
            categories.splice(categories.indexOf(category), 1);
            setCategoryFilter(categories);
        }
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
                        <i onClick={() => goToShoeDetailPage(product.id)} className='bx bx-cart-alt'></i>
                    </div>
                </div>
            </div>
        );
    };

    if (!filteredProductsByGender) {
        return <div></div>;
    }

    return (
        <section className='catalog'>
            <div className='catalog-menu'>
                <div className='catalog-options'>
                    <ul>
                        {/* <li><Link to="">Male</Link></li>
							<li><Link to="">Female</Link></li>
							<li><Link to="">Children</Link></li> */}
                        {availableBrands ? <h3 className='brand-title'>Brands</h3> : null}
                        {availableBrands.map((brand, idx) => (
                            <div>
                                <label htmlFor={brand}>{brand}</label>
                                <input
                                    checked={brandFilter.includes(brand) ? true : false}
                                    onChange={() => handleBrandChanges(brand)}
                                    type='checkbox'
                                    name={brand}
                                    key={idx}></input>
                            </div>
                        ))}

                        {availableCategories ? <h3 className='category-title'>Categories</h3> : null}
                        {availableCategories.map((category, idx) => (
                            <div>
                                <label htmlFor={category}>{category}</label>
                                <input
                                    checked={categoryFilter.includes(category) ? true : false}
                                    onChange={() => handleCategoryChanges(category)}
                                    type='checkbox'
                                    name={category}
                                    key={idx}></input>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            {isFilter
                ? filteredProductsForDisplay.map((product) => displayProduct(product))
                : filteredProductsByGender.map((product) => displayProduct(product))}
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
