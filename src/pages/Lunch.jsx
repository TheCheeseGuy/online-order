import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Lunch = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/lcs/menu');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the menu data", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product }]);
  };

  return (
    <div className='container-fluid'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-navbar">
        <div className="container-fluid justify-content-end">
        <Link
            to="/cart"
            state={{ cartItems }}
            className="cart-icon"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </nav>
      <div>
        {products.map((product, index) => (
          <ProductList
            key={index}
            products={[product]}
            addToCart={addToCart}
          />
        ))}
        {console.log(cartItems)}
      </div>
    </div>
  );
};

export default Lunch;
