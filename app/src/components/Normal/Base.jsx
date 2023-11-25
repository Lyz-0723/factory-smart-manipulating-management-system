import React, { useContext, useEffect, createContext, useState } from "react";

import { AppContext } from "../../App";
import NormalDashBoard from "./Dashboard/NormalDashboard";
import OrderHistory from "./Order/OrderHistory";
import OrderPage from "./Order/OrderPage";
import ContactPage from "./Contact/ContactPage";
import AccountManagement from "./Account/AccountManagement";
import "../Base.css";
import Loading from "../Common/Loading";
import { get_all_items, get_order_status } from "../../requests/Admin/data";
import { get_self_detail } from "../../requests/user";

export const NormalContext = createContext(null);

const NormalBase = () => {
  let { mode, setMode, loading, setLoading } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [allItem, setAllItem] = useState([]);
  const [allOrderStatus, setAllOrderStatus] = useState([]);

  useEffect(() => {
    const get_data = async () => {
      setLoading(2);
      const all_items = await get_all_items();
      const all_order_status = await get_order_status();
      const self_user = await get_self_detail();

      if (
        self_user &&
        all_items.length !== 0 &&
        all_order_status.length !== 0
      ) {
        setUser(self_user);
        setAllItem(all_items);
        setAllOrderStatus(all_order_status);
        setLoading(0);
      } else {
        setUser({});
        setAllItem([]);
        setAllOrderStatus([]);
      }
    };
    get_data();
    // eslint-disable-next-line
  }, []);

  return (
    <NormalContext.Provider
      value={{ user, allItem, setAllItem, allOrderStatus, setAllOrderStatus }}
    >
      {loading !== 2 && (
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
                  <div className="nav-dropdown-item" onClick={() => setMode(3)}>
                    Make Order
                  </div>
                  <div className="nav-dropdown-item" onClick={() => setMode(2)}>
                    Order history
                  </div>
                  <div className="nav-dropdown-item">Online payment</div>
                </div>
              </div>
              {/* <div className="nav-item">
                History
                <div className="nav-dropdown">
                  <div className="nav-dropdown-item">Modify the Order</div>
                  <div className="nav-dropdown-item">Online payment</div>
                </div>
              </div> */}
              <div className="nav-item" onClick={() => setMode(5)}>
                Account
              </div>
              <div className="order-btn" onClick={() => setMode(4)}>
                Contact us
              </div>
            </div>
          </div>
          {mode === 1 && <NormalDashBoard />}
          {mode === 2 && <OrderHistory />}
          {mode === 3 && <OrderPage />}
          {mode === 4 && <ContactPage />}
          {mode === 5 && <AccountManagement />}
          <div className="footer">
            {/* <img src="footer-logo.svg" alt="Footer Logo" className="footer-logo"> */}
            <div className="footer-text">
              © 2023 Your Brand. All rights reserved.
            </div>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
            <div className="social-icons">
              {/* <img src="facebook-icon.svg" alt="Facebook" className="social-icon"> */}
              {/* <img src="twitter-icon.svg" alt="Twitter" className="social-icon"> */}
              {/* <img src="instagram-icon.svg" alt="Instagram" className="social-icon"> */}
            </div>
          </div>
        </div>
      )}
      {loading === 2 && (
        <div className="baseLoading">
          <Loading />
        </div>
      )}
    </NormalContext.Provider>
  );
};

export default NormalBase;
