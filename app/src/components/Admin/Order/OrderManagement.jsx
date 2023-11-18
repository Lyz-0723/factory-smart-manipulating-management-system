import React, { useContext, useEffect, useState } from "react";

import { get_all_orders } from "../../../requests/Normal/Order";

import "./OrderManagement.css";
import { AdminContext } from "../Base";
import Loading from "../../Common/Loading";
import { AppContext } from "../../../App";

const OrderManagement = () => {
  let { loading, setLoading } = useContext(AppContext);
  let { allUser, allItem } = useContext(AdminContext);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const get_orders = async () => {
      setLoading(3);
      const all_orders = await get_all_orders();
      if (all_orders.length !== 0) {
        const complete_orders = all_orders.map((order) => {
          const spec_user = allUser.find(
            (user) => user.user_id === order.ordered_user_id
          );
          const spec_item = allItem.find(
            (item) => item.item_id === order.ordered_item_id
          );
          return {
            ...order,
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

  return (
    <div>
      {loading === 0 && (
        <>
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
                    <td>{order.ordered_user_name}</td>
                    <td>{order.create_date}</td>
                    <td>{order.pay_date}</td>
                    <td>{order.ordered_item_name}</td>
                    <td>{order.total_amount}</td>
                    <td>
                      {order.total_amount * order.ordered_item_unit_price}
                    </td>
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
        </>
      )}
      {loading === 3 && <Loading />}
    </div>
  );
};

export default OrderManagement;
