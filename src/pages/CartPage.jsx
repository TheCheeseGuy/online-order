import React,{ useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state.cartItems || []);

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  if (!cartItems) {
    return (
      <div>
        <p className='lead'>Loading...</p>
        <Link to="/lunch">
          <button className="back-button">Back to Menu</button>
        </Link>
      </div>
    )
  }

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {Object.keys(groupedItems).map((category) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {groupedItems[category].map((item, index) => (
                  <li key={index}>
                    <span>{item.name} -  &#8373;{item.price}</span>
                    <button onClick={() => removeFromCart(cartItems.indexOf(item))}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p>Total: &#8373; {totalPrice.toFixed(2)}</p>
          <button onClick={() => navigate('/checkout', { state: { cartItems } })}>
            Proceed to Checkout
          </button>
        </>
      )}
      <button className="back-button" onClick ={() => navigate('/lunch',{state: {cartItems}})}>
        Back to menu
      </button>
    </div>
  );
};

export default CartPage;
