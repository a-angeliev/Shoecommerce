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

function App() {
    return (
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
                        </Routes>
                    </div>
                </div>
            </AlertProvider>
        </AuthProvider>
    );
}

export default App;
