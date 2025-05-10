import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext= createContext(null)


const StoreContextProvider=(props)=>{

  const[cartItems,setCartitems]=useState({});
  const [wishlist, setWishlist] = useState([]); // Initialize wishlist as an empty array

  const addToCart=(itemId)=>{
    if(!cartItems[itemId])
    {
      setCartitems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
  }
  const removeFromCart=(itemId)=>{
    setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }

  useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("User not logged in");
        } else {
          console.log("User logged in");
        }
      }, []);
  
  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        let itemInfo=food_list.find((product)=>product._id === item)
      totalAmount+=itemInfo.price*cartItems[item];
      }
    }
    return totalAmount;
  }
  // Wishlist

  const addToWishlist = (id) => {
    setWishlist(prev => [...prev, id]);
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item !== id));
  };

  //================

  const contextValue={
    food_list,
    cartItems,
    setCartitems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    addToWishlist,
    removeFromWishlist,
    wishlist

  }

  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider





