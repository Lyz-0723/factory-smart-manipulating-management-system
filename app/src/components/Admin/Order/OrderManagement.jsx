import React, { useEffect, useState } from "react";

import { get_all_orders } from "../../../requests/Normal/Order";

import "./OrderManagement.css";

const OrderManagement = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const get_orders = async () => {
      const all_orders = await get_all_orders();
      if (all_orders.length !== 0) {
        setAllOrders(all_orders);
      }
    };
    get_orders();
  }, []);

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ "background-color": "#FFFFFF" }}>
            <th>訂購人</th>
            <th>訂單建立日期</th>
            <th>付款日期</th>
            <th>訂購商品</th>
            <th>訂購數量</th>
            <th>總共金額</th>
            <th>出貨情況</th>
            <th>備註</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.length !== 0 &&
            allOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.ordered_user_id}</td>
                <td>{order.create_date}</td>
                <td>{order.pay_date}</td>
                <td>{order.ordered_item_id}</td>
                <td>{order.total_amount}</td>
                <td>{order.total_amount} * unit_price</td>
                <td>
                  <select>
                    <option>請選擇狀態</option>
                  </select>
                </td>
                <td>{order.customize_details}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
      <p class="topic" style={{ "padding-left": "1%" }}>
        每月訂購量
      </p>
      <p class="topic" style={{ "padding-left": "50%" }}>
        每月商品成長量
      </p>
    </div>
  );
};

export default OrderManagement;
