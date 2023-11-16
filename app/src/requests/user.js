import { path } from "./path";

export const get_self_detail = async () => {
  // Get self detail for localStorage

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
