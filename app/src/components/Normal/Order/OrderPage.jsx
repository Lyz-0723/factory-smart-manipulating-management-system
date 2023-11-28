import React, { useContext } from "react";
import "./OrderPage.css";
import { NormalContext } from "../Base";
import { send_new_order } from "../../../requests/Normal/data";

const OrderPage = () => {
  let { allItem } = useContext(NormalContext);

  const make_order = async () => {
    const total_amount = document.getElementById("total_amount").value;
    const payment_method = document.getElementById("payment_method").value;
    const customize_detail =
      document.getElementById("customize_detail_color").value +
      ":" +
      document.getElementById("customize_detail_print").value;
    const order_item_id = document.getElementById("order_item").value;
    if (
      await send_new_order(
        total_amount,
        payment_method,
        customize_detail,
        order_item_id
      )
    )
      alert("Successfully ordered!");
  };

  return (
    <div className="order-page-container">
      <div className="form-container">
        <form className="custom-form" method="post">
          <h2 className="form-title">Product Order Form</h2>

          <label className="form-label" htmlFor="order_item">
            Order Item:
          </label>
          <select
            className="form-select"
            name="order_item"
            id="order_item"
            required
          >
            <option value="" disabled defaultValue>
              Select Order Item
            </option>
            {allItem.length !== 0 &&
              allItem.map((item) => (
                <option value={item.item_id}>{item.item_name}</option>
              ))}
          </select>

          <label className="form-label" htmlFor="total_amount">
            Total Amount:
          </label>
          <input
            className="form-input"
            type="number"
            name="total_amount"
            id="total_amount"
            min={100}
            max={10000}
            defaultValue={100}
            required
          />

          <label className="form-label" htmlFor="payment_method">
            Payment Method:
          </label>
          <select
            className="form-select"
            name="payment_method"
            id="payment_method"
            required
          >
            <option value="" disabled defaultValue>
              Select Payment Method
            </option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>

          <label className="form-label" htmlFor="customize_details">
            Customize Details(Colors):
          </label>
          <select
            className="form-select"
            name="customize_details"
            id="customize_detail_color"
          >
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
          </select>

          <label className="form-label" htmlFor="customize_details">
            Customize Details(Custom print):
          </label>
          <input
            className="form-input"
            type="text"
            name="customize_printing"
            id="customize_detail_print"
            maxLength={4}
          />

          <button
            className="form-button"
            type="button"
            onClick={() => make_order()}
          >
            Submit Order
          </button>
        </form>

        <hr className="form-divider" />
      </div>
    </div>
  );
};

export default OrderPage;
