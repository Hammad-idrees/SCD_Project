import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, wishlist, addToWishlist, removeFromWishlist } = useContext(StoreContext);

  const handleWishlistClick = () => {
    if (wishlist && wishlist.includes(id)) {
      removeFromWishlist(id); // Remove from wishlist if already added
    } else {
      addToWishlist(id); // Add to wishlist if not added
    }
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
        {
          !cartItems[id]
            ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
            : <div className='food-item-counter'>
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
      <button 
        className={`wishlist-btn ${wishlist && wishlist.includes(id) ? 'added' : ''}`} 
        onClick={handleWishlistClick}>
        {wishlist && wishlist.includes(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
}

export default FoodItem;
