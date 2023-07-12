import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Accounts/Login';
import Register from './components/Accounts/Register';
import RegularUserPage from './components/RegularUserPage';
import ShopPage from './components/ShopPage';
import './App.css';
import AboutShop from './components/AboutShop';
import Home from './components/Home';
import BackgroundComponent from './components/BackgroundComponent';

const App = () => {
  return (
    <div className="app">
      <BackgroundComponent />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/regular-user" element={<RegularUserPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/about-shop" element={<AboutShop />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
