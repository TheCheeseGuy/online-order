import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const CheckoutPage = () => {

  const location = useLocation();
  const { cartItems = [] } = location.state || {};
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // State for modal visibility and URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  // State for billing form fields
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Billing Information:', billingInfo);
  };

  // Handle payment
  const handlePayment = () => {
    // Prepare order details
    const orderSummary = cartItems.map(item => ({
      product: item.name,
      category: item.category,
      price: item.price
    }));

    // Prepare billing information
    const billingDetails = {
      firstName: billingInfo.firstName,
      lastName: billingInfo.lastName,
      email: billingInfo.email,
      grade: billingInfo.grade
    };

    // Prepare order summary
    const orderDetails = {
      items: orderSummary,
      billingInfo: billingDetails,
      total: totalPrice.toFixed(2)
    };

    // Initialize payment with Paystack
    let data = JSON.stringify({
      email: billingDetails.email,
      amount: orderDetails.total * 100,
      metadata: orderDetails
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/lcs/initiate',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        setModalUrl(response.data.rawResponse.data.authorization_url);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='display-5'>Enter Student's Details</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-floating col-md'>
            <input className='form-control' type="text" id="floatingInput" name="firstName" placeholder='Student First Name' value={billingInfo.firstName} onChange={handleInputChange} required />
            <label for=" floatingInput">Student First Name</label>
          </div>
          <div className='form-floating col-md'>
            <input className='form-control' type="text" id="floatingInput" name="lastName" placeholder='Student Last Name' value={billingInfo.lastName} onChange={handleInputChange} required />
            <label for=" floatingInput">Student Last Name</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Large select example"
              name="grade"
              value={billingInfo.grade}
              onChange={handleInputChange}
            >
              <option selected>Select Grade</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div className='form-floating col-md'>
            <input className='form-control' type="email" id="floatingInput" name="email" placeholder='Email' value={billingInfo.email} onChange={handleInputChange} required />
            <label for=" floatingInput">Email</label>
          </div>
        </div>
      </form>
      <p>Total: &#8373; {totalPrice.toFixed(2)}</p>
      <button onClick={handlePayment}>Pay</button>
      {isModalOpen && <Modal url={modalUrl} onClose={() => setIsModalOpen(false)} />}
      <Link to="/cart"
      state={cartItems}>
        <button className="back-button" >Back to Cart</button>
      </Link>
    </div>
  );
};

export default CheckoutPage;
