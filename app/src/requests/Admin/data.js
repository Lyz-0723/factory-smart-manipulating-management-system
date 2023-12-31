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

  try {
    const response = await fetch(`${path}/order/status/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Action failed");
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

export const get_environment_datas = async () => {
  // Get last ten envoronment datas

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/env`, {
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

export const get_all_pl = async () => {
  // Get all production lines

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/pl`, {
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

export const get_machine_in_pl = async (pl_id) => {
  // Get all production lines

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/machine/pl/${pl_id}`, {
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

export const modify_production_line = async (
  pl_id,
  pl_name,
  pl_description
) => {
  // Modify production line info

  const token = window.localStorage.getItem("access_token");
  const body = {
    pl_id: pl_id,
    pl_name: pl_name,
    pl_description: pl_description,
  };

  try {
    const response = await fetch(`${path}/pl/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Action failed");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const add_new_production_line = async (
  pl_name,
  pl_desctiption,
  item_id
) => {
  // Add new production line with data

  const token = window.localStorage.getItem("access_token");
  const body = {
    pl_name: pl_name,
    pl_description: pl_desctiption,
    status: 1,
    item_id: item_id,
  };

  try {
    const response = await fetch(`${path}/pl/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Action failed");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const get_production_line_status = async () => {
  // Get specific production line

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `${path}/status_and_rating/production_line_status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

export const add_new_machine = async (
  pl_id,
  serial_number,
  machine_usage,
  position
) => {
  // Add new production line with data

  const token = window.localStorage.getItem("access_token");
  const body = {
    pl_id: pl_id,
    serial_number: serial_number,
    machine_usage: machine_usage,
    position: position,
    status: 1,
    script: "",
  };

  try {
    const response = await fetch(`${path}/machine/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Action failed");
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const delete_production_line = async (pl_id) => {
  // Delete specific production line

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/pl/${pl_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    return true;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
