import "./App.css";
import { Routes, Route } from "react-router-dom";

import { NavigationBar } from "./components/Navigation/Navigation";
import { PrivateRoute } from "../src/components/PrivetRoute/PrivateRoute";
import { Login } from "./components/Auth/Login/Login";

import { AuthProvider } from "./contexts/AuthContext";
import { UserBar } from "./components/UserBar/UserBar";
import { BrandInfo } from "./components/Brand/BrandInfo/BrandInfo";
import { BrandEdit } from "./components/Brand/BrandEdit/BrandEdit";
import { BrandCreate } from "./components/Brand/BrandCreate/BrandCreate";
import { AlertProvider } from "./contexts/AlertContext";
import { CategoryInfo } from "./components/Category/CategoryInfo/CategoryInfo";
import { CategoryCreate } from "./components/Category/CategoryCreate/CategoryCreate";
import { CategoryEdit } from "./components/Category/CategoryEdit/CategoryEdit";
import { ProductInfo } from "./components/Product/ProductInfo/ProductInfo";
import { ProductProvider } from "./contexts/ProductsContext";
import { ProductDetail } from "./components/Product/ProductDetail/ProductDetail";
import { ProductCreate } from "./components/Product/ProductCreate/ProductCreate";
import { OrderInfo } from "./components/Order/OrderInfo/OrderInfo";
import { OrderDetails } from "./components/Order/OrderDetails/OrderDetails";

function App() {
    return (
        <ProductProvider>
            <AuthProvider>
                <AlertProvider>
                    <div className='app'>
                        <NavigationBar />
                        <div className='content'>
                            <UserBar />
                            <Routes>
                                <Route path='/login' element={<Login />} />
                                <Route
                                    path='/brand/information'
                                    element={
                                        <PrivateRoute>
                                            <BrandInfo />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path='/brand/edit/:id'
                                    element={
                                        <PrivateRoute>
                                            <BrandEdit></BrandEdit>
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/brand/create'
                                    element={
                                        <PrivateRoute>
                                            <BrandCreate />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/category/information'
                                    element={
                                        <PrivateRoute>
                                            <CategoryInfo />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/category/create'
                                    element={
                                        <PrivateRoute>
                                            <CategoryCreate />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/category/edit/:id'
                                    element={
                                        <PrivateRoute>
                                            <CategoryEdit />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/products/information'
                                    element={
                                        <PrivateRoute>
                                            <ProductInfo />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/product/:id'
                                    element={
                                        <PrivateRoute>
                                            <ProductDetail />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/products/create'
                                    element={
                                        <PrivateRoute>
                                            <ProductCreate />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/orders/information'
                                    element={
                                        <PrivateRoute>
                                            <OrderInfo />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/order/:id'
                                    element={
                                        <PrivateRoute>
                                            <OrderDetails />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </div>
                    </div>
                </AlertProvider>
            </AuthProvider>
        </ProductProvider>
    );
}

export default App;
