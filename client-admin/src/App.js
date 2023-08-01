import { Routes, Route } from "react-router-dom";

import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrandCreate } from "./components/Brand/BrandCreate/BrandCreate";
import { BrandEdit } from "./components/Brand/BrandEdit/BrandEdit";
import { BrandInfo } from "./components/Brand/BrandInfo/BrandInfo";
import { CategoryCreate } from "./components/Category/CategoryCreate/CategoryCreate";
import { CategoryEdit } from "./components/Category/CategoryEdit/CategoryEdit";
import { CategoryInfo } from "./components/Category/CategoryInfo/CategoryInfo";
import { Login } from "./components/Auth/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { NavigationBar } from "./components/Navigation/Navigation";
import { OrderDetails } from "./components/Order/OrderDetails/OrderDetails";
import { OrderInfo } from "./components/Order/OrderInfo/OrderInfo";
import { PrivateRoute } from "../src/components/PrivetRoute/PrivateRoute";
import { ProductCreate } from "./components/Product/ProductCreate/ProductCreate";
import { ProductDetail } from "./components/Product/ProductDetail/ProductDetail";
import { ProductInfo } from "./components/Product/ProductInfo/ProductInfo";
import { ProductProvider } from "./contexts/ProductsContext";
import { Summary } from "./components/Summary/Summary";
import { UserBar } from "./components/UserBar/UserBar";
import { Alert } from "./components/Alert/Alert";

import "./App.css";

function App() {
    return (
        <ProductProvider>
            <AuthProvider>
                <AlertProvider>
                    <Alert></Alert>
                    <div className='app'>
                        <NavigationBar />
                        <div className='content'>
                            <UserBar />
                            <Routes>
                                <Route path='/login' element={<Login />} />

                                <Route
                                    path='/'
                                    element={
                                        <PrivateRoute>
                                            <Summary />
                                        </PrivateRoute>
                                    }
                                />

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
                                <Route
                                    path='/logout'
                                    element={
                                        <PrivateRoute>
                                            <Logout />
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
