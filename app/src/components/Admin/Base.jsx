import React, { useContext, useEffect, useState, createContext } from "react";

import { AppContext } from "../../App";
import AdminDashBoard from "./Dashboard/AdminDashboard";
import OrderManagement from "./Order/OrderManagement";
import EnvironmentMonitor from "./Environment/EnvironmentPage";
import MachineStatus from "./ProductionLine/MachineStatus/MachineStatus";
import Loading from "../Common/Loading";

import ProductionLinePage from "./ProductionLine/ProductionLine";
import get_all_users, {
  get_all_items,
  get_order_status,
  get_all_pl,
} from "../../requests/Admin/data";

import "../Base.css";

export const AdminContext = createContext(null);

const AdminBase = () => {
  let { mode, setMode } = useContext(AppContext);

  const [allUser, setAllUser] = useState(undefined);
  const [allItem, setAllItem] = useState(undefined);
  const [allOrderStatus, setAllOrderStatus] = useState(undefined);
  const [allProductionLine, setAllProductionLine] = useState(undefined);

  useEffect(() => {
    const get_data = async () => {
      const all_users = await get_all_users();
      const all_items = await get_all_items();
      const all_order_status = await get_order_status();
      const all_pl = await get_all_pl();
      if (all_users && all_items && all_order_status && all_pl) {
        setAllUser(all_users);
        setAllItem(all_items);
        setAllOrderStatus(all_order_status);
        setAllProductionLine(all_pl);
        console.log(all_pl);
      }
    };
    get_data();
    // eslint-disable-next-line
  }, []);

  return (
    <AdminContext.Provider
      value={{
        allUser,
        allItem,
        allOrderStatus,
        allProductionLine,
        setAllProductionLine,
      }}
    >
      {allUser && allItem && allOrderStatus && (
        <div className="container">
          <div className="header">
            <div className="logo-container">
              {/* <img src="logo.svg" alt="Logo" className="logo"> */}
              <div className="brand-name" onClick={() => setMode(51)}>
                iFactory - Administrator Mode
              </div>
            </div>
            <div className="nav">
              <div className="nav-item" onClick={() => setMode(51)}>
                Home
              </div>
              <div className="nav-item" onClick={() => setMode(52)}>
                Order
              </div>
              <div className="nav-item" onClick={() => setMode(54)}>
                Machine
              </div>
              <div className="nav-item" onClick={() => setMode(53)}>
                Environment
              </div>
              {/* <div className="nav-item">Account</div> */}
              <div className="order-btn">Contact us</div>
            </div>
          </div>
          {mode === 51 && <AdminDashBoard />}
          {mode === 52 && <OrderManagement />}
          {mode === 53 && <EnvironmentMonitor />}
          {mode === 54 && <ProductionLinePage />}
          {mode === 55 && <MachineStatus />}

          <div className="footer">
            {/* <img src="footer-logo.svg" alt="Footer Logo" className="footer-logo"> */}
            <div className="footer-text">
              © 2023 Your Brand. All rights reserved.
            </div>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://louisville.edu/mcconnellcenter/images/facebook_logos_PNG19748.png/image"
                  alt="Facebook"
                  className="social-icon"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/2048px-X_icon_2.svg.png"
                  alt="Twitter"
                  className="social-icon"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1024px-Instagram-Icon.png"
                  alt="Instagram"
                  className="social-icon"
                />
              </a>
            </div>
          </div>
        </div>
      )}
      {(!allUser || !allItem || !allOrderStatus) && (
        <div className="baseLoading">
          <Loading />
        </div>
      )}
    </AdminContext.Provider>
  );
};

export default AdminBase;
