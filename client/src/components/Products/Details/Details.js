import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { ActiveIconContext } from "../../../contexts/activeIconContext";
import { AlertContext } from "../../../contexts/alertContext";
import { AuthContext } from "../../../contexts/Auth";
import { CartContext } from "../../../contexts/cartContext";
import { MorePhotos } from "./MorePhotos/MorePhotos";
import { Recommended } from "./Recommended/Recommended";
import { WishlistContext } from "../../../contexts/wishlistContext";
import * as productService from "./../../../services/product";
import * as wishService from "../../../services/wishlist";

import "./Details.css";

export const Details = () => {
    const { cartState, setCartState, removeFromCart, addToCart } = useContext(CartContext);
    const { setAlert } = useContext(AlertContext);
    const { isAuthenticated } = useContext(AuthContext);
    const { setActiveIcon } = useContext(ActiveIconContext);
    const { addWishlistCtx, removeWishlistCtx, wishlistIds } = useContext(WishlistContext);

    const [product, setProduct] = useState("");
    const [state, setState] = useState("loading");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [colorDict, setColorDict] = useState("");
    const [addInCartPopUp, setAddInCartPopUp] = useState(false);
    const [wishlist, setWishlist] = useState(false);

    const param = useParams();

    useEffect(() => {
        productService.getProductById(param.id).then((result) => {
            const res = JSON.parse(result);
            setProduct(res);
            setState("success");
        });
        if (wishlistIds.includes(Number(param.id))) {
            setWishlist(true);
        }
    }, [param.id]);

    useEffect(() => {
        let colorList = {};
        if (product !== "") {
            product.pairs.map((pair) => {
                if (pair.quantity != 0) {
                    if (pair.color in colorList === false) {
                        colorList[pair.color] = [pair.size];
                    } else {
                        colorList[pair.color].push(pair.size);
                    }
                }
            });
            setColorDict(colorList);
        }
    }, [product]);

    const activeColor = (e) => {
        setColor(e.target.attributes[0].nodeValue);
        setSize(colorDict[e.target.attributes[0].nodeValue][0]);
    };

    const chosenSize = (e) => {
        setSize(e.target.value);
    };

    const addToCartFunc = (e) => {
        e.preventDefault();
        let shoe = {};

        if (!color) {
            setAlert({ color: "red", text: "You should pick color and size!" });
        } else {
            setAlert({ color: "green", text: "Product added to cart successfully!" });
            shoe["title"] = product.title;
            shoe["image"] = product.images[0].img_url;
            shoe["price"] = product.price;
            shoe["gender"] = product.gender;
            shoe["color"] = color;
            shoe["size"] = size;
            shoe["id"] = param.id;
            shoe["pair_id"] = product.pairs.filter((pair) => pair.color == color && pair.size == size)[0].id;
            addToCart(shoe);
        }
    };

    const wishEvent = () => {
        if (!isAuthenticated) {
            setActiveIcon("user");
        } else {
            if (wishlist) {
                wishService
                    .removeWish({ id: param.id })
                    .then((res) => {
                        setAlert({ color: "green", text: "You successfully removed the shoes from the wishlist!" });
                        setWishlist((prev) => !prev);
                        removeWishlistCtx(JSON.parse(res).id);
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ color: "red", text: "There is a problem with Add/Remove.Try to reload!" });
                    });
            } else {
                wishService
                    .addWish({ id: param.id })
                    .then((res) => {
                        setAlert({ color: "green", text: "You successfully added the shoes into the wishlist!" });
                        setWishlist((prev) => !prev);
                        addWishlistCtx(JSON.parse(res));
                    })
                    .catch((err) => {
                        console.log(err);
                        setAlert({ color: "red", text: "There is a problem with Add/Remove.Try to reload!" });
                    });
            }
        }
    };

    if (state == "loading") {
        return <div></div>;
    }

    return (
        <main className='main-details'>
            <div className='main-wrapper'>
                <section className='main-shoe-content scn'>
                    <img className='main-shoe' src={product ? product.images[0].img_url : null} alt={product.title} />
                    <article className='main-shoe-info'>
                        <div className='wishlist-icon'>
                            <h1 className='main-shoe-name'>{product.title}</h1>
                            <i
                                className={
                                    wishlist
                                        ? "bx bxs-heart wishlist-shoe-icon-active"
                                        : "bx bx-heart wishlist-shoe-icon"
                                }
                                id='heart-icon'
                                onClick={wishEvent}
                            />
                        </div>
                        <h2 className='main-shoe-second-title'>
                            {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}'s{" "}
                            {product.category.title} Shoes
                        </h2>
                        <h3 className='main-shoe-price'>
                            {product.price} USD
                            <span className='main-shoe-size'>
                                <label htmlFor='size'>Choose a size:</label>

                                {color === "" ? (
                                    Object.keys(colorDict).length == 0 ? (
                                        <select className='pick-size' name='pick-size' id='pick-size'>
                                            <option>Out of stock</option>
                                        </select>
                                    ) : (
                                        <select className='pick-size' name='pick-size' id='pick-size'>
                                            <option>Pick a color first</option>
                                        </select>
                                    )
                                ) : (
                                    <select onChange={chosenSize} className='main-shoe-sizes' name='size' id='size'>
                                        {colorDict[color]
                                            ? colorDict[color].map((x) => (
                                                  <option key={x} value={x}>
                                                      {x}
                                                  </option>
                                              ))
                                            : ""}
                                    </select>
                                )}
                            </span>
                        </h3>
                        <p className='main-shoe-description'>{product.description}</p>
                        <section className='main-shoe-colors scn'>
                            <ul className='main-shoe-color-list'>
                                {Object.keys(colorDict).map((c) => (
                                    <li
                                        onClick={activeColor}
                                        key={c}
                                        name={c}
                                        className={
                                            "main-shoe-color " + c + " " + (color === c ? "activeColorPicker" : "")
                                        }></li>
                                ))}
                            </ul>
                            <button onClick={addToCartFunc} className='main-shoe-button'>
                                Add to Cart
                            </button>
                        </section>
                    </article>
                </section>

                <MorePhotos product={product} />
                <section className='main-shoe-more-info scn'>
                    <h2 className='main-more-title'>{product.brand.name}</h2>
                    <p className='main-more-text-content'>{product.brand.description}</p>
                    <img className='brand-logo' src={product.brand.logo_url} alt='Jordan' />
                </section>

                <Recommended gender={product.gender} />
                <section className='main-shoe-reviews scn'></section>
            </div>
        </main>
    );
};

export default Details;
