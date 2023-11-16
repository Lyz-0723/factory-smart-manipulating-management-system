import { useState, createContext, useEffect } from "react";

import "./App.css";
import LogIn from "./components/Authentication/LogIn";
import AdminBase from "./components/Admin/Base";
import NormalBase from "./components/Normal/Base";
import { validate } from "./requests/login";
import { get_self_detail } from "./requests/user";
import Loading from "./components/Common/Loading";

export const AppContext = createContext(null);

function App() {
  const isLogIn = window.localStorage.getItem("isLogIn");
  const [mode, setMode] = useState(0);
  const [logOutBtn, setLogOutBtn] = useState(
    window.localStorage.getItem("isLogIn") === "true" ? true : false
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(0);

  const logOut = () => {
    window.localStorage.setItem("access_token", null);
    window.localStorage.setItem("isLogIn", false);
    setLogOutBtn(false);
    setMode(0);
  };

  useEffect(() => {
    const check_login = async () => {
      setLoading(1);
      // Validate the access token
      if (isLogIn === "true" && (await validate())) {
        const user_detail = await get_self_detail();
        if (user_detail) {
          setUser(user_detail);
          if (user_detail.is_admin === 0) setMode(1);
          else if (user_detail.is_admin === 1) setMode(51);
          setLoading(0);
          return;
        }
      } else {
        setLoading(0);
        setMode(0);
      }
    };
    if (mode === 0) check_login();
    // eslint-disable-next-line
  }, [mode]);

  return (
    <AppContext.Provider
      className="App"
      value={{
        logOutBtn,
        logOut,
        mode,
        setMode,
        setLogOutBtn,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {/* <header className="App-header" /> */}

      {loading === 1 && (
        <div className="baseBack">
          <Loading className="baseLoading" />
        </div>
      )}

      {/* Page mode rendering */}
      {mode === 0 && <LogIn />}

      {/* Normal pages */}
      {mode >= 1 && mode <= 50 && <NormalBase></NormalBase>}

      {/* Admin pages */}
      {mode >= 51 && mode <= 100 && <AdminBase />}

      {logOutBtn && (
        <button onClick={logOut} className="signOutButton">
          <i className="fa fa-sign-out" />
        </button>
      )}
    </AppContext.Provider>
  );
}

export default App;
