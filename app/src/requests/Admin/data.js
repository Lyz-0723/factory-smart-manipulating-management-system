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
  // Get all users
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
