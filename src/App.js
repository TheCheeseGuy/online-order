import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import Lunch from './pages/Lunch';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Return from './pages/Return';
import AsaIndex from './asa/index'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Index} />
        <Route path="/lunch/*" Component={Lunch} />
        <Route path= '/asa/*' Component={AsaIndex} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/return" element={<Return />} />
      </Routes>
    </div>
  );
}

export default App;
