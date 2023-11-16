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
