import React from "react";

import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-page-container">
      <form className="custom-form" method="post">
        <h2 className="form-title">Contact Customer Service</h2>

        <label className="form-label" htmlFor="message">
          Message:
        </label>
        <textarea
          className="form-textarea"
          name="message"
          rows="4"
          required
        ></textarea>

        <button className="form-button" type="submit">
          Contact Customer Service
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
