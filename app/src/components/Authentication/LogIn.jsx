import React from "react";
import "./LogIn.css";
import { useContext } from "react";
import { AppContext } from "../../App";

const LogIn = () => {
  let { setLogOutBtn } = useContext(AppContext);

  const log_in = async () => {
    const account = document.getElementById("inputAccount").value;
    const password = document.getElementById("inputPassword").value;

    if (account == "" || password == "") {
      console.log("Invalid input.");
      return;
    }

    console.log(account, password);
    // TODO: - LogIn actions
  };

  return (
    <div>
      <div className="content">
        <h1 style={{ margin: "10% 0% 0% 40%" }}>Sign in to iFactory</h1>

        {/* LogIn account */}
        <input
          type="text"
          placeholder="請輸入帳號"
          className="input"
          id="inputAccount"
        />
        <br />
        {/* LogIn password */}
        <input
          type="text"
          placeholder="請輸入密碼 "
          className="input"
          id="inputPassword"
        />
        <br />
        <button type="submit" className="button" onClick={() => log_in()}>
          log in
        </button>
      </div>
    </div>
  );
};

export default LogIn;
