import React from "react";
import "./AccountManagement.css";

import { modify_user_detail } from "../../../requests/Normal/data";

const AccountManagement = () => {
  const update = async () => {
    const username = document.getElementById("edit_username").value;
    const company_info = document.getElementById("edit_company").value;
    const contact_info =
      document.getElementById("edit_phone_number").value +
      ":" +
      document.getElementById("edit_email").value;
    const password = document.getElementById("edit_password").value;
    const confirm_password = document.getElementById(
      "edit_password_confirm"
    ).value;

    if (
      (password && !confirm_password) ||
      (password && confirm_password && password !== confirm_password)
    )
      return;

    if (
      await modify_user_detail(
        username || null,
        company_info || null,
        contact_info || null,
        password || null
      )
    )
      alert("Update success!");
  };

  return (
    <div className="account-management-page-container">
      <div className="form-container">
        <form className="custom-form">
          <h2 className="form-title">Account Edit</h2>

          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="form-input"
            type="text"
            name="username"
            id="edit_username"
            placeholder="Leave empty for no change"
          />

          <label className="form-label" htmlFor="email">
            Company:
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="edit_company"
            placeholder="Leave empty for no change"
          />

          <label className="form-label" htmlFor="email">
            Phone number:
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="edit_phone_number"
            placeholder="Leave empty for no change"
          />

          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="edit_email"
            placeholder="Leave empty for no change"
          />

          <label className="form-label" htmlFor="password">
            Change Password:
          </label>
          <input
            className="form-input"
            type="password"
            id="edit_password"
            name="password"
            placeholder="Leave empty for no change"
          />

          <label className="form-label" htmlFor="confirm_password">
            Confirm New Password:
          </label>
          <input
            className="form-input"
            type="password"
            id="edit_password_confirm"
            name="confirm_password"
            placeholder="Leave empty for no change"
          />

          <button
            className="form-button"
            type="button"
            onClick={() => update()}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountManagement;
