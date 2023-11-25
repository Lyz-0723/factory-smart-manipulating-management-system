import { path } from "../path";

export const get_order_history = async () => {
  // Get self user order history

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/order/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
export default get_order_history;

export const get_self_user = async () => {
  // Get self user detail
  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

export const send_new_order = async (
  total_amount,
  payment_method,
  customize_details,
  ordered_user_id,
  ordered_item_id
) => {
  // Send new order
  const token = window.localStorage.getItem("access_token");
  const today = new Date();

  let body = {
    total_amount: parseInt(total_amount),
    payment_method: payment_method,
    customize_details: customize_details,
    ordered_user_id: ordered_user_id,
    ordered_item_id: parseInt(ordered_item_id),
    create_date:
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate(),
    pay_date: null,
    status: 1,
  };
  console.log(body);

  try {
    const response = await fetch(`${path}/order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
