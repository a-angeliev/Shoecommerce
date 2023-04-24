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

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <FilterProvider>
                        <AlertProvider>
                            <div className='App'>
                                <Navbar />
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/products/:gender' element={<Products />} />
                                    <Route path='/product/:id' element={<Details />} />
                                    <Route path='/checkout' element={<Checkout />} />
                                </Routes>
                                <Footer />
                                {/* <Copyright /> */}
                            </div>
                        </AlertProvider>
                    </FilterProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
