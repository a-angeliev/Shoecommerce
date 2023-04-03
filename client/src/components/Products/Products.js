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
    const [sortedBy, setSortedBy] = useState("");
    const navigate = useNavigate();

    const {
        brandFilterCtx,
        categoryFilterCtx,
        genderCtx,
        priceFilterCtx,
        sortedByCtx,
        setBrandFilterCtx,
        setCategoryFilterCtx,
        setGenderCtx,
        setPriceFilterCtx,
        setSortedByCtx,
    } = useContext(FilterContext);

    const sortProducts = () => {
        console.log(sortedByCtx, "sorted by");

        if (sortedBy === "Price: High-Low") {
            let sortedArray = [...filteredProductsForDisplay];
            sortedArray.sort((product1, product2) => (product1.price < product2.price ? 1 : -1));
            console.log(sortedArray,123);

            return sortedArray
        } else if (sortedByCtx === "Price: Low-High") {
            
            let sortedArray = [...filteredProductsForDisplay];
            sortedArray.sort((product1, product2) => (product1.price > product2.price ? 1 : -1));
            console.log(sortedArray,321);

            return sortedArray;
        }
        return filteredProductsForDisplay
    };

    useEffect(() => {
        const sortedProducts = sortProducts()
        if(JSON.stringify(sortedProducts) !== JSON.stringify(filteredProductsForDisplay)){
            setFilteredProductsForDisplay(sortedProducts)
        }
    }, [sortedBy, filteredProductsForDisplay]);

    // async function filterProducts() {
    //     return products.filter((product) => product.gender === gender);
    // }
    // async function filter() {
    //     return await filterProducts().then((result) => result)
    // }
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
            if (sortedByCtx != "") {
                setSortedBy(sortedByCtx);
            }
        } else {
            setBrandFilter([]);
            setCategoryFilter([]);
            setPriceFilter([]);
            setSortedBy("");
            setGenderCtx(gender);
            setBrandFilterCtx([]);
            setCategoryFilterCtx([]);
            setPriceFilterCtx([]);
            setSortedByCtx("");
        }
        // sortProducts();

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

    const clearFilters = () => {
        setBrandFilter([]);
        setCategoryFilter([]);
        setPriceFilter([]);
        setBrandFilterCtx([]);
        setCategoryFilterCtx([]);
        setPriceFilterCtx([]);
    };

    const handelSortedBy = (by) => {
        setSortedBy(by);
        setSortedByCtx(by)
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
        <section className='catalog-sort'>
            {filteredProductsForDisplay ? (
                <div className='catalog-sort-div'>
                    <i>Sort By{sortedBy ? ":" + " " + sortedBy : null}</i>
                    <div className='sort-section'>
                        <ul>
                            <li className='abc' onClick={() => handelSortedBy("Price: High-Low")}>
                                Price: High-Low
                            </li>
                            <li onClick={() => handelSortedBy("Price: Low-High")}>Price: Low-High</li>
                            {/* <li onClick={() => handelSortedBy("Newest")}>Newest</li> */}
                        </ul>
                    </div>
                </div>
            ) : null}
            <section className='catalog'>
                <div className='catalog-menu'>
                    <div className='catalog-options'>
                        <ul>
                            <div>
                                {availableBrands ? <h3 className='brand-title'>Brands</h3> : null}
                                {availableBrands.map((brand, idx) => (
                                    <div>
                                        <input
                                            className='filter-input'
                                            checked={brandFilter.includes(brand) ? true : false}
                                            onChange={() => handleBrandChanges(brand)}
                                            type='checkbox'
                                            name={brand}
                                            key={idx}></input>
                                        <label
                                            onClick={() => handleBrandChanges(brand)}
                                            className='filter-label'
                                            htmlFor={brand}>
                                            {brand}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {availableCategories ? <div className='filter-divider'></div> : null}
                            <div>
                                {availableCategories ? <h3 className='category-title'>Categories</h3> : null}
                                {availableCategories.map((category, idx) => (
                                    <div>
                                        <input
                                            className='filter-input'
                                            checked={categoryFilter.includes(category) ? true : false}
                                            onChange={() => handleCategoryChanges(category)}
                                            type='checkbox'
                                            name={category}
                                            key={idx}></input>
                                        <label
                                            onClick={() => handleCategoryChanges(category)}
                                            className='filter-label'
                                            htmlFor={category}>
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {filteredProductsForDisplay ? <div className='filter-divider'></div> : null}

                            {filteredProductsForDisplay ? (
                                <div>
                                    <h3>Shoe by price</h3>
                                    <div>
                                        <input
                                            className='filter-input'
                                            checked={priceFilter.includes("1") ? true : false}
                                            onChange={() => {
                                                handlePriceChanges("1");
                                            }}
                                            type='checkbox'
                                            name='under100'></input>
                                        <label
                                            className='filter-label'
                                            onClick={() => {
                                                handlePriceChanges("1");
                                            }}
                                            htmlFor='under-50'>
                                            Under 99.99 USD
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className='filter-input'
                                            checked={priceFilter.includes("2") ? true : false}
                                            onChange={() => {
                                                handlePriceChanges("2");
                                            }}
                                            type='checkbox'
                                            name='100-200'></input>
                                        <label
                                            className='filter-label'
                                            onClick={() => {
                                                handlePriceChanges("2");
                                            }}
                                            htmlFor='100-200'>
                                            99.99 USD - 199.99 USD
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className='filter-input'
                                            checked={priceFilter.includes("3") ? true : false}
                                            onChange={() => {
                                                handlePriceChanges("3");
                                            }}
                                            type='checkbox'
                                            name='200-300'></input>
                                        <label
                                            onClick={() => {
                                                handlePriceChanges("3");
                                            }}
                                            className='filter-label'
                                            htmlFor='200-300'>
                                            199.99 USD - 299.99 USD
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className='filter-input'
                                            checked={priceFilter.includes("4") ? true : false}
                                            onChange={() => {
                                                handlePriceChanges("4");
                                            }}
                                            type='checkbox'
                                            name='over-300'></input>
                                        <label
                                            onClick={() => {
                                                handlePriceChanges("4");
                                            }}
                                            className='filter-label'
                                            htmlFor='over-300'>
                                            Over 299.99 USD
                                        </label>
                                    </div>
                                </div>
                            ) : null}
                            {availableBrands || availableCategories ? (
                                <button onClick={clearFilters} className='clear-filter-button'>
                                    Clear
                                </button>
                            ) : null}
                        </ul>
                    </div>
                </div>
                {isFilter
                    ? filteredProductsForDisplay.map((product) => displayProduct(product))
                    : filteredProductsForDisplay.map((product) => displayProduct(product))}

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
        </section>
    );
};
