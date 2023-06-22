import "./App.css";
import { Routes, Route } from "react-router-dom";

import { NavigationBar } from "./components/Navigation/Navigation";
import { PrivateRoute } from "../src/components/PrivetRoute/PrivateRoute";
import { Login } from "./components/Auth/Login/Login";
import { Ass } from "./components/Ass/Ass";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
            <div className='app'>
                <NavigationBar></NavigationBar>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/'
                        element={
                            <PrivateRoute>
                                <Ass />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
