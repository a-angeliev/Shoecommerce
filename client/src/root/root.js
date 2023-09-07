import { Outlet, ScrollRestoration } from "react-router-dom";
import { Alert } from "../components/Alert/Alert";
import { EducationInfo } from "../components/EducationInfo/EducationInfo";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import { AuthProvider } from "../contexts/Auth";
import { ActiveIconProvider } from "../contexts/activeIconContext";
import { AlertProvider } from "../contexts/alertContext";
import { CartProvider } from "../contexts/cartContext";
import { EducationalPopupProvider } from "../contexts/educationalPopupContext";
import { FilterProvider } from "../contexts/filterContext";
import { ProductProvider } from "../contexts/productContext";
import { WishlistProvider } from "../contexts/wishlistContext";
import { ScrollProvider } from "../contexts/scrollContext";

export const Root = () => {
    return (
        <div>
            <AlertProvider>
                <ScrollProvider>
                    <EducationalPopupProvider>
                        <AuthProvider>
                            <ProductProvider>
                                <CartProvider>
                                    <FilterProvider>
                                        <ActiveIconProvider>
                                            <WishlistProvider>
                                                <Alert />
                                                <div className='App'>
                                                    <EducationInfo />
                                                    <Navbar />
                                                    <ScrollRestoration />
                                                    <Outlet></Outlet>
                                                    <Footer />
                                                </div>
                                            </WishlistProvider>
                                        </ActiveIconProvider>
                                    </FilterProvider>
                                </CartProvider>
                            </ProductProvider>
                        </AuthProvider>
                    </EducationalPopupProvider>
                </ScrollProvider>
            </AlertProvider>
        </div>
    );
};
