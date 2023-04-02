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

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <FilterProvider>
                        <div className='App'>
                            <Navbar />
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/products/:gender' element={<Products />} />
                                <Route path='/product/:id' element={<Details />} />
                            </Routes>
                            <Footer />
                            <Copyright />
                        </div>
                    </FilterProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
