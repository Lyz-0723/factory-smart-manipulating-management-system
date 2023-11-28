import React, { useContext, useEffect, useState } from "react";

import get_order_history from "../../../requests/Normal/data";
import { get_order_status } from "../../../requests/Admin/data";
import { NormalContext } from "../Base";
import Loading from "../../Common/Loading";

const OrderHistory = () => {
  let { allItem, allOrderStatus } = useContext(NormalContext);
  const [selfOrders, setSelfOrders] = useState(undefined);

  useEffect(() => {
    const get_orders = async () => {
      const self_orders = await get_order_history();
      let status_list = []; // Prevent pending data
      if (allOrderStatus.length === 0) {
        status_list = await get_order_status();
      }
      if (self_orders.length !== 0) {
        const complete_orders = self_orders.map((order) => {
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
            ordered_item_name: spec_item ? spec_item.item_name : "Pending",
            ordered_item_unit_price: spec_item ? spec_item.unit_price : 0,
          };
        });
        setSelfOrders(complete_orders);
      }
    };
    get_orders();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {selfOrders && (
        <>
          <div>
            <p>Overview</p>
            <button>Payment</button>
          </div>
          <table style={{ width: "100%" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "rgb(108, 117, 125)",
                  color: "white",
                }}
              >
                <th>購買時間</th>
                <th>商品名稱</th>
                <th>商品單價</th>
                <th>訂購數量</th>
                <th>訂購總價</th>
                <th>訂單管理</th>
                <th>訂單狀態</th>
              </tr>
            </thead>
            <tbody>
              {selfOrders.length !== 0 &&
                selfOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.create_date}</td>
                    <td>{order.ordered_item_name}</td>
                    <td>{order.ordered_item_unit_price}</td>
                    <td>{order.total_amount}</td>
                    <td>
                      {order.total_amount * order.ordered_item_unit_price}
                    </td>
                    <td>
                      {order.status === "Pending" ? (
                        <button>更改訂單</button>
                      ) : (
                        <div>訂單處理中</div>
                      )}
                    </td>

                    <td>{order.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <hr />
        </>
      )}
      {!selfOrders && <Loading />}
    </div>
  );
};

export default OrderHistory;
