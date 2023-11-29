import React, { useContext, useEffect, useState } from "react";

import get_order_history, {
  modify_specific_order,
} from "../../../requests/Normal/data";
import { get_order_status } from "../../../requests/Admin/data";
import { NormalContext } from "../Base";
import Loading from "../../Common/Loading";

const OrderHistory = () => {
  let { allItem, allOrderStatus } = useContext(NormalContext);
  const [selfOrders, setSelfOrders] = useState(undefined);
  const [modifying, setModifying] = useState(undefined);

  const paymentMethod = {
    credit_card: "Credit Card",
    debit_card: "Debit Card",
    check: "Check",
  };

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

  const checkItemTotalPrice = () => {
    if (document.getElementById("modify_item_total_amount").value < 100) {
      document.getElementById("modify_item_total_amount").value = 100;
      changeItemTotalPrice();
    }
  };

  const changeItemTotalPrice = () => {
    if (document.getElementById("modify_item_total_amount").value > 10000)
      document.getElementById("modify_item_total_amount").value = 10000;
    document.getElementById("modifying_item_total_price").innerText =
      document.getElementById("modify_item_unit_price").innerText *
      parseInt(document.getElementById("modify_item_total_amount").value);
  };

  const changeItemSelected = () => {
    document.getElementById("modify_item_unit_price").innerText = allItem.find(
      (item) =>
        item.item_name === document.getElementById("modify_item_name").value
    ).unit_price;
    changeItemTotalPrice();
  };

  const confirmChangeOrder = async () => {
    const order_id = modifying;
    const ordered_item_id = allItem.find(
      (item) =>
        item.item_name === document.getElementById("modify_item_name").value
    ).item_id;
    const total_amount = parseInt(
      document.getElementById("modify_item_total_amount").value
    );
    const customized_detail =
      document.getElementById("item_customized_color").value +
      ":" +
      document.getElementById("item_customized_print").value;
    const payment_method = document.getElementById(
      "order_payment_method"
    ).value;

    if (
      await modify_specific_order(
        total_amount,
        payment_method,
        customized_detail,
        ordered_item_id,
        order_id
      )
    )
      alert("Order changed successfully!");
  };

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
                <th>物品顏色</th>
                <th>客製化雕刻</th>
                <th>付款方式</th>
                <th>修改</th>
                <th>訂單狀態</th>
              </tr>
            </thead>
            <tbody>
              {selfOrders.length !== 0 &&
                selfOrders.map((order) => (
                  <tr key={order.order_id}>
                    {/* Show section */}
                    <td>{order.create_date}</td>
                    {modifying !== order.order_id && (
                      <td>{order.ordered_item_name}</td>
                    )}
                    {modifying !== order.order_id && (
                      <td>{order.ordered_item_unit_price}</td>
                    )}
                    {modifying !== order.order_id && (
                      <td>{order.total_amount}</td>
                    )}
                    {modifying !== order.order_id && (
                      <td>
                        {order.total_amount * order.ordered_item_unit_price}
                      </td>
                    )}
                    {modifying !== order.order_id && (
                      <td>
                        {paymentMethod[order.customize_details.split(":")[0]]}
                      </td>
                    )}
                    {modifying !== order.order_id && (
                      <td>{order.customize_details.split(":")[1]}</td>
                    )}
                    {modifying !== order.order_id && (
                      <td>{paymentMethod[order.payment_method]}</td>
                    )}
                    {/* Modify section */}
                    {modifying === order.order_id && (
                      <td>
                        <select
                          name="modify_item_name"
                          id="modify_item_name"
                          defaultValue={order.ordered_item_name}
                          onChange={() => changeItemSelected()}
                        >
                          {allItem.map((item) => (
                            <option key={item.item_name}>
                              {item.item_name}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                    {modifying === order.order_id && (
                      <td id="modify_item_unit_price">
                        {order.ordered_item_unit_price}
                      </td>
                    )}
                    {modifying === order.order_id && (
                      <td>
                        <input
                          name="total_amount"
                          id="modify_item_total_amount"
                          type="number"
                          defaultValue={order.total_amount}
                          onChange={() => changeItemTotalPrice()}
                          onBlur={() => checkItemTotalPrice()}
                          max={10000}
                          min={100}
                        />
                      </td>
                    )}
                    {modifying === order.order_id && (
                      <td id="modifying_item_total_price">
                        {order.total_amount * order.ordered_item_unit_price}
                      </td>
                    )}
                    {modifying === order.order_id && (
                      <td>
                        <select
                          name="item_customized_color"
                          id="item_customized_color"
                        >
                          <option value="red" key="red">
                            Red
                          </option>
                          <option value="black" key="black">
                            Black
                          </option>
                          <option value="blue" key="blue">
                            Blue
                          </option>
                        </select>
                      </td>
                    )}
                    {modifying === order.order_id && (
                      <td>
                        <input
                          type="text"
                          maxLength={4}
                          defaultValue={order.customize_details.split(":")[1]}
                          id="item_customized_print"
                          style={{ width: "20%" }}
                        />
                      </td>
                    )}
                    {modifying === order.order_id && (
                      <td>
                        <select
                          name="order_payment_method"
                          id="order_payment_method"
                          defaultValue={paymentMethod[order.payment_method]}
                        >
                          <option value="credit_card">Credit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="bank_transfer">Bank Transfer</option>
                        </select>
                      </td>
                    )}
                    <td>
                      {order.status === "Pending" ? (
                        <>
                          {!modifying && (
                            <button
                              onClick={() => setModifying(order.order_id)}
                            >
                              更改訂單
                            </button>
                          )}
                          {modifying && modifying === order.order_id && (
                            <button onClick={() => confirmChangeOrder()}>
                              確認
                            </button>
                          )}
                        </>
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
