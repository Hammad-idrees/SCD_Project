// import React, { useState } from 'react'
// import './LoginPopup' 
// import { assets } from '../../assets/assets'

// const LoginPopup = ({setShowLogin}) => {

//   const [currState,setCurrState]=useState("Login")

//   return (
//     <div className='login-popup'>
//       <form className='login-popup-container'>
//         <div className='login-popup-title'>
//           <h2>{currState}</h2>
//           <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
//         </div>
//         <div className="login-popup-inputs">
//           {currState==="Login"?<></>:<input type="text" placeholder='Your name' required />}
//           <input type="email" placeholder='Your email' required/>
//           <input type='password' placeholder='Password' required/>
//         </div>
//         <button>{currState==="Sign Up"?"Create account":"Login"}</button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required/>
//           <p>By continuing, i agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState=="Login"
//         ?<p>Create a new Account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
//         :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
//         }
        
        
//       </form>
//     </div>

//   )
// }

// export default LoginPopup

// import React, { useState } from 'react';
// import './LoginPopup.css';
// import { assets } from '../../assets/assets';

// const LoginPopup = ({ setShowLogin }) => {
//   const [currState, setCurrState] = useState("Login");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: ""
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currState === "Sign Up") {
//       console.log("Sign Up data:", formData);
//       // Here you can call your API to handle sign-up
//     } else {
//       console.log("Login data:", {
//         email: formData.email,
//         password: formData.password
//       });
//       // Here you can call your API to handle login
//     }
//     setShowLogin(false);
//   };

//   return (
//     <div className='login-popup'>
//       <form className='login-popup-container' onSubmit={handleSubmit}>
//         <div className='login-popup-title'>
//           <h2>{currState}</h2>
//           <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
//         </div>
//         <div className="login-popup-inputs">
//           {currState === "Sign Up" && (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Your address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </>
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">
//           {currState === "Sign Up" ? "Create account" : "Login"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState === "Login" ? (
//           <p>
//             Create a new Account?{" "}
//             <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setCurrState("Login")}>Login here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;


//== Code for saving data into the backend

import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios'; // Import Axios

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken")); // Check if user is already logged in
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currState === "Sign Up") {
      try {
        // Send registration request
        const registerResponse = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );

        setSuccessMessage(registerResponse.data.message);

        // Automatically log in the user after registration
        const loginResponse = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // Save token in localStorage if login was successful
        if (loginResponse.data.token) {
          localStorage.setItem("authToken", loginResponse.data.token);
          setSuccessMessage("User registered and logged in successfully!");
          setIsLoggedIn(true);
        } else {
          setErrorMessage("Failed to log in after registration.");
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
        setSuccessMessage("");
      }
    } else {
      try {
        // Send login request
        const loginResponse = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // Save token in localStorage if login was successful
        if (loginResponse.data.token) {
          localStorage.setItem("authToken", loginResponse.data.token);
          setSuccessMessage("Login successful!");
          setErrorMessage("");
          setIsLoggedIn(true);
        } else {
          setErrorMessage("Invalid email or password.");
          setSuccessMessage("");
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred during login.");
        setSuccessMessage("");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setSuccessMessage("You have been logged out successfully.");
    setErrorMessage("");
    setCurrState("Login");
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{isLoggedIn ? "Welcome Back!" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        {!isLoggedIn && (
          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {isLoggedIn ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {!isLoggedIn && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
        {!isLoggedIn && (
          currState === "Login" ? (
            <p>
              Create a new Account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

