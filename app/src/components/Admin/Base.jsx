import React, { useContext, useEffect, useState, createContext } from "react";

import { AppContext } from "../../App";
import AdminDashBoard from "./Dashboard/AdminDashboard";
import OrderManagement from "./Order/OrderManagement";
import get_all_users, { get_all_items } from "../../requests/Admin/data";
import Loading from "../Common/Loading";

import "../Base.css";

export const AdminContext = createContext(null);

const AdminBase = () => {
  let { mode, setMode, loading, setLoading } = useContext(AppContext);

  const [allUser, setAllUser] = useState([]);
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    const get_user = async () => {
      setLoading(2);
      const all_users = await get_all_users();
      const all_items = await get_all_items();
      if (all_users.length !== 0 && all_items.length !== 0) {
        setAllUser(all_users);
        setAllItem(all_items);
        setLoading(0);
      } else {
        setAllUser([]);
        setAllItem([]);
      }
    };
    get_user();
    // eslint-disable-next-line
  }, []);

  return (
    <AdminContext.Provider value={{ allUser, allItem }}>
      {loading !== 2 && (
        <div className="container">
          <div className="header">
            <div className="logo-container">
              {/* <img src="logo.svg" alt="Logo" className="logo"> */}
              <div className="brand-name">iFactory - Administrator Mode</div>
            </div>
            <div className="nav">
              <div className="nav-item" onClick={() => setMode(51)}>
                Home
              </div>
              <div className="nav-item" onClick={() => setMode(52)}>
                Order
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
          {mode === 51 && <AdminDashBoard />}
          {mode === 52 && <OrderManagement />}
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
      )}
      {loading === 2 && (
        <div className="baseLoading">
          <Loading />
        </div>
      )}
    </AdminContext.Provider>
  );
};

export default AdminBase;
