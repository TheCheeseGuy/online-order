import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], removeFromCart } = location.state || {};
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} {item.size} - &#8373; {item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/checkout', { state: { cartItems } })}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
