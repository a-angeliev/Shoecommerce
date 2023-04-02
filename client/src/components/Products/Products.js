import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FilterContext } from "../../contexts/filterContext";
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
    const [priceFilter, setPriceFilter] = useState([]);
    const [filteredProductsForDisplay, setFilteredProductsForDisplay] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const navigate = useNavigate();

    const {
        brandFilterCtx,
        categoryFilterCtx,
        genderCtx,
        priceFilterCtx,
        setBrandFilterCtx,
        setCategoryFilterCtx,
        setGenderCtx,
        setPriceFilterCtx,
    } = useContext(FilterContext);

    useEffect(() => {
        if (products) {
            const filteredProducts = products.filter((product) => product.gender === gender);
            const availableBrands = [...new Set(filteredProducts.map((product) => product.brand.name))];
            const availableCategories = [...new Set(filteredProducts.map((product) => product.category.title))];
            setFilteredProductsByGender(filteredProducts);
            setAvailableBrands(availableBrands);
            setAvailableCategories(availableCategories);
        }
        if (gender == genderCtx) {
            setBrandFilter(brandFilterCtx);
            setCategoryFilter(categoryFilterCtx);
            setPriceFilter(priceFilterCtx);
        } else {
            setBrandFilter([]);
            setCategoryFilter([]);
            setPriceFilter([]);
            setGenderCtx(gender);
            setBrandFilterCtx([]);
            setCategoryFilterCtx([]);
            setPriceFilterCtx([]);
        }
    }, [gender]);

    useEffect(() => {
        const products = [...filteredProductsByGender];
        const filteredProductsByBrandsAndCategory = products.filter((product) =>
            filterProductByCategoryAndBrand(product)
        );
        setFilteredProductsForDisplay(filteredProductsByBrandsAndCategory);
        setIsFilter(brandFilter.length == 0 && categoryFilter.length == 0 && priceFilter.length == 0 ? false : true);
    }, [brandFilter, categoryFilter, priceFilter]);

    const goToShoeDetailPage = (id) => {
        let path = "/product/" + id;
        navigate(path);
    };

    const filterProductByPrice = (product) => {
        const priceSections = {
            1: (price) => {
                return price < 99.99 ? true : false;
            },
            2: (price) => {
                return 100 < price && price < 199.99 ? true : false;
            },
            3: (price) => {
                return 200 < price && price < 299.99 ? true : false;
            },
            4: (price) => {
                return price > 300 ? true : false;
            },
        };

        if (priceFilter.length == 0) {
            return true;
        } else {
            for (let i = 0; i < priceFilter.length; i++) {
                const result = priceSections[priceFilter[i]](product.price);
                if (result === true) {
                    return true;
                }
            }
            return false;
        }
    };
    const filterProductByCategoryAndBrand = (product) => {
        let flag = true;
        if (brandFilter.length == 0 && categoryFilter.length == 0 && priceFilter.length == 0) {
            return product;
        }

        flag = filterProductByPrice(product);

        if (brandFilter.length != 0 && flag) {
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
            setBrandFilterCtx([...brandFilter, brand]);
        } else {
            const brands = [...brandFilter];
            brands.splice(brands.indexOf(brand), 1);
            setBrandFilter(brands);
            setBrandFilterCtx(brands);
        }
    };

    const handleCategoryChanges = (category) => {
        if (!categoryFilter.includes(category)) {
            setCategoryFilter([...categoryFilter, category]);
            setCategoryFilterCtx([...categoryFilter, category]);
        } else {
            const categories = [...categoryFilter];
            categories.splice(categories.indexOf(category), 1);
            setCategoryFilter(categories);
            setCategoryFilterCtx(categories);
        }
    };

    const handlePriceChanges = (prop) => {
        const copyPriceFilter = [...priceFilter];
        if (copyPriceFilter.includes(prop)) {
            copyPriceFilter.splice(copyPriceFilter.indexOf(prop), 1);
            setPriceFilter(copyPriceFilter);
            setPriceFilterCtx(copyPriceFilter);
        } else {
            setPriceFilter([...copyPriceFilter, prop]);
            setPriceFilterCtx([...copyPriceFilter, prop]);
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

                        {filteredProductsForDisplay ? (
                            <div>
                                <h3>Price</h3>
                                <div>
                                    <label htmlFor='under-50'>Under 99.99 USD</label>
                                    <input
                                        checked={priceFilter.includes("1") ? true : false}
                                        onChange={() => {
                                            handlePriceChanges("1");
                                        }}
                                        type='checkbox'
                                        name='under100'></input>
                                </div>
                                <div>
                                    <label htmlFor='100-200'>99.99 USD - 199.99 USD</label>
                                    <input
                                        checked={priceFilter.includes("2") ? true : false}
                                        onChange={() => {
                                            handlePriceChanges("2");
                                        }}
                                        type='checkbox'
                                        name='100-200'></input>
                                </div>
                                <div>
                                    <label htmlFor='200-300'>199.99 USD - 299.99 USD</label>
                                    <input
                                        checked={priceFilter.includes("3") ? true : false}
                                        onChange={() => {
                                            handlePriceChanges("3");
                                        }}
                                        type='checkbox'
                                        name='200-300'></input>
                                </div>
                                <div>
                                    <label htmlFor='over-300'>Over 299.99 USD</label>
                                    <input
                                        checked={priceFilter.includes("4") ? true : false}
                                        onChange={() => {
                                            handlePriceChanges("4");
                                        }}
                                        type='checkbox'
                                        name='over-300'></input>
                                </div>
                            </div>
                        ) : null}
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
