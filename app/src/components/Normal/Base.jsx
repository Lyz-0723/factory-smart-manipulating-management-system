import React, { useContext, useEffect } from "react";

import { AppContext } from "../../App";
import NormalDashBoard from "./Dashboard/NormalDashboard";
import OrderHistory from "./Order/OrderHistory";
import "../Base.css";

const NormalBase = () => {
  let { mode, setMode } = useContext(AppContext);

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="logo-container">
            {/* <img src="logo.svg" alt="Logo" className="logo"> */}
            <div className="brand-name">iFactory</div>
          </div>
          <div className="nav">
            <div className="nav-item" onClick={() => setMode(1)}>
              Home
            </div>
            <div className="nav-item">
              Order
              <div className="nav-dropdown">
                <div className="nav-dropdown-item" onClick={() => setMode(2)}>
                  Order history
                </div>
                <div className="nav-dropdown-item">Online payment</div>
              </div>
            </div>
            <div className="nav-item">
              History
              <div className="nav-dropdown">
                <div className="nav-dropdown-item">Modify the Order</div>
                <div className="nav-dropdown-item">Online payment</div>
              </div>
            </div>
            <div className="nav-item">Account</div>
            <div className="order-btn">Contact us</div>
          </div>
        </div>
        {mode === 1 && <NormalDashBoard />}
        {mode === 2 && <OrderHistory />}
        Normal Login
        <div className="footer">
          {/* <img src="footer-logo.svg" alt="Footer Logo" className="footer-logo"> */}
          <div className="footer-text">
            © 2023 Your Brand. All rights reserved.
          </div>
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
          <a href="#" className="footer-link">
            Terms of Service
          </a>
          <div className="social-icons">
            {/* <img src="facebook-icon.svg" alt="Facebook" className="social-icon"> */}
            {/* <img src="twitter-icon.svg" alt="Twitter" className="social-icon"> */}
            {/* <img src="instagram-icon.svg" alt="Instagram" className="social-icon"> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalBase;
