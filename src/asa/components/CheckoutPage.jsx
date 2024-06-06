import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
      <button>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
