import "./App.css";
import { Routes, Route } from "react-router-dom";

import { NavigationBar } from "./components/Navigation/Navigation";
import { PrivateRoute } from "../src/components/PrivetRoute/PrivateRoute";
import { Login } from "./components/Auth/Login/Login";
import { Ass } from "./components/Ass/Ass";

import { AuthProvider } from "./contexts/AuthContext";
import { UserBar } from "./components/UserBar/UserBar";
import { BrandInfo } from "./components/Brand/BrandInfo/BrandInfo";
import { BrandEdit } from "./components/Brand/BrandEdit/BrandEdit";

function App() {
    return (
        <AuthProvider>
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
                            path='/'
                            element={
                                <PrivateRoute>
                                    <Ass />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/brand/edit'
                            element={
                                <PrivateRoute>
                                    <BrandEdit></BrandEdit>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
