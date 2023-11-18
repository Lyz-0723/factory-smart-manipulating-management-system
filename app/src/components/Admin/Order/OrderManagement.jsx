import React, { useContext, useEffect, useState } from "react";

import { get_all_orders } from "../../../requests/Normal/Order";

import "./OrderManagement.css";
import { AdminContext } from "../Base";
import Loading from "../../Common/Loading";
import { AppContext } from "../../../App";
import {
  modify_order_status,
  get_order_status,
} from "../../../requests/Admin/data";

const OrderManagement = () => {
  let { loading, setLoading } = useContext(AppContext);
  let { allUser, allItem, allOrderStatus } = useContext(AdminContext);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const get_orders = async () => {
      setLoading(3);
      const all_orders = await get_all_orders();
      let status_list = []; // Prevent pending data
      if (allOrderStatus.length === 0) {
        status_list = await get_order_status();
      }
      if (all_orders.length !== 0) {
        const complete_orders = all_orders.map((order) => {
          const spec_user = allUser.find(
            (user) => user.user_id === order.ordered_user_id
          );
          const spec_item = allItem.find(
            (item) => item.item_id === order.ordered_item_id
          );
          const spec_status = // Use cache data if it's ready
            allOrderStatus.length !== 0
              ? allOrderStatus.find(
                  (status) => status.status_id === order.status
                )
              : status_list;
          return {
            order_id: order.order_id,
            total_amount: order.total_amount,
            create_date: order.create_date,
            payment_method: order.payment_method,
            pay_date: order.pay_date,
            customize_details: order.customize_details,
            status: spec_status.status,
            ordered_user_name: spec_user ? spec_user.user_name : "Pending",
            ordered_item_name: spec_item ? spec_item.item_name : "Pending",
            ordered_item_unit_price: spec_item ? spec_item.unit_price : 0,
          };
        });
        setAllOrders(complete_orders);
        setLoading(0);
      }
    };
    get_orders();
  }, []);

  const change_order_status = async (status_name, order_id) => {
    setLoading(4);
    const status_id = allOrderStatus.find(
      (order) => order.status === status_name
    ).status_id;
    if (await modify_order_status(status_id, order_id)) {
      const updatedOrders = allOrders.map((order) =>
        order.order_id === order_id ? { ...order, status: status_name } : order
      );
      setAllOrders(updatedOrders);
    }
    setLoading(0);
  };

  return (
    <div>
      {loading !== 3 && (
        <>
          <table style={{ width: "100%" }}>
            {loading === 4 && (
              <div className="componentLoading">
                <Loading />
              </div>
            )}
            <thead>
              <tr style={{ backgroundColor: "#FFFFFF" }}>
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
                    <td>{order.ordered_user_name}</td>
                    <td>{order.create_date}</td>
                    <td>{order.pay_date}</td>
                    <td>{order.ordered_item_name}</td>
                    <td>{order.total_amount}</td>
                    <td>
                      {order.total_amount * order.ordered_item_unit_price}
                    </td>
                    <td>
                      <select
                        onChange={(e) =>
                          change_order_status(e.target.value, order.order_id)
                        }
                        id={"order" + order.order_id}
                        value={order.status}
                      >
                        <option disabled>請選擇狀態</option>
                        {allOrderStatus.map((status) => (
                          <option key={status.status}>{status.status}</option>
                        ))}
                      </select>
                    </td>
                    <td>{order.customize_details}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <hr />
          <p className="topic" style={{ paddingLeft: "1%" }}>
            每月訂購量
          </p>
          <p className="topic" style={{ paddingLeft: "50%" }}>
            每月商品成長量
          </p>
        </>
      )}
      {loading === 3 && <Loading />}
    </div>
  );
};

export default OrderManagement;
