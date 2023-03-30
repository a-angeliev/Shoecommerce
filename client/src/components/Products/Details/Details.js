import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Spinner from '../../common/Spinner/Spinner';
import { MorePhotos } from './MorePhotos/MorePhotos';
import { Recommended } from './Recommended/Recommended';
import * as productService from "./../../../services/product"
import './Details.css';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { CartContext } from '../../../contexts/cartContext';


export const Details = () => {
    const param = useParams()

    // const [cart, setCart] = useLocalStorage("cart", '')
    const [product, setProduct] = useState("")
    const [state , setState] = useState("loading")
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")

    const {cartState, setCartState, removeFromCart, addToCart} = useContext(CartContext)

    useEffect(()=>{
        productService.getProductById(param.id).then((result) => {
            const res = JSON.parse(result)
            setProduct(res)
            setState("success")
    
        })    
    }, [param.id])

   

    const activeColor = (e) => {
        setColor(e.target.attributes[0].nodeValue)
        setSize(colorDict[e.target.attributes[0].nodeValue][0])
    }
    
    const chosenSize = (e) => {
        setSize(e.target.value)
    }
    
    const addToCartFunc = (e) => {
        e.preventDefault()
        let shoe = {}
        shoe["title"] = product.title
        shoe["image"] = product.images[0].img_url
        shoe["price"] = product.price
        shoe['color'] = color
        shoe["size"] = size
        shoe["id"] = param.id
        if(!color){
            alert("You should pick color and size!")
        }else{
            alert("Successful")
            // localStorage.setItem("cart", [...cart, shoe])
            addToCart(shoe)
            // setCartState(cartState!== [] ? [...cartState, shoe]: [shoe])
        }
    }

    if (state == "loading"){
        return <div></div>
    }
    
    let colorDict = {}
    
    product.pairs.map((pair) => {
        if(pair.color in colorDict === false){
            colorDict[pair.color] = [pair.size]
        } else{
            colorDict[pair.color].push(pair.size)
        }
    })
   
    return (
        <main className="main-details">
            <div className="main-wrapper">
                <section className="main-shoe-content scn">
                    <img className="main-shoe"
                        src={product ? product.images[0].img_url: null}
                        alt={product.title} />
                    <article className="main-shoe-info">
                        <h1 className="main-shoe-name">
                           {product.title}
                        </h1>
                        <h2 className="main-shoe-second-title">
                            {product.gender}'s {product.category.title} Shoes
                        </h2>
                        <h3 className="main-shoe-price">
                            {product.price} USD
                            <span className="main-shoe-size">
                                <label htmlFor="size">Choose a size:</label>

                                <select  onChange={chosenSize}  className="main-shoe-sizes" name="size" id="size">
                                    {color ? colorDict[color].map((x)=> <option key={x} value={x}>{x}</option>) : ""}
                                </select>
                            </span>
                        </h3>
                        <p className="main-shoe-description">
                            {product.description}
                        </p>
                        <section className="main-shoe-colors scn">
                            <ul className="main-shoe-color-list">
                                {Object.keys(colorDict).map((c) => <li onClick = {activeColor} key={c} name ={c} className = {'main-shoe-color '+ (c) + " "+ (color===c ? "activeColorPicker": '')} ></li>)}
                            </ul>
                            <button onClick={addToCartFunc} className="main-shoe-button">
                                Add to Cart
                            </button>
                        </section>
                    </article>
                </section>

                <MorePhotos />
                <section className="main-shoe-more-info scn">
                    <h2 className="main-more-title">
                        {product.brand.name}
                    </h2>
                    <p className="main-more-text-content">
                        The Air Jordan XXXVI isn't just the next up in the iconic franchise; it's an expression of the drive
                        and energy that sparked a basketball revolution. It's one of the lightest Air Jordan game shoes to
                        date, featuring a minimal but durable Leno-Weave upper reinforced with a TPU ribbon. It also comes
                        equipped with a full-length Zoom Air Strobel unit stitched directly to the upper, stacked over a
                        Zoom Air unit in the forefoot, providing a sensation of energy return and elite responsiveness. Step
                        on the court with the confidence that whatever you do—it's light work.
                    </p>
                    <img className="brand-logo"src={product.brand.logo_url}
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