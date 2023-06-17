import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { ProductProvider } from "./contexts/productContext";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Products } from "./components/Products/Products";
import { Details } from "./components/Products/Details/Details";
import { Footer } from "./components/Footer/Footer";
import { Copyright } from "./components/Copyright/Copyright";

import "./App.css";
import { CartProvider } from "./contexts/cartContext";
import { FilterProvider } from "./contexts/filterContext";
import { AlertProvider } from "./contexts/alertContext";
import { Checkout } from "./components/Checkout/Checkout";
import { CheckoutData } from "./components/Checkout/Checkout-data/Checkout-data";
import { ActiveIconProvider } from "./contexts/activeIconContext";

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <FilterProvider>
                        <AlertProvider>
                            <ActiveIconProvider>
                                <div className='App'>
                                    <Navbar />
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                        <Route path='/products/:gender' element={<Products />} />
                                        <Route path='/product/:id' element={<Details />} />
                                        <Route path='/checkout' element={<Checkout />} />
                                        <Route path='/checkout-data' element={<CheckoutData />} />
                                    </Routes>
                                    <Footer />
                                    {/* <Copyright /> */}
                                </div>
                            </ActiveIconProvider>
                        </AlertProvider>
                    </FilterProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
