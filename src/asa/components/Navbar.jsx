import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItems.length > 0 && <span>{cartItems.length}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;
