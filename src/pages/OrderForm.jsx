import React from 'react';

const OrderForm = ({ cartItems, handleOrder }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an order object to show in the alert
    const orderSummary = cartItems.map(item => ({
      product: item.name,
      price: item.price
    }));

    // Calculate the total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    // Show the order summary in an alert
    const orderDetails = {
      items: orderSummary,
      total: totalPrice
    };
    
    alert(JSON.stringify(orderDetails, null, 2));

    // Proceed with the order submission
    handleOrder(orderDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
