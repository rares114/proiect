import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Accounts/Login";
import Register from "./components/Accounts/Register";
import RegularUserPage from "./components/RegularUserPage";
import ShopPage from "./components/ShopPage";
import "./App.css";
import AboutShop from "./components/AboutShop";
import Home from "./components/Home";
import BackgroundComponent from "./components/BackgroundComponent";
import Faq from "./components/Faq";
import DespreNoi from "./components/DespreNoi";
import Contact from "./components/Contact";
import Produsul from './components/Produsul';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="app">
      <BackgroundComponent />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/regular-user"
            element={<RegularUserPage setSelectedProduct={setSelectedProduct} />}
          />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/about-shop" element={<AboutShop />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<DespreNoi />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/produsul"
            element={<Produsul selectedProduct={selectedProduct} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
