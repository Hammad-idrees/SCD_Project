import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: false,
    debitCard: false,
    paypal: false,
    cashOnDelivery: false,
  });

  const handleCheckboxChange = (e) => {
    setPaymentMethods({
      ...paymentMethods,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
        <input type="text" placeholder='Card number' />

        {/* Payment method checkboxes */}
        <div className="payment-methods">
          <label>
            <input
              type="checkbox"
              name="creditCard"
              checked={paymentMethods.creditCard}
              onChange={handleCheckboxChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="checkbox"
              name="debitCard"
              checked={paymentMethods.debitCard}
              onChange={handleCheckboxChange}
            />
            Debit Card
          </label>
          <label>
            <input
              type="checkbox"
              name="paypal"
              checked={paymentMethods.paypal}
              onChange={handleCheckboxChange}
            />
            PayPal
          </label>
          <label>
            <input
              type="checkbox"
              name="cashOnDelivery"
              checked={paymentMethods.cashOnDelivery}
              onChange={handleCheckboxChange}
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
