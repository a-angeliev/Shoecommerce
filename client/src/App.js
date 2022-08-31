import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';

import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Details } from './components/Products/Details/Details';
import { Footer } from './components/Footer/Footer';
import { Copyright } from './components/Copyright/Copyright';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<Details />} />
                </Routes>
                <Footer />
                <Copyright />
            </div>
        </AuthProvider>
    );
}

export default App;
