import { path } from "../path";

const get_all_users = async () => {
  // Get all users
  const token = window.localStorage.getItem("access_token");
  try {
    const response = await fetch(`${path}/user/all`, {
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
export default get_all_users;

export const get_all_items = async () => {
  // Get all items
  const token = window.localStorage.getItem("access_token");
  try {
    const response = await fetch(`${path}/item/`, {
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

export const get_order_status = async () => {
  // Get all order status
  const token = window.localStorage.getItem("access_token");
  try {
    const response = await fetch(`${path}/status_and_rating/order_status`, {
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

export const modify_order_status = async (value, order_id) => {
  // Change the order data
  const token = window.localStorage.getItem("access_token");
  const body = { status: value, order_id: order_id };
  console.log(body);

  try {
    const response = await fetch(`${path}/order`, {
      method: "PATCH",
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

    return true;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

export const get_all_orders = async () => {
  // Get self user order history

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/order/all`, {
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
