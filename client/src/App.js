import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';
import { ProductProvider } from './contexts/productContext';

import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Products } from './components/Products/Products';
import { Details } from './components/Products/Details/Details';
import { Footer } from './components/Footer/Footer';
import { Copyright } from './components/Copyright/Copyright';

import './App.css';
import { CartProvider } from './contexts/cartContext';

function App() {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <div className="App">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<Details/>} />
                        </Routes>
                        <Footer />
                        <Copyright />
                    </div>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}

export default App;
