import React from "react";
import "./LogIn.css";
import { useContext } from "react";
import { AppContext } from "../../App";

import get_access_token from "../../requests/login";
import { get_self_detail } from "../../requests/user";

const LogIn = () => {
  let { setMode, setLogOutBtn, setUser, setLoading } = useContext(AppContext);

  const log_in = async () => {
    setLoading(1);
    const account = document.getElementById("inputAccount").value;
    const password = document.getElementById("inputPassword").value;

    if (account === "" || password === "") {
      console.log("Invalid input.");
      setLoading(0);
      return;
    }
    const result = await get_access_token(account, password);
    if (result.access_token) {
      window.localStorage.setItem("access_token", result.access_token);
      window.localStorage.setItem("isLogIn", true);
      const user_detail = await get_self_detail();
      if (user_detail) {
        setUser(user_detail);
        if (user_detail.is_admin === 0) setMode(1);
        else if (user_detail.is_admin === 1) setMode(51);
        setLoading(0);
        setLogOutBtn(true);
        return;
      }
    }
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
          type="password"
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
