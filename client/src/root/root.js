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
import { useScrollRestoration } from "use-scroll-restoration";
import { useEffect } from "react";
import { ScrollProvider } from "../contexts/scrollContext";

export const Root = () => {
    // const { ref, setScroll } = useScrollRestoration("exampleKey", {
    //     debounceTime: 200,
    //     persist: "localStorage",
    // });
    // useEffect(() => {
    //     // Add a custom event listener for history changes
    //     const handleHistoryChange = () => {
    //         // Perform your custom logic here
    //         console.log("History changed:", window.location.pathname);
    //         const arr = sessionStorage.getItem("scroll");
    //         const norm = arr.split(",");
    //         const a = Number(norm.pop());
    //         console.log(a);
    //         sessionStorage.setItem("scroll", norm);
    //         setTimeout(() => {
    //             window.scrollTo(0, a);
    //         }, 100);
    //     };

    //     // Add the event listener to the window's history object
    //     window.addEventListener("popstate", handleHistoryChange);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         window.removeEventListener("popstate", handleHistoryChange);
    //     };
    // }, []);

    return (
        <div>
            <ScrollProvider>
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
                                                    <ScrollRestoration />
                                                    <Outlet></Outlet>
                                                    <Footer />
                                                </div>
                                            </WishlistProvider>
                                        </ActiveIconProvider>
                                    </AlertProvider>
                                </FilterProvider>
                            </CartProvider>
                        </ProductProvider>
                    </AuthProvider>
                </EducationalPopupProvider>
            </ScrollProvider>
        </div>
    );
};
