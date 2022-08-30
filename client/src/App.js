import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { NewArrival } from "./components/New Arrival/NewArrival";
import { Products } from "./components/Products/Products";
import { Details } from "./components/Products/Details/Details";
import { Reviews } from "./components/Reviews/Reviews";
import { Footer } from "./components/Footer/Footer";
import { Copyright } from "./components/Copyright/Copyright";

function App() {
  return (
    <div className="App">

      {/* Navbar */}

      <Navbar />

      {/* <!-- Home --> */}
      {/* <Home /> */}

      {/* <!-- New Arrival --> */}

      {/* <NewArrival /> */}

      {/* <!-- Products --> */}

      {/* <Products /> */}

      {/* <!-- Products --> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Details />} />
      </Routes>

      {/* <!-- Reviews --> */}

      {/* <Reviews /> */}

      {/* <!-- Footer --> */}

      {/* <Footer /> */}

      {/* <!-- Copyright --> */}

      {/* <Copyright /> */}

    </div>
  );
}

export default App;
