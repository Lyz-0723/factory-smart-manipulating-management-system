import React, { useContext, useState, useEffect } from "react";
import get_order_history from "../../../../requests/Normal/data";
import "./Payment.css";
import { NormalContext } from "../../Base";
import { get_order_status } from "../../../../requests/Admin/data";

const PaymentPage = () => {
  let { allOrderStatus, allItem } = useContext(NormalContext);
  const [selfOrders, setSelfOrders] = useState(undefined);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const get_orders = async () => {
    let self_orders = await get_order_history();
    self_orders = self_orders.filter((order) => order.status === 1);
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
            ? allOrderStatus.find((status) => status.status_id === order.status)
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
      setPaymentAmount(
        complete_orders[0].ordered_item_unit_price *
          complete_orders[0].total_amount
      );
    }
  };
  useEffect(() => {
    get_orders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="body-style">
      <div className="payment-container">
        <div className="header-style">信用卡支付</div>

        <form>
          <div className="form-group">
            <label className="label-style">信用卡號碼</label>
            <input type="text" className="input-style" />
          </div>

          <div className="form-group">
            <label className="label-style">有效期限</label>
            <input
              type="text"
              className="input-style input-small"
              placeholder="MM"
            />
            <input
              type="text"
              className="input-style input-small"
              placeholder="YY"
            />
          </div>

          <div className="form-group">
            <label className="label-style">持卡人姓名</label>
            <input type="text" className="input-style" />
          </div>

          <div className="form-group">
            <label className="label-style">安全碼 (CVV)</label>
            <input
              type="text"
              className="input-style input-small"
              placeholder="CVV"
            />
          </div>
          <div>
            付款訂單：
            <select
              name="select-order"
              onChange={(event) => {
                const selectedValue = event.target.value;
                setPaymentAmount(selectedValue);
              }}
            >
              {selfOrders &&
                selfOrders.map((order) => (
                  <option
                    value={order.ordered_item_unit_price * order.total_amount}
                  >
                    {order.total_amount +
                      " " +
                      order.ordered_item_name +
                      " with " +
                      order.customize_details.split(":")[0] +
                      " color " +
                      (order.customize_details.split(":")[1] !== ""
                        ? " and '" +
                          order.customize_details.split(":")[1] +
                          "' print."
                        : "")}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label className="label-style">付款金額</label>
            <div className="input-display">NT${paymentAmount} 元</div>
          </div>

          <button type="button" className="submit-button">
            確認付款
          </button>
        </form>

        <div className="footer-style">完成支付即表示您已閱讀並同意支付條款</div>
      </div>
    </div>
  );
};

export default PaymentPage;
