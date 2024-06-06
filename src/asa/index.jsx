import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
//import './App.css';

const Asa = () => {
  return (
    <CartProvider>
      {/* <Router> */}
        <Navbar />
        <Routes>
          <Route path="/asa" element={<Home />} />
          <Route path="/asa/cart" element={<Cart />} />
          <Route path="/asa/checkout" element={<Checkout />} />
        </Routes>
      {/* </Router> */}
    </CartProvider>
  );
};

export default Asa;
