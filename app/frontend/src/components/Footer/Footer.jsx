import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=" "/>
            <p>We value your feedback and are always here to assist you. If you have any questions, suggestions, or concerns about our products or services, please don't hesitate to get in touch. Our customer support team is dedicated to providing you with the best service possible and ensuring that your experience with us is seamless. Whether you need help with an order, have inquiries about our offerings, or simply want to learn more about our company, we are here to help. Reach out to us through email, phone, or visit us at our office, and we will respond as quickly as possible. We look forward to hearing from you!
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt=""/>
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt=""/>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delievery</li>
              <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>042-111-222-121</li>
                <li>Head Office: Street 48,Model Town,Islamabad</li>
                <li>Tomato343@gmail.com</li>
              </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">
        Copyright 2024 © Tomato.com - All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer