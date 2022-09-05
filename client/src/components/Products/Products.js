import "./Products.css";

import { useState, useEffect } from "react";
import * as productService from "../../services/product";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner/Spinner";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productService.getProducts().then((products) => setProducts(products));
    setIsLoading(false);
  }, []);

  return (
    <section className="product" id="product">
      <div className="heading">
        <h1>
          Our <span>Products</span>
        </h1>
      </div>
      <div className="product-container">
        {isLoading ? (
          <Spinner />
        ) : (
          products.map((product) => (
            <div className="box">
              <img src={product.images[0]} alt="" />
              <div className="content">
                <h2>{product.title}</h2>
                <span>${product.price}</span>
                <i className="bx bx-cart-alt"></i>
                <Link to={`/products/${product.id}`}>details</Link>
              </div>
            </div>
          ))
        )}

        {/* <div className="box">
          <img
            src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
            alt=""
          />
          <div className="content">
            <h2>Nike Air Jordan 1 High</h2>
            <span>$230</span>
            <i className="bx bx-cart-alt"></i>
          </div>
        </div>
        <div className="box">
          <img
            src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
            alt=""
          />
          <div className="content">
            <h2>Nike Air Jordan 1 High</h2>
            <span>$230</span>
            <i className="bx bx-cart-alt"></i>
          </div>
        </div>
        <div className="box">
          <img
            src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
            alt=""
          />
          <div className="content">
            <h2>Nike Air Jordan 1 High</h2>
            <span>$230</span>
            <i className="bx bx-cart-alt"></i>
          </div>
        </div>
        <div className="box">
          <img
            src="/images/Air-Jordan-1-High-85-Neutral-Grey-BQ4422-100-Release-Date-Price-4-removebg-preview.png"
            alt=""
          />
          <div className="content">
            <h2>Nike Air Jordan 1 High</h2>
            <span>$230</span>
            <i className="bx bx-cart-alt"></i>
          </div>
        </div> */}
      </div>
    </section>
  );
};
