// src/pages/Wishlist.jsx
import React, { useContext } from 'react';
import './Wishlist.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, food_list, removeFromWishlist } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="wishlist">
      <div className="wishlist-items">
        <div className="wishlist-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (wishlist.includes(item._id)) {
            return (
              <div key={item._id}>
                <div className="wishlist-items-title wishlist-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p className="cross" onClick={() => removeFromWishlist(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="wishlist-bottom">
        <button onClick={() => navigate('/cart')}>PROCEED TO CART</button>
      </div>
    </div>
  );
};

export default Wishlist;
