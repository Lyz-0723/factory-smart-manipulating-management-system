import React, { useEffect, useState } from "react";

import get_self_history from "../../../requests/Normal/Order";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const get_orders = async () => {
      const self_orders = await get_self_history();
      if (self_orders.length !== 0) {
        setOrders(self_orders);
      }
    };
    get_orders();
  }, []);

  return <div>OrderHistory</div>;
};

export default OrderHistory;
