import { Routes, Route } from "react-router-dom";

import { ActiveIconProvider } from "./contexts/activeIconContext";
import { AlertProvider } from "./contexts/alertContext";
import { AuthProvider } from "./contexts/Auth";
import { CartProvider } from "./contexts/cartContext";
import { Checkout } from "./components/Checkout/Checkout";
import { CheckoutData } from "./components/Checkout/Checkout-data/Checkout-data";
import { Copyright } from "./components/Copyright/Copyright";
import { Details } from "./components/Products/Details/Details";
import { EducationalPopupProvider } from "./contexts/educationalPopupContext";
import { EducationInfo } from "./components/EducationInfo/EducationInfo";
import { FilterProvider } from "./contexts/filterContext";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { ProductProvider } from "./contexts/productContext";
import { Products } from "./components/Products/Products";
import { ProfileDetails } from "./components/Auth/ProfileDetails/ProfileDetails";
import { ProfileOrders } from "./components/Auth/ProfileOrders/ProfileOrders";
import { WishlistProvider } from "./contexts/wishlistContext";
import { Alert } from "./components/Alert/Alert";

import "./App.css";

function App() {
    return (
        <EducationalPopupProvider>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <FilterProvider>
                            <AlertProvider>
                                <ActiveIconProvider>
                                    <WishlistProvider>
                                        <Alert />
                                        <div className='App'>
                                            <EducationInfo />
                                            <Navbar />
                                            <Routes>
                                                <Route path='/' element={<Home />} />
                                                <Route path='/products/:gender' element={<Products />} />
                                                <Route path='/product/:id' element={<Details />} />
                                                <Route path='/checkout' element={<Checkout />} />
                                                <Route path='/checkout-data' element={<CheckoutData />} />
                                                <Route path='/user/orders' element={<ProfileOrders />} />
                                                <Route path='/user/details' element={<ProfileDetails />}></Route>
                                            </Routes>
                                            <Footer />
                                            {/* <Copyright /> */}
                                        </div>
                                    </WishlistProvider>
                                </ActiveIconProvider>
                            </AlertProvider>
                        </FilterProvider>
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </EducationalPopupProvider>
    );
}

export default App;
