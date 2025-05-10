// import React, { useState } from 'react';
// import Navbar from './components/Navbar/Navbar';
// import { Route, Routes } from 'react-router-dom';
// import 'leaflet/dist/leaflet.css';
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
// import Home from './pages/Home/Home';
// import SlidingPanel from './components/SlidingPanel/SlidingPanel';
// import Cart from './pages/Cart/Cart';
// import Restaurants from './pages/Restaurants/Restaurants';
// import Footer from './components/Footer/Footer';
// import LoginPopup from './components/LoginPopup/LoginPopup';

// const App = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isPanelOpen, setIsPanelOpen] = useState(false); // Add state for toggling panel

//   return (
//     <>
//       {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
//       <div className="app">
//         <Navbar setShowLogin={setShowLogin} />

//         {/* Toggle Sliding Panel globally */}
//         <button onClick={() => setIsPanelOpen(!isPanelOpen)}>
//           {isPanelOpen ? 'Close AI Panel' : 'Open AI Panel'}
//         </button>

//         {/* Render Sliding Panel if the state is true */}
//         {isPanelOpen && <SlidingPanel />}

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order" element={<PlaceOrder />} />
//           <Route path="/restaurants" element={<Restaurants />} />
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default App;

import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";
import SlidingPanel from "./components/SlidingPanel/SlidingPanel";
import Cart from "./pages/Cart/Cart";
import Restaurants from "./pages/Restaurants/Restaurants";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Wishlist from "./pages/Wishlist/Wishlist";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <SlidingPanel togglePanel={togglePanel} isOpen={isPanelOpen} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
